# CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a CMS for Products, Services, and About page with admin UI, image upload, and rich text editing.

**Architecture:** Prisma models → API routes with Zod validation → Admin React forms with TipTap editor → Public pages fetch from DB with ISR caching.

**Tech Stack:** Next.js 16, Prisma, Zod, TipTap, Vercel Blob, Sharp, sanitize-html

---

## File Structure

```
prisma/schema.prisma                    # Add new models
lib/
├── validation/product.ts               # Zod schemas
├── validation/service.ts
├── sanitize.ts                         # HTML sanitization
├── upload.ts                           # Vercel Blob helper
app/
├── api/
│   ├── products/route.ts               # List, Create
│   ├── products/[id]/route.ts          # Get, Update, Delete
│   ├── products/reorder/route.ts       # Bulk reorder
│   ├── services/route.ts
│   ├── services/[id]/route.ts
│   ├── about/route.ts
│   ├── team/route.ts
│   ├── team/[id]/route.ts
│   └── upload/route.ts
├── admin/content/
│   ├── products/page.tsx               # Product list
│   ├── products/new/page.tsx           # Create product
│   ├── products/[id]/page.tsx          # Edit product
│   ├── services/page.tsx
│   ├── services/new/page.tsx
│   ├── services/[id]/page.tsx
│   └── about/page.tsx
components/admin/
├── RichTextEditor.tsx
├── ImageUploader.tsx
├── IconPicker.tsx
├── CardStylePicker.tsx
├── SpecsEditor.tsx
├── BadgeEditor.tsx
├── ProductForm.tsx
├── ServiceForm.tsx
└── AboutPageEditor.tsx
```

---

