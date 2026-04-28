import { z } from "zod";

export const statSchema = z.object({
  value: z.string().max(20),
  label: z.string().max(50),
  suffix: z.string().max(10).optional(),
  icon: z.string().optional(),
});

export const valueSchema = z.object({
  title: z.string().max(50),
  description: z.string().max(300),
  icon: z.string(),
  color: z.enum(["saffron", "emerald", "blue", "slate"]).default("saffron"),
});

export const aboutPageSchema = z.object({
  heroEnabled: z.boolean().default(true),
  heroTagline: z.string().max(50).optional(),
  heroTitle: z.string().min(1).max(100),
  heroHighlight: z.string().max(50).optional(),
  heroDescription: z.string().optional(),
  heroImage: z.string().url().optional().or(z.literal("")),
  heroImageAlt: z.string().max(150).optional(),
  heroBlurDataUrl: z.string().optional(),
  statsEnabled: z.boolean().default(true),
  statsTitle: z.string().max(100).optional(),
  stats: z.array(statSchema).max(6).optional(),
  missionEnabled: z.boolean().default(true),
  missionTitle: z.string().max(100).optional(),
  missionContent: z.string().optional(),
  missionImage: z.string().url().optional().or(z.literal("")),
  missionImageAlt: z.string().max(150).optional(),
  valuesEnabled: z.boolean().default(true),
  valuesTitle: z.string().max(100).optional(),
  valuesSubtitle: z.string().max(200).optional(),
  values: z.array(valueSchema).max(8).optional(),
  teamEnabled: z.boolean().default(false),
  teamTitle: z.string().max(100).optional(),
  teamSubtitle: z.string().max(200).optional(),
  ctaEnabled: z.boolean().default(true),
  ctaTitle: z.string().max(100).optional(),
  ctaDescription: z.string().max(300).optional(),
  ctaButtonText: z.string().max(50).optional(),
  ctaButtonLink: z.string().max(500).optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  ogImage: z.string().url().optional().or(z.literal("")),
});

export const aboutPageUpdateSchema = aboutPageSchema.partial();

export const teamMemberSchema = z.object({
  name: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  bio: z.string().optional(),
  image: z.string().url().optional().or(z.literal("")),
  imageAlt: z.string().max(150).optional(),
  blurDataUrl: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const teamMemberCreateSchema = teamMemberSchema;

export const teamMemberUpdateSchema = teamMemberSchema.partial().extend({
  id: z.string().cuid(),
});

export type Stat = z.infer<typeof statSchema>;
export type Value = z.infer<typeof valueSchema>;
export type AboutPage = z.infer<typeof aboutPageSchema>;
export type AboutPageUpdate = z.infer<typeof aboutPageUpdateSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberCreate = z.infer<typeof teamMemberCreateSchema>;
export type TeamMemberUpdate = z.infer<typeof teamMemberUpdateSchema>;
