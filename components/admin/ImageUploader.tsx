"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { FaUpload, FaTrash, FaSpinner } from "react-icons/fa";

interface ImageData {
  url: string;
  width?: number;
  height?: number;
  blurDataUrl?: string;
  alt?: string;
}

interface ImageUploaderProps {
  value?: ImageData | null;
  onChange: (data: ImageData | null) => void;
  folder?: string;
  aspectRatio?: string;
  className?: string;
}

export function ImageUploader({
  value,
  onChange,
  folder = "uploads",
  aspectRatio = "16/9",
  className = "",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Upload failed");
        }

        const data = await response.json();
        onChange({
          url: data.url,
          width: data.width,
          height: data.height,
          blurDataUrl: data.blurDataUrl,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onChange]
  );

  const handleDelete = useCallback(async () => {
    if (!value?.url) return;

    try {
      await fetch(`/api/upload?url=${encodeURIComponent(value.url)}`, {
        method: "DELETE",
      });
      onChange(null);
    } catch (err) {
      console.error("Delete failed:", err);
      onChange(null);
    }
  }, [value, onChange]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  return (
    <div className={className}>
      {value?.url ? (
        <div className="relative rounded-lg overflow-hidden border border-slate-200">
          <div style={{ aspectRatio }} className="relative bg-slate-100">
            <Image
              src={value.url}
              alt={value.alt || "Uploaded image"}
              fill
              className="object-cover"
              placeholder={value.blurDataUrl ? "blur" : "empty"}
              blurDataURL={value.blurDataUrl}
            />
          </div>
          <button
            type="button"
            onClick={handleDelete}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
            title="Remove image"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragActive
              ? "border-emerald-500 bg-emerald-50"
              : "border-slate-300 hover:border-slate-400"
          }`}
          style={{ aspectRatio }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleInputChange}
            className="hidden"
          />

          {isUploading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <FaSpinner className="w-8 h-8 text-emerald-500 animate-spin mb-3" />
              <p className="text-slate-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <FaUpload className="w-8 h-8 text-slate-400 mb-3" />
              <p className="text-slate-600 font-medium">
                Drop image here or click to upload
              </p>
              <p className="text-slate-400 text-sm mt-1">
                JPG, PNG, WebP, GIF up to 5MB
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