## Phase 1: Foundation (Tasks 1-6)

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install TipTap packages**

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-placeholder @tiptap/extension-character-count @tiptap/pm
```

- [ ] **Step 2: Install image processing packages**

```bash
npm install @vercel/blob sharp sanitize-html isomorphic-dompurify
```

- [ ] **Step 3: Install type definitions**

```bash
npm install -D @types/sanitize-html
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add CMS dependencies (TipTap, Vercel Blob, Sharp)"
```

---

### Task 2: Database Schema - Products

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add ProductCategory model**

Add after `SiteSettings` model:

```prisma
model ProductCategory {
  id          String    @id @default(cuid())
  name        String    @db.VarChar(50)
  nameEn      String?   @db.VarChar(50)
  slug        String    @unique
  description String?   @db.Text
  icon        String?
  color       String    @default("emerald")
  order       Int       @default(0)
  isActive    Boolean   @default(true)
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

- [ ] **Step 2: Add Product model**

```prisma
model Product {
  id              String           @id @default(cuid())
  title           String           @db.VarChar(100)
  titleEn         String?          @db.VarChar(100)
  slug            String           @unique
  subtitle        String?          @db.VarChar(200)
  description     String           @db.Text
  excerpt         String?          @db.VarChar(300)
  cardStyle       String           @default("standard")
  icon            String?
  image           String?
  imageAlt        String?          @db.VarChar(150)
  imageWidth      Int?
  imageHeight     Int?
  blurDataUrl     String?          @db.Text
  gallery         Json?
  badges          Json?
  specs           Json?
  features        Json?
  priceDisplay    String?          @db.VarChar(50)
  priceNote       String?          @db.VarChar(100)
  priceValue      Decimal?         @db.Decimal(10, 2)
  ctaText         String?          @db.VarChar(50)
  ctaLink         String?          @db.VarChar(500)
  ctaStyle        String           @default("primary")
  metaTitle       String?          @db.VarChar(60)
  metaDescription String?          @db.VarChar(160)
  ogImage         String?
  categoryId      String?
  category        ProductCategory? @relation(fields: [categoryId], references: [id])
  tags            String[]         @default([])
  order           Int              @default(0)
  status          String           @default("draft")
  availability    String           @default("available")
  isFeatured      Boolean          @default(false)
  isActive        Boolean          @default(true)
  publishedAt     DateTime?
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  @@index([status, isActive])
  @@index([categoryId])
}
```

- [ ] **Step 3: Run migration**

```bash
npx prisma db push
```

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat(db): add Product and ProductCategory models"
```

---

### Task 3: Database Schema - Services & About

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add Service model**

```prisma
model Service {
  id              String   @id @default(cuid())
  title           String   @db.VarChar(100)
  titleEn         String?  @db.VarChar(100)
  slug            String   @unique
  tagline         String?  @db.VarChar(200)
  description     String   @db.Text
  excerpt         String?  @db.VarChar(300)
  icon            String
  iconColor       String   @default("saffron")
  image           String?
  imageAlt        String?  @db.VarChar(150)
  imageWidth      Int?
  imageHeight     Int?
  blurDataUrl     String?  @db.Text
  features        Json?
  process         Json?
  faqs            Json?
  priceDisplay    String?  @db.VarChar(50)
  ctaText         String?  @db.VarChar(50)
  ctaLink         String?  @db.VarChar(500)
  metaTitle       String?  @db.VarChar(60)
  metaDescription String?  @db.VarChar(160)
  ogImage         String?
  relatedProducts String[] @default([])
  order           Int      @default(0)
  status          String   @default("draft")
  isActive        Boolean  @default(true)
  isFeatured      Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

- [ ] **Step 2: Add AboutPage model**

```prisma
model AboutPage {
  id              String   @id @default("main")
  heroEnabled     Boolean  @default(true)
  heroTagline     String?  @db.VarChar(50)
  heroTitle       String   @db.VarChar(100)
  heroHighlight   String?  @db.VarChar(50)
  heroDescription String?  @db.Text
  heroImage       String?
  heroImageAlt    String?  @db.VarChar(150)
  heroBlurDataUrl String?  @db.Text
  statsEnabled    Boolean  @default(true)
  statsTitle      String?  @db.VarChar(100)
  stats           Json?
  missionEnabled  Boolean  @default(true)
  missionTitle    String?  @db.VarChar(100)
  missionContent  String?  @db.Text
  missionImage    String?
  missionImageAlt String?
  valuesEnabled   Boolean  @default(true)
  valuesTitle     String?  @db.VarChar(100)
  valuesSubtitle  String?  @db.VarChar(200)
  values          Json?
  teamEnabled     Boolean  @default(false)
  teamTitle       String?  @db.VarChar(100)
  teamSubtitle    String?  @db.VarChar(200)
  ctaEnabled      Boolean  @default(true)
  ctaTitle        String?  @db.VarChar(100)
  ctaDescription  String?  @db.VarChar(300)
  ctaButtonText   String?  @db.VarChar(50)
  ctaButtonLink   String?  @db.VarChar(500)
  metaTitle       String?  @db.VarChar(60)
  metaDescription String?  @db.VarChar(160)
  ogImage         String?
  updatedAt       DateTime @updatedAt
}

model TeamMember {
  id          String   @id @default(cuid())
  name        String   @db.VarChar(100)
  role        String   @db.VarChar(100)
  bio         String?  @db.Text
  image       String?
  imageAlt    String?
  blurDataUrl String?
  linkedin    String?
  email       String?
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

- [ ] **Step 3: Run migration**

```bash
npx prisma db push
```

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat(db): add Service, AboutPage, TeamMember models"
```

---

### Task 4: Validation Schemas

**Files:**
- Create: `lib/validation/product.ts`
- Create: `lib/validation/service.ts`

- [ ] **Step 1: Create product validation schema**

```typescript
// lib/validation/product.ts
import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3).max(100),
  titleEn: z.string().max(100).optional(),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  subtitle: z.string().max(200).optional(),
  description: z.string().min(50).max(10000),
  excerpt: z.string().max(300).optional(),
  cardStyle: z.enum(["featured", "standard", "highlight", "showcase"]),
  icon: z.string().optional(),
  image: z.string().url().optional().nullable(),
  imageAlt: z.string().max(150).optional(),
  imageWidth: z.number().int().positive().optional(),
  imageHeight: z.number().int().positive().optional(),
  blurDataUrl: z.string().optional(),
  gallery: z.array(z.object({
    url: z.string().url(),
    alt: z.string().max(150),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
  })).max(10).optional(),
  badges: z.array(z.object({
    text: z.string().min(1).max(30),
    variant: z.enum(["success", "info", "warning", "default"]),
  })).max(5).optional(),
  specs: z.array(z.object({
    label: z.string().min(1).max(50),
    value: z.string().min(1).max(100),
    icon: z.string().optional(),
    highlight: z.boolean().optional(),
  })).max(20).optional(),
  features: z.array(z.object({
    text: z.string().min(1).max(200),
    icon: z.string().optional(),
  })).max(10).optional(),
  priceDisplay: z.string().max(50).optional(),
  priceNote: z.string().max(100).optional(),
  priceValue: z.number().positive().optional(),
  ctaText: z.string().max(50).optional(),
  ctaLink: z.string().max(500).optional(),
  ctaStyle: z.enum(["primary", "secondary", "outline"]).default("primary"),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  ogImage: z.string().url().optional(),
  categoryId: z.string().cuid().optional().nullable(),
  tags: z.array(z.string().max(30)).max(10).optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  availability: z.enum(["available", "coming_soon", "out_of_stock"]).default("available"),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export const productCreateSchema = productSchema;
export const productUpdateSchema = productSchema.partial();

export type ProductInput = z.infer<typeof productSchema>;
```

- [ ] **Step 2: Create service validation schema**

```typescript
// lib/validation/service.ts
import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(3).max(100),
  titleEn: z.string().max(100).optional(),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  tagline: z.string().max(200).optional(),
  description: z.string().min(50).max(10000),
  excerpt: z.string().max(300).optional(),
  icon: z.string().min(1),
  iconColor: z.enum(["saffron", "emerald", "blue", "amber", "rose"]).default("saffron"),
  image: z.string().url().optional().nullable(),
  imageAlt: z.string().max(150).optional(),
  imageWidth: z.number().int().positive().optional(),
  imageHeight: z.number().int().positive().optional(),
  blurDataUrl: z.string().optional(),
  features: z.array(z.object({
    text: z.string().min(1).max(200),
    icon: z.string().optional(),
  })).max(10).optional(),
  process: z.array(z.object({
    step: z.number().int().positive(),
    title: z.string().min(1).max(100),
    description: z.string().max(500),
  })).max(10).optional(),
  faqs: z.array(z.object({
    question: z.string().min(1).max(200),
    answer: z.string().min(1).max(1000),
  })).max(10).optional(),
  priceDisplay: z.string().max(50).optional(),
  ctaText: z.string().max(50).optional(),
  ctaLink: z.string().max(500).optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  ogImage: z.string().url().optional(),
  relatedProducts: z.array(z.string().cuid()).max(6).optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export const serviceCreateSchema = serviceSchema;
export const serviceUpdateSchema = serviceSchema.partial();

export type ServiceInput = z.infer<typeof serviceSchema>;
```

- [ ] **Step 3: Commit**

```bash
git add lib/validation/
git commit -m "feat: add Zod validation schemas for Product and Service"
```

---

### Task 5: Sanitization Helper

**Files:**
- Create: `lib/sanitize.ts`

- [ ] **Step 1: Create sanitization utility**

```typescript
// lib/sanitize.ts
import sanitizeHtml from "sanitize-html";

export function sanitizeRichText(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: [
      "h2", "h3", "p", "br", "hr",
      "strong", "em", "u",
      "ul", "ol", "li",
      "a", "img",
      "table", "thead", "tbody", "tr", "th", "td",
      "blockquote",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "class"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["https"],
    },
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    },
  });
}

export function stripHtml(html: string): string {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/sanitize.ts
git commit -m "feat: add HTML sanitization utility"
```

---

### Task 6: Image Upload API

**Files:**
- Create: `lib/upload.ts`
- Create: `app/api/upload/route.ts`

- [ ] **Step 1: Create upload helper**

```typescript
// lib/upload.ts
import { put, del } from "@vercel/blob";
import sharp from "sharp";

export interface UploadResult {
  url: string;
  width: number;
  height: number;
  blurDataUrl: string;
  size: number;
}

export async function uploadImage(
  buffer: Buffer,
  filename: string,
  folder: string = "general"
): Promise<UploadResult> {
  const image = sharp(buffer);
  const metadata = await image.metadata();

  // Generate blur placeholder
  const blurBuffer = await image
    .resize(10, null, { fit: "inside" })
    .jpeg({ quality: 40 })
    .toBuffer();
  const blurDataUrl = `data:image/jpeg;base64,${blurBuffer.toString("base64")}`;

  // Optimize image
  const optimizedBuffer = await image
    .resize(2000, 2000, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true })
    .toBuffer();

  // Upload to Vercel Blob
  const timestamp = Date.now();
  const safeName = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  const blobPath = `${folder}/${timestamp}-${safeName}`;

  const blob = await put(blobPath, optimizedBuffer, {
    access: "public",
    contentType: "image/jpeg",
  });

  return {
    url: blob.url,
    width: metadata.width || 0,
    height: metadata.height || 0,
    blurDataUrl,
    size: optimizedBuffer.length,
  };
}

export async function deleteImage(url: string): Promise<void> {
  await del(url);
}
```

- [ ] **Step 2: Create upload API route**

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadImage } from "@/lib/upload";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadImage(buffer, file.name, folder);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/upload.ts app/api/upload/route.ts
git commit -m "feat: add image upload with Vercel Blob and blur placeholder"
```

---

## Phase 2: Product CMS (Tasks 7-14)

### Task 7: Products API - List & Create

**Files:**
- Create: `app/api/products/route.ts`

- [ ] **Step 1: Create products API route**

```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { productCreateSchema } from "@/lib/validation/product";
import { sanitizeRichText } from "@/lib/sanitize";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const categoryId = searchParams.get("categoryId");

    const where: any = {};
    if (status) where.status = status;
    if (categoryId) where.categoryId = categoryId;

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = productCreateSchema.parse(body);

    // Sanitize description
    data.description = sanitizeRichText(data.description);

    // Check slug uniqueness
    const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        publishedAt: data.status === "published" ? new Date() : null,
      },
      include: { category: true },
    });

    revalidateTag("products");

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/products/route.ts
git commit -m "feat: add Products API - list and create endpoints"
```

---

### Task 8: Products API - Get, Update, Delete

**Files:**
- Create: `app/api/products/[id]/route.ts`

- [ ] **Step 1: Create single product API route**

```typescript
// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { productUpdateSchema } from "@/lib/validation/product";
import { sanitizeRichText } from "@/lib/sanitize";
import { revalidateTag, revalidatePath } from "next/cache";
import { z } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const data = productUpdateSchema.parse(body);

    if (data.description) {
      data.description = sanitizeRichText(data.description);
    }

    // Check slug uniqueness if changing
    if (data.slug) {
      const existing = await prisma.product.findFirst({
        where: { slug: data.slug, NOT: { id } },
      });
      if (existing) {
        return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        publishedAt: data.status === "published" ? new Date() : undefined,
      },
      include: { category: true },
    });

    revalidateTag("products");
    revalidatePath("/products");
    if (product.isFeatured) revalidatePath("/");

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    await prisma.product.update({
      where: { id },
      data: { status: "archived", isActive: false },
    });

    revalidateTag("products");
    revalidatePath("/products");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/products/[id]/route.ts
