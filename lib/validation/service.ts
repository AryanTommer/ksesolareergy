import { z } from "zod";

export const serviceFeatureSchema = z.object({
  title: z.string().max(100),
  description: z.string().max(300).optional(),
  icon: z.string().optional(),
});

export const processStepSchema = z.object({
  step: z.number().int().positive(),
  title: z.string().max(100),
  description: z.string().max(500),
  icon: z.string().optional(),
  duration: z.string().max(50).optional(),
});

export const faqSchema = z.object({
  question: z.string().min(1).max(200),
  answer: z.string().min(1).max(1000),
});

export const serviceSchema = z.object({
  title: z.string().min(1).max(100),
  titleEn: z.string().max(100).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  tagline: z.string().max(200).optional(),
  description: z.string().min(1),
  excerpt: z.string().max(300).optional(),
  icon: z.string().min(1),
  iconColor: z.enum(["saffron", "emerald", "blue", "slate", "rose", "purple"]).default("saffron"),
  image: z.string().url().optional().or(z.literal("")).nullable(),
  imageAlt: z.string().max(150).optional(),
  imageWidth: z.number().int().positive().optional(),
  imageHeight: z.number().int().positive().optional(),
  blurDataUrl: z.string().optional(),
  features: z.array(serviceFeatureSchema).max(10).optional(),
  process: z.array(processStepSchema).max(8).optional(),
  faqs: z.array(faqSchema).max(15).optional(),
  priceDisplay: z.string().max(50).optional(),
  ctaText: z.string().max(50).optional(),
  ctaLink: z.string().max(500).optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  ogImage: z.string().url().optional().or(z.literal("")).nullable(),
  relatedProducts: z.array(z.string().cuid()).max(6).default([]),
  order: z.number().int().min(0).default(0),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export const serviceCreateSchema = serviceSchema;

export const serviceUpdateSchema = serviceSchema.partial().extend({
  id: z.string().cuid(),
});

export type ServiceFeature = z.infer<typeof serviceFeatureSchema>;
export type ProcessStep = z.infer<typeof processStepSchema>;
export type FAQ = z.infer<typeof faqSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type ServiceCreate = z.infer<typeof serviceCreateSchema>;
export type ServiceUpdate = z.infer<typeof serviceUpdateSchema>;
