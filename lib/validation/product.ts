import { z } from "zod";

export const cardStyleSchema = z.enum([
  "featured",
  "standard",
  "highlight",
  "showcase"
]);

export const badgeSchema = z.object({
  text: z.string().max(30),
  color: z.enum(["emerald", "saffron", "blue", "slate"]).default("emerald"),
});

export const specSchema = z.object({
  label: z.string().max(50),
  value: z.string().max(100),
  icon: z.string().optional(),
});

export const featureSchema = z.object({
  text: z.string().max(200),
  icon: z.string().optional(),
});

export const galleryImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().max(150),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  blurDataUrl: z.string().optional(),
});

export const productCategorySchema = z.object({
  name: z.string().min(1).max(50),
  nameEn: z.string().max(50).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z.enum(["emerald", "saffron", "blue", "slate", "rose", "purple"]).default("emerald"),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const productSchema = z.object({
  title: z.string().min(1).max(100),
  titleEn: z.string().max(100).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  subtitle: z.string().max(200).optional(),
  description: z.string().min(1),
  excerpt: z.string().max(300).optional(),
  cardStyle: cardStyleSchema.default("standard"),
  icon: z.string().optional(),
  image: z.string().url().optional().or(z.literal("")).nullable(),
  imageAlt: z.string().max(150).optional(),
  imageWidth: z.number().int().positive().optional(),
  imageHeight: z.number().int().positive().optional(),
  blurDataUrl: z.string().optional(),
  gallery: z.array(galleryImageSchema).optional(),
  badges: z.array(badgeSchema).max(4).optional(),
  specs: z.array(specSchema).max(10).optional(),
  features: z.array(featureSchema).max(15).optional(),
  priceDisplay: z.string().max(50).optional(),
  priceNote: z.string().max(100).optional(),
  priceValue: z.number().positive().optional(),
  ctaText: z.string().max(50).optional(),
  ctaLink: z.string().max(500).optional(),
  ctaStyle: z.enum(["primary", "secondary", "outline"]).default("primary"),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  ogImage: z.string().url().optional().or(z.literal("")).nullable(),
  categoryId: z.string().cuid().optional().nullable(),
  tags: z.array(z.string().max(30)).max(10).default([]),
  order: z.number().int().min(0).default(0),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  availability: z.enum(["available", "out_of_stock", "coming_soon", "discontinued"]).default("available"),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export const productCreateSchema = productSchema;

export const productUpdateSchema = productSchema.partial().extend({
  id: z.string().cuid(),
});

export const categoryCreateSchema = productCategorySchema;

export const categoryUpdateSchema = productCategorySchema.partial().extend({
  id: z.string().cuid(),
});

export type CardStyle = z.infer<typeof cardStyleSchema>;
export type Badge = z.infer<typeof badgeSchema>;
export type Spec = z.infer<typeof specSchema>;
export type Feature = z.infer<typeof featureSchema>;
export type GalleryImage = z.infer<typeof galleryImageSchema>;
export type ProductCategory = z.infer<typeof productCategorySchema>;
export type Product = z.infer<typeof productSchema>;
export type ProductCreate = z.infer<typeof productCreateSchema>;
export type ProductUpdate = z.infer<typeof productUpdateSchema>;