git commit -m "feat: add Products API - get, update, delete endpoints"
```

---

### Task 9: Products Reorder API

**Files:**
- Create: `app/api/products/reorder/route.ts`

- [ ] **Step 1: Create reorder API**

```typescript
// app/api/products/reorder/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const reorderSchema = z.object({
  items: z.array(z.object({
    id: z.string().cuid(),
    order: z.number().int().min(0),
  })),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { items } = reorderSchema.parse(body);

    await prisma.$transaction(
      items.map(({ id, order }) =>
        prisma.product.update({ where: { id }, data: { order } })
      )
    );

    revalidateTag("products");

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }
    console.error("Error reordering products:", error);
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/products/reorder/route.ts
git commit -m "feat: add Products reorder API"
```

---

### Task 10: RichTextEditor Component

**Files:**
- Create: `components/admin/RichTextEditor.tsx`

- [ ] **Step 1: Create RichTextEditor component**

```tsx
// components/admin/RichTextEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import {
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaLink,
  FaUnlink,
} from "react-icons/fa";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  maxLength?: number;
  placeholder?: string;
}

export function RichTextEditor({
  content,
  onChange,
  maxLength = 10000,
  placeholder = "विवरण लिखें...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        validate: (href) => /^(https?:\/\/|\/|mailto:)/.test(href),
      }),
      Placeholder.configure({ placeholder }),
      CharacterCount.configure({ limit: maxLength }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const charCount = editor.storage.characterCount.characters();
  const isNearLimit = charCount > maxLength * 0.9;

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b border-slate-200 bg-slate-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold"
        >
          <FaBold />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic"
        >
          <FaItalic />
        </ToolbarButton>
        <div className="w-px h-6 bg-slate-300 mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <FaListUl />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <FaListOl />
        </ToolbarButton>
        <div className="w-px h-6 bg-slate-300 mx-1" />
        <ToolbarButton
          onClick={addLink}
          isActive={editor.isActive("link")}
          title="Add Link"
        >
          <FaLink />
        </ToolbarButton>
        {editor.isActive("link") && (
          <ToolbarButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            title="Remove Link"
          >
            <FaUnlink />
          </ToolbarButton>
        )}
      </div>

      <EditorContent
        editor={editor}
        className="prose prose-slate max-w-none p-4 min-h-[200px] focus:outline-none"
      />

      <div
        className={`text-xs px-4 py-2 border-t border-slate-200 ${
          isNearLimit ? "text-amber-600" : "text-slate-400"
        }`}
      >
        {charCount.toLocaleString()} / {maxLength.toLocaleString()}
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  isActive,
  title,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-slate-200 transition-colors ${
        isActive ? "bg-slate-200 text-saffron-600" : "text-slate-600"
      }`}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/RichTextEditor.tsx
git commit -m "feat: add RichTextEditor component with TipTap"
```

---

### Task 11: ImageUploader Component

**Files:**
- Create: `components/admin/ImageUploader.tsx`

- [ ] **Step 1: Create ImageUploader component**

```tsx
// components/admin/ImageUploader.tsx
"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { FaCloudUploadAlt, FaTrash, FaSpinner } from "react-icons/fa";

interface ImageUploaderProps {
  value: string | null;
  onChange: (data: {
    url: string | null;
    width?: number;
    height?: number;
    blurDataUrl?: string;
    alt?: string;
  }) => void;
  folder?: string;
  alt?: string;
  onAltChange?: (alt: string) => void;
}

export function ImageUploader({
  value,
  onChange,
  folder = "general",
  alt = "",
  onAltChange,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Upload failed");
        }

        const data = await res.json();
        onChange({
          url: data.url,
          width: data.width,
          height: data.height,
          blurDataUrl: data.blurDataUrl,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [folder, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleRemove = () => {
    onChange({ url: null });
  };

  if (value) {
    return (
      <div className="space-y-3">
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
          <Image
            src={value}
            alt={alt || "Uploaded image"}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaTrash />
          </button>
        </div>
        {onAltChange && (
          <input
            type="text"
            value={alt}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Alt text (accessibility)"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-saffron-500"
          />
        )}
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-saffron-400 transition-colors"
    >
      {uploading ? (
        <div className="flex flex-col items-center gap-2">
          <FaSpinner className="animate-spin text-3xl text-saffron-500" />
          <p className="text-slate-600">Uploading...</p>
        </div>
      ) : (
        <>
          <FaCloudUploadAlt className="text-4xl text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 mb-2">
            Drag & drop an image or{" "}
            <label className="text-saffron-600 cursor-pointer hover:underline">
              browse
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </p>
          <p className="text-xs text-slate-400">JPEG, PNG, WebP (max 5MB)</p>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/ImageUploader.tsx
git commit -m "feat: add ImageUploader component with drag-drop"
```

---

### Task 12: CardStylePicker & SpecsEditor

**Files:**
- Create: `components/admin/CardStylePicker.tsx`
- Create: `components/admin/SpecsEditor.tsx`

- [ ] **Step 1: Create CardStylePicker**

```tsx
// components/admin/CardStylePicker.tsx
"use client";

import { FaSolarPanel, FaChargingStation, FaCarBattery, FaIndustry } from "react-icons/fa";

const cardStyles = [
  {
    value: "featured",
    label: "Featured",
    description: "2 columns, image right",
    icon: FaSolarPanel,
    cols: 2,
  },
  {
    value: "standard",
    label: "Standard",
    description: "1 column, light theme",
    icon: FaChargingStation,
    cols: 1,
  },
  {
    value: "highlight",
    label: "Highlight",
    description: "1 column, dark theme",
    icon: FaCarBattery,
    cols: 1,
    dark: true,
  },
  {
    value: "showcase",
    label: "Showcase",
    description: "2 columns, centered icon",
    icon: FaIndustry,
    cols: 2,
  },
];

interface CardStylePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function CardStylePicker({ value, onChange }: CardStylePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {cardStyles.map((style) => (
        <button
          key={style.value}
          type="button"
          onClick={() => onChange(style.value)}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            value === style.value
              ? "border-saffron-500 bg-saffron-50"
              : "border-slate-200 hover:border-slate-300"
          } ${style.dark ? "bg-slate-800" : ""}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                style.dark
                  ? "bg-slate-700 text-blue-400"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              <style.icon className="text-lg" />
            </div>
            <div>
              <div
                className={`font-bold ${style.dark ? "text-white" : "text-slate-800"}`}
              >
                {style.label}
              </div>
              <div
                className={`text-xs ${style.dark ? "text-slate-400" : "text-slate-500"}`}
              >
                {style.description}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: style.cols }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded ${
                  style.dark ? "bg-slate-600" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create SpecsEditor**

```tsx
// components/admin/SpecsEditor.tsx
"use client";

import { FaPlus, FaTrash, FaGripVertical } from "react-icons/fa";

interface Spec {
  label: string;
  value: string;
  icon?: string;
  highlight?: boolean;
}

interface SpecsEditorProps {
  value: Spec[];
  onChange: (specs: Spec[]) => void;
  maxItems?: number;
}

export function SpecsEditor({ value = [], onChange, maxItems = 20 }: SpecsEditorProps) {
  const addSpec = () => {
    if (value.length >= maxItems) return;
    onChange([...value, { label: "", value: "" }]);
  };

  const updateSpec = (index: number, field: keyof Spec, newValue: string | boolean) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };
    onChange(updated);
  };

  const removeSpec = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {value.map((spec, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200"
        >
          <FaGripVertical className="text-slate-400 cursor-grab" />
          <input
            type="text"
            value={spec.label}
            onChange={(e) => updateSpec(index, "label", e.target.value)}
            placeholder="Label"
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-saffron-500"
          />
          <input
            type="text"
            value={spec.value}
            onChange={(e) => updateSpec(index, "value", e.target.value)}
            placeholder="Value"
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-saffron-500"
          />
          <button
            type="button"
            onClick={() => removeSpec(index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      {value.length < maxItems && (
        <button
          type="button"
          onClick={addSpec}
          className="flex items-center gap-2 px-4 py-2 text-saffron-600 hover:bg-saffron-50 rounded-lg border border-dashed border-saffron-300"
        >
          <FaPlus /> Add Specification
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/admin/CardStylePicker.tsx components/admin/SpecsEditor.tsx
git commit -m "feat: add CardStylePicker and SpecsEditor components"
```

---

### Task 13: BadgeEditor Component

**Files:**
- Create: `components/admin/BadgeEditor.tsx`

- [ ] **Step 1: Create BadgeEditor**

```tsx
// components/admin/BadgeEditor.tsx
"use client";

import { FaPlus, FaTrash } from "react-icons/fa";

interface Badge {
  text: string;
  variant: "success" | "info" | "warning" | "default";
}

const variants = [
  { value: "success", label: "Success", color: "bg-emerald-100 text-emerald-700" },
  { value: "info", label: "Info", color: "bg-blue-100 text-blue-700" },
  { value: "warning", label: "Warning", color: "bg-amber-100 text-amber-700" },
  { value: "default", label: "Default", color: "bg-slate-100 text-slate-700" },
];

interface BadgeEditorProps {
  value: Badge[];
  onChange: (badges: Badge[]) => void;
  maxItems?: number;
}

export function BadgeEditor({ value = [], onChange, maxItems = 5 }: BadgeEditorProps) {
  const addBadge = () => {
    if (value.length >= maxItems) return;
    onChange([...value, { text: "", variant: "default" }]);
  };

  const updateBadge = (index: number, field: keyof Badge, newValue: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };
    onChange(updated);
  };

  const removeBadge = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {value.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200"
        >
          <input
            type="text"
            value={badge.text}
            onChange={(e) => updateBadge(index, "text", e.target.value)}
            placeholder="Badge text"
            maxLength={30}
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-saffron-500"
          />
          <select
            value={badge.variant}
            onChange={(e) => updateBadge(index, "variant", e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-saffron-500"
          >
            {variants.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
          <span
            className={`px-2 py-1 rounded text-xs font-bold ${
              variants.find((v) => v.value === badge.variant)?.color
            }`}
          >
            Preview
          </span>
          <button
            type="button"
            onClick={() => removeBadge(index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      {value.length < maxItems && (
        <button
          type="button"
          onClick={addBadge}
          className="flex items-center gap-2 px-4 py-2 text-saffron-600 hover:bg-saffron-50 rounded-lg border border-dashed border-saffron-300"
        >
          <FaPlus /> Add Badge
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/BadgeEditor.tsx
git commit -m "feat: add BadgeEditor component"
```

---

### Task 14: Update Admin Layout Navigation

**Files:**
- Modify: `app/admin/layout.tsx`

- [ ] **Step 1: Add content navigation items**

Update the `navItems` array:

```tsx
import {
  FaHome,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBox,
  FaTools,
  FaInfoCircle,
} from "react-icons/fa";

const navItems = [
  { href: "/admin", label: "डैशबोर्ड", icon: FaHome },
  { href: "/admin/applications", label: "आवेदन", icon: FaClipboardList },
  { href: "/admin/content/products", label: "उत्पाद", icon: FaBox },
  { href: "/admin/content/services", label: "सेवाएं", icon: FaTools },
  { href: "/admin/content/about", label: "हमारे बारे में", icon: FaInfoCircle },
  { href: "/admin/settings", label: "सेटिंग्स", icon: FaCog },
];
```

- [ ] **Step 2: Commit**

```bash
git add app/admin/layout.tsx
git commit -m "feat: add CMS navigation items to admin sidebar"
```

---

## Remaining Tasks Summary

Due to length, remaining tasks are summarized:

**Phase 2 Continued (Tasks 15-18):**
- Task 15: Product List Page (`app/admin/content/products/page.tsx`)
- Task 16: Product Form Component (`components/admin/ProductForm.tsx`)
- Task 17: New Product Page (`app/admin/content/products/new/page.tsx`)
- Task 18: Edit Product Page (`app/admin/content/products/[id]/page.tsx`)

**Phase 3: Service CMS (Tasks 19-23):**
- Task 19: Services API routes
- Task 20: Service List Page
- Task 21: ServiceForm component
- Task 22: New/Edit Service pages

**Phase 4: About Page CMS (Tasks 24-27):**
- Task 23: About API route
- Task 24: Team API routes
- Task 25: AboutPageEditor component
- Task 26: About admin page

**Phase 5: Frontend Integration (Tasks 28-30):**
- Task 27: Update `/products/page.tsx` to fetch from DB
- Task 28: Update `/services/page.tsx` to fetch from DB
- Task 29: Update `/about/page.tsx` to fetch from DB

**Phase 6: Polish (Tasks 31-32):**
- Task 30: Autosave hook
- Task 31: SEO meta tags

---

## Verification

After completing all tasks:

1. **Admin Products:** Navigate to `/admin/content/products` → Create → Edit → Reorder → Delete
2. **Admin Services:** Same flow for services
3. **Admin About:** Edit about page sections
4. **Public Pages:** Verify `/products`, `/services`, `/about` render from DB
5. **Image Upload:** Upload image → verify blur placeholder on public page
