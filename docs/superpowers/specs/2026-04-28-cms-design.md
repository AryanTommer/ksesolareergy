# Content Management System Design

**Date:** 2026-04-28  
**Status:** Ready for Implementation  
**Scope:** Products, Services, About Page CMS

---

## Overview

Build a comprehensive content management system for the Surya Ghar solar energy website, enabling admins to manage Products, Services, and About page content without code changes.

### Goals
- Full CRUD with reordering for Products and Services
- Section-based About page editor
- Preserve existing bento grid design for products
- Rich text editing with proper sanitization
- Image upload with optimization and blur placeholders
- Draft/publish workflow with revision history

### Non-Goals
- Multi-language (i18n) support (future enhancement)
- E-commerce functionality (cart, checkout)
- User-generated content (reviews, comments)

---

## Database Schema

### Product Model

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

model Product {
  id            String   @id @default(cuid())
  
  // Basic Info
  title         String   @db.VarChar(100)
  titleEn       String?  @db.VarChar(100)
  slug          String   @unique
  subtitle      String?  @db.VarChar(200)
  description   String   @db.Text              // Rich HTML
  excerpt       String?  @db.VarChar(300)
  
  // Layout
  cardStyle     String   @default("standard")  // featured|standard|highlight|showcase
  
  // Media
  icon          String?
  image         String?
  imageAlt      String?  @db.VarChar(150)
  imageWidth    Int?
  imageHeight   Int?
  blurDataUrl   String?  @db.Text
  gallery       Json?                          // [{url, alt, width, height, blurDataUrl}]
  
  // Details
  badges        Json?                          // [{text, variant}]
  specs         Json?                          // [{label, value, icon?, highlight?}]
  features      Json?                          // [{text, icon?}]
  
  // Pricing
  priceDisplay  String?  @db.VarChar(50)
  priceNote     String?  @db.VarChar(100)
  priceValue    Decimal? @db.Decimal(10, 2)
  
  // CTA
  ctaText       String?  @db.VarChar(50)
  ctaLink       String?  @db.VarChar(500)
  ctaStyle      String   @default("primary")
  
  // SEO
  metaTitle       String?  @db.VarChar(60)
  metaDescription String?  @db.VarChar(160)
  ogImage         String?
  
  // Organization
  categoryId    String?
  category      ProductCategory? @relation(fields: [categoryId], references: [id])
  tags          String[] @default([])
  order         Int      @default(0)
  
  // Relationships
  relatedProducts ProductRelation[] @relation("ProductRelations")
  relatedTo       ProductRelation[] @relation("RelatedProducts")
  
  // Status
  status        String   @default("draft")     // draft|published|archived
  availability  String   @default("available") // available|coming_soon|out_of_stock
  isFeatured    Boolean  @default(false)
  isActive      Boolean  @default(true)
  
  // Publishing
  publishedAt   DateTime?
  scheduledAt   DateTime?
  
  // Audit
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model ProductRelation {
  id          String   @id @default(cuid())
  productId   String
  relatedId   String
  type        String   @default("related")
  order       Int      @default(0)
  product     Product  @relation("ProductRelations", fields: [productId], references: [id], onDelete: Cascade)
  related     Product  @relation("RelatedProducts", fields: [relatedId], references: [id], onDelete: Cascade)
  
  @@unique([productId, relatedId])
}
```

### Service Model

```prisma
model Service {
  id            String   @id @default(cuid())
  
  // Basic Info
  title         String   @db.VarChar(100)
  titleEn       String?  @db.VarChar(100)
  slug          String   @unique
  tagline       String?  @db.VarChar(200)
  description   String   @db.Text
  excerpt       String?  @db.VarChar(300)
  
  // Visual
  icon          String
  iconColor     String   @default("saffron")
  image         String?
  imageAlt      String?  @db.VarChar(150)
  imageWidth    Int?
  imageHeight   Int?
  blurDataUrl   String?  @db.Text
  
  // Details
  features      Json?                          // [{text, icon?}]
  process       Json?                          // [{step, title, description}]
  faqs          Json?                          // [{question, answer}]
  
  // Pricing
  priceDisplay  String?  @db.VarChar(50)
  
  // CTA
  ctaText       String?  @db.VarChar(50)
  ctaLink       String?  @db.VarChar(500)
  
  // SEO
  metaTitle       String?  @db.VarChar(60)
  metaDescription String?  @db.VarChar(160)
  ogImage         String?
  
  // Relationships
  relatedProducts String[] @default([])
  
  // Organization
  order         Int      @default(0)
  status        String   @default("draft")
  isActive      Boolean  @default(true)
  isFeatured    Boolean  @default(false)
  
  // Audit
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### About Page Model

```prisma
model AboutPage {
  id              String   @id @default("main")
  
  // Hero Section
  heroEnabled     Boolean  @default(true)
  heroTagline     String?  @db.VarChar(50)
  heroTitle       String   @db.VarChar(100)
  heroHighlight   String?  @db.VarChar(50)
  heroDescription String?  @db.Text
  heroImage       String?
  heroImageAlt    String?  @db.VarChar(150)
  heroBlurDataUrl String?  @db.Text
  
  // Stats Section
  statsEnabled    Boolean  @default(true)
  statsTitle      String?  @db.VarChar(100)
  stats           Json?                         // [{icon, value, suffix, label}]
  
  // Mission Section
  missionEnabled  Boolean  @default(true)
  missionTitle    String?  @db.VarChar(100)
  missionContent  String?  @db.Text
  missionImage    String?
  missionImageAlt String?
  
  // Values Section
  valuesEnabled   Boolean  @default(true)
  valuesTitle     String?  @db.VarChar(100)
  valuesSubtitle  String?  @db.VarChar(200)
  values          Json?                         // [{icon, iconColor, title, description}]
  
  // Team Section
  teamEnabled     Boolean  @default(false)
  teamTitle       String?  @db.VarChar(100)
  teamSubtitle    String?  @db.VarChar(200)
  
  // CTA Section
  ctaEnabled      Boolean  @default(true)
  ctaTitle        String?  @db.VarChar(100)
  ctaDescription  String?  @db.VarChar(300)
  ctaButtonText   String?  @db.VarChar(50)
  ctaButtonLink   String?  @db.VarChar(500)
  
  // SEO
  metaTitle       String?  @db.VarChar(60)
  metaDescription String?  @db.VarChar(160)
  ogImage         String?
  
  // Audit
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

### Shared Models

```prisma
model MediaFile {
  id           String   @id @default(cuid())
  filename     String   @db.VarChar(255)
  originalName String   @db.VarChar(255)
  url          String
  blurDataUrl  String?  @db.Text
  alt          String?  @db.VarChar(150)
  type         String                          // image|document
  mimeType     String   @db.VarChar(100)
  size         Int
  width        Int?
  height       Int?
  folder       String   @default("general")
  uploadedBy   String?
  createdAt    DateTime @default(now())
  
  @@index([folder])
}

model IconLibrary {
  id        String   @id @default(cuid())
  name      String   @db.VarChar(50)
  nameHi    String?  @db.VarChar(50)
  iconKey   String   @unique
  category  String
  keywords  String[] @default([])
  createdAt DateTime @default(now())
}
```

---

## Card Style System

### Available Styles

| Style | Columns | Theme | Image | Use Case |
|-------|---------|-------|-------|----------|
| `featured` | 2 | Light | Required, right side | Hero products (Solar Panels) |
| `standard` | 1 | Light | Optional | Regular products |
| `highlight` | 1 | Dark | Optional | Premium/special products |
| `showcase` | 2 | Light | Optional, centered icon | Category/structure products |

### Image Requirements

```typescript
const cardImageRequirements = {
  featured: { minWidth: 800, minHeight: 600, required: true },
  standard: { minWidth: 400, minHeight: 300, required: false },
  highlight: { minWidth: 400, minHeight: 400, required: false },
  showcase: { minWidth: 200, minHeight: 200, required: false },
};
```

---

## Rich Text Editor

### Technology
- **Editor:** TipTap (headless, ProseMirror-based)
- **Server Sanitization:** sanitize-html
- **Client Sanitization:** DOMPurify

### Allowed Elements
- Headings: H2, H3
- Text: bold, italic, underline
- Lists: bullet, numbered
- Links: with URL validation
- Images: from media library
- Tables: basic structure

### Security
- All HTML sanitized before save
- URLs validated (https only for images)
- External links get `rel="noopener noreferrer"`

---

## Image Upload

### Storage
- **Provider:** Vercel Blob
- **Access:** Public URLs

### Processing
1. Validate file type (JPEG, PNG, WebP) and size (max 5MB)
2. Resize to max 2000px (preserve aspect ratio)
3. Generate 10px blur placeholder (base64)
4. Convert to progressive JPEG (quality 85)
5. Upload to Vercel Blob
6. Store URL, dimensions, and blurDataUrl in database

### Blur Placeholder
- Generated using Sharp
- 10px wide, base64 encoded
- Stored alongside URL for instant loading

---

## API Structure

```
/api
├── /products
│   ├── GET              List products
│   ├── POST             Create product
│   ├── /reorder POST    Bulk reorder
│   └── /[id]
│       ├── GET          Get product
│       ├── PATCH        Update product
│       └── DELETE       Archive product
│
├── /product-categories
│   ├── GET              List categories
│   ├── POST             Create category
│   └── /[id]
│       ├── PATCH        Update category
│       └── DELETE       Delete category
│
├── /services
│   ├── GET              List services
│   ├── POST             Create service
│   ├── /reorder POST    Bulk reorder
│   └── /[id]
│       ├── GET          Get service
│       ├── PATCH        Update service
│       └── DELETE       Archive service
│
├── /about
│   ├── GET              Get about page
│   └── PATCH            Update about page
│
├── /team
│   ├── GET              List team members
│   ├── POST             Add member
│   └── /[id]
│       ├── PATCH        Update member
│       └── DELETE       Remove member
│
├── /upload POST         Upload file to Vercel Blob
│
├── /media
│   ├── GET              List media library
│   └── /[id] DELETE     Delete media
│
└── /icons GET           List available icons
```

---

## Admin UI Structure

```
/admin
├── /dashboard                 Overview stats
├── /applications              Existing - customer applications
├── /content
│   ├── /products
│   │   ├── (list)            Product list with filters
│   │   ├── /new              Create product
│   │   ├── /[id]             Edit product
│   │   └── /categories       Manage categories
│   ├── /services
│   │   ├── (list)            Service list
│   │   ├── /new              Create service
│   │   └── /[id]             Edit service
│   └── /about                About page editor
├── /media                     Media library
└── /settings                  Existing - site settings
```

---

## Admin Components

### Product Form (Tabbed)
1. **Basic Info** - Title, slug, subtitle, description, category
2. **Media** - Image upload, gallery, icon picker
3. **Layout** - Card style picker with visual preview
4. **Details** - Specs editor, badges editor, features list
5. **Pricing** - Price display, notes
6. **SEO** - Meta title, description, OG image
7. **Relations** - Related products picker

### Editors
- **RichTextEditor** - TipTap with toolbar
- **SpecsEditor** - Dynamic key-value pairs with presets
- **BadgeEditor** - Text + variant (success/info/warning)
- **IconPicker** - Visual grid with search
- **CardStylePicker** - Visual cards showing each layout
- **ImageUploader** - Drag-drop with preview and cropping

---

## Features

### Autosave
- Debounced save (2 seconds after last change)
- localStorage backup on network failure
- Recovery banner on next session

### Live Preview
- Preview panel in editor (local only)

### Drag-to-Reorder
- Reorder products/services by dragging

---

## Deferred Features (Future Enhancement)

- Revision history with restore
- Content locking for simultaneous edits
- Bulk operations (multi-select publish/delete)
- Shareable preview links
- Scheduled publishing

---

## Validation Rules

### Product
| Field | Required | Max Length | Pattern |
|-------|----------|------------|---------|
| title | Yes | 100 | - |
| slug | Yes | 100 | `^[a-z0-9-]+$` |
| description | Yes | 10,000 | - |
| imageAlt | If image | 150 | - |
| metaTitle | No | 60 | - |
| metaDescription | No | 160 | - |
| badges | No | 5 items | - |
| specs | No | 20 items | - |

### Service
| Field | Required | Max Length |
|-------|----------|------------|
| title | Yes | 100 |
| slug | Yes | 100 |
| icon | Yes | - |
| description | Yes | 10,000 |

---

## Caching Strategy

### Static Generation
- Product/service list pages use ISR
- Revalidate on-demand when CMS updates

### Cache Tags
- `products` - All product data
- `services` - All service data
- `about` - About page data

### Revalidation
```typescript
// On product update
revalidateTag('products');
revalidatePath('/products');
if (product.isFeatured) revalidatePath('/');
```

---

## SEO

### Auto-Generated
- Schema.org Product/Service markup
- OpenGraph meta tags
- Canonical URLs
- Sitemap entries

### Schema.org
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "सोलर पैनल",
  "description": "...",
  "brand": { "@type": "Brand", "name": "KSE Solar Energy" },
  "offers": {
    "@type": "Offer",
    "price": 45000,
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  }
}
```

---

## File Structure

```
/app
├── /admin
│   ├── /content
│   │   ├── /products
│   │   │   ├── page.tsx
│   │   │   ├── /new/page.tsx
│   │   │   ├── /[id]/page.tsx
│   │   │   └── /categories/page.tsx
│   │   ├── /services
│   │   │   ├── page.tsx
│   │   │   ├── /new/page.tsx
│   │   │   └── /[id]/page.tsx
│   │   └── /about/page.tsx
│   ├── /media/page.tsx
│   └── layout.tsx
│
├── /api
│   ├── /products/...
│   ├── /services/...
│   ├── /about/...
│   ├── /upload/route.ts
│   └── /media/...
│
├── /products/page.tsx        (update to fetch from DB)
├── /services/page.tsx        (update to fetch from DB)
└── /about/page.tsx           (update to fetch from DB)

/components
├── /admin
│   ├── ProductForm.tsx
│   ├── ServiceForm.tsx
│   ├── AboutPageEditor.tsx
│   ├── RichTextEditor.tsx
│   ├── IconPicker.tsx
│   ├── ImageUploader.tsx
│   ├── SpecsEditor.tsx
│   ├── BadgeEditor.tsx
│   └── CardStylePicker.tsx
└── /products
    └── ProductCard.tsx       (renders based on cardStyle)

/lib
├── prisma.ts
├── upload.ts
├── sanitize.ts
├── validation/
│   ├── product.ts
│   └── service.ts
└── seo/
    └── schema.ts
```

---

## Implementation Phases (Reduced Scope)

### Phase 1: Foundation (3 days)
- [ ] Database migration (all models, no revisions)
- [ ] Vercel Blob setup and upload API
- [ ] TipTap editor with sanitization
- [ ] Zod validation schemas

### Phase 2: Product CMS (4 days)
- [ ] Product list page with filters
- [ ] Product create/edit form
- [ ] Card style picker component
- [ ] Specs/badges/features editors
- [ ] Category management
- [ ] Drag-to-reorder

### Phase 3: Service CMS (2 days)
- [ ] Service list page
- [ ] Service create/edit form
- [ ] Features/process/FAQ editors

### Phase 4: About Page CMS (2 days)
- [ ] Section-based editor
- [ ] Stats/values editors
- [ ] Team management

### Phase 5: Frontend Integration (2 days)
- [ ] Update /products page to fetch from DB
- [ ] Update /services page to fetch from DB
- [ ] Update /about page to fetch from DB
- [ ] Caching and revalidation

### Phase 6: Polish (1 day)
- [ ] Autosave with localStorage recovery
- [ ] Live preview in editor
- [ ] SEO meta tags

**Total: ~14 days**

---

## Verification Plan

### Unit Tests
- Validation schemas
- Sanitization functions
- Image processing

### Integration Tests
- API endpoints (CRUD operations)
- Image upload flow
- Revision creation

### E2E Tests (Playwright)
1. Create product with all fields
2. Upload image and verify blur placeholder
3. Change card style and verify preview
4. Save and verify public page renders correctly
5. Edit and verify revision created
6. Restore revision and verify data

### Manual Testing
1. Admin flow: Login → Create product → Verify on public page
2. Autosave: Edit → Close browser → Reopen → Verify recovery
3. Image upload: Upload → Verify optimization → Verify blur on public
4. Reorder: Drag products → Verify order persists
5. Mobile admin: Test all forms on tablet/phone

---

## Dependencies

### New Packages
```json
{
  "@tiptap/react": "^2.x",
  "@tiptap/starter-kit": "^2.x",
  "@tiptap/extension-link": "^2.x",
  "@tiptap/extension-image": "^2.x",
  "@tiptap/extension-placeholder": "^2.x",
  "@tiptap/extension-character-count": "^2.x",
  "@vercel/blob": "^0.x",
  "sanitize-html": "^2.x",
  "isomorphic-dompurify": "^2.x",
  "sharp": "^0.x",
  "lodash": "^4.x"
}
```

### Existing (Already Installed)
- Prisma
- Zod
- NextAuth
- react-icons

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Data loss | Autosave + localStorage backup |
| XSS attacks | sanitize-html (server) + DOMPurify (client) |
| Large images | Server-side resize before upload |
| Slow pages | ISR caching + blur placeholders |

---

## Future Enhancements (Out of Scope)

- Multi-language (i18n) support
- Scheduled publishing
- A/B testing
- Analytics integration
- Webhooks for external integrations
- Import/export functionality
