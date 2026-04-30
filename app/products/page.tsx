import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { FaSolarPanel, FaIndustry, FaChargingStation, FaCarBattery, FaCheckCircle } from "react-icons/fa";

const SITE_NAME = "PM सूर्य घर योजना";

export function generateMetadata(): Metadata {
  return {
    title: `हमारे उत्पाद | ${SITE_NAME}`,
    description: "उच्च गुणवत्ता वाले सोलर पैनल, इन्वर्टर, बैटरी और स्ट्रक्चर।",
  };
}

interface Product {
  id: string;
  title: string;
  titleEn: string | null;
  slug: string;
  subtitle: string | null;
  description: string;
  cardStyle: string;
  icon: string | null;
  image: string | null;
  imageAlt: string | null;
  blurDataUrl: string | null;
  badges: { text: string; color: string }[] | null;
  features: { text: string }[] | null;
  ctaText: string | null;
  ctaLink: string | null;
}

const getProducts = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      const products = await prisma.product.findMany({
        where: { status: "published", isActive: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      });
      return products as Product[];
    } catch {
      return [];
    }
  },
  ["products-page"],
  { tags: ["products"], revalidate: 3600 }
);

function ProductCard({ product, index }: { product: Product; index: number }) {
  const cardStyle = product.cardStyle || "standard";
  const badges = (product.badges as { text: string; color: string }[]) || [];

  const colSpan = cardStyle === "featured" || cardStyle === "showcase" ? "lg:col-span-2" : "lg:col-span-1";
  const isHighlight = cardStyle === "highlight";

  const badgeColorClass = (color: string) => {
    const colors: Record<string, string> = {
      emerald: "bg-emerald-100 text-emerald-700",
      saffron: "bg-saffron-100 text-saffron-700",
      blue: "bg-blue-100 text-blue-700",
      slate: "bg-slate-100 text-slate-700",
    };
    return colors[color] || colors.slate;
  };

  if (cardStyle === "featured") {
    return (
      <AnimatedSection direction="up" delay={0.1 * index} className={colSpan}>
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 hover:border-emerald-300 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)] transition-all duration-300 h-full flex flex-col md:flex-row items-center gap-8 group overflow-hidden relative shadow-sm">
          <div className="w-full md:w-1/2 relative z-10 flex flex-col justify-between h-full">
            <div>
              {product.icon && (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 text-2xl">
                  {product.icon}
                </div>
              )}
              <h3 className="text-3xl font-black text-slate-800 mb-4">{product.title}</h3>
              <div
                className="text-slate-600 font-medium leading-relaxed mb-6 text-lg prose prose-sm"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
                {badges.map((badge, i) => (
                  <span key={i} className={`text-xs font-bold px-3 py-1 rounded-full border ${badgeColorClass(badge.color)}`}>
                    <FaCheckCircle className="inline mr-1 text-emerald-500" /> {badge.text}
                  </span>
                ))}
              </div>
            )}
          </div>
          {product.image && (
            <div className="w-full md:w-1/2 relative h-[250px] md:h-full min-h-[250px] rounded-2xl overflow-hidden shadow-inner group-hover:shadow-lg transition-all duration-500">
              <Image
                src={product.image}
                alt={product.imageAlt || product.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                placeholder={product.blurDataUrl ? "blur" : "empty"}
                blurDataURL={product.blurDataUrl || undefined}
              />
            </div>
          )}
        </div>
      </AnimatedSection>
    );
  }

  if (isHighlight) {
    return (
      <AnimatedSection direction="up" delay={0.1 * index} className={colSpan}>
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 h-full flex flex-col justify-between group relative overflow-hidden text-white shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            {product.icon && (
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-600 flex items-center justify-center mb-6 shadow-inner text-xl">
                {product.icon}
              </div>
            )}
            <h3 className="text-2xl font-black text-white mb-3">{product.title}</h3>
            <div
              className="text-slate-400 font-medium leading-relaxed mb-4 prose prose-sm prose-invert"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
          {product.ctaText && (
            <Link href={product.ctaLink || "/contact"} className="text-left font-bold text-blue-400 hover:text-blue-300 flex items-center gap-2 group-hover:gap-3 transition-all relative z-10">
              {product.ctaText} <span>→</span>
            </Link>
          )}
        </div>
      </AnimatedSection>
    );
  }

  if (cardStyle === "showcase") {
    return (
      <AnimatedSection direction="up" delay={0.1 * index} className={colSpan}>
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 h-full flex flex-col md:flex-row items-center gap-8 group relative overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:border-blue-200 transition-all shadow-sm">
          <div className="w-full md:w-1/3 flex justify-center items-center">
            <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-100 shadow-inner flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-50 transition-all text-3xl">
              {product.icon || "📦"}
            </div>
          </div>
          <div className="w-full md:w-2/3 md:pl-8 md:border-l border-slate-100 text-center md:text-left">
            <h3 className="text-2xl font-black text-slate-800 mb-3">{product.title}</h3>
            <div
              className="text-slate-600 font-medium mb-4 leading-relaxed prose prose-sm"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            {badges.length > 0 && (
              <span className="inline-block py-1 px-3 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest border border-slate-200">
                {badges[0].text}
              </span>
            )}
          </div>
        </div>
      </AnimatedSection>
    );
  }

  // Standard card
  return (
    <AnimatedSection direction="up" delay={0.1 * index} className={colSpan}>
      <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-saffron-300 hover:shadow-[0_20px_40px_rgba(245,158,11,0.1)] transition-all duration-300 h-full flex flex-col justify-between group shadow-sm">
        <div>
          {product.icon && (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center mb-6 shadow-lg shadow-saffron-500/30 text-xl">
              {product.icon}
            </div>
          )}
          <h3 className="text-2xl font-black text-slate-800 mb-3">{product.title}</h3>
          <div
            className="text-slate-600 font-medium mb-6 prose prose-sm"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
        {product.ctaText && (
          <Link href={product.ctaLink || "/contact"} className="text-left font-bold text-saffron-600 hover:text-saffron-700 flex items-center gap-2 group-hover:gap-3 transition-all">
            {product.ctaText} <span>→</span>
          </Link>
        )}
      </div>
    </AnimatedSection>
  );
}

function FallbackProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatedSection direction="up" delay={0.1} className="lg:col-span-2">
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 hover:border-emerald-300 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)] transition-all duration-300 h-full flex flex-col md:flex-row items-center gap-8 group overflow-hidden relative shadow-sm">
          <div className="w-full md:w-1/2 relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                <FaSolarPanel className="text-white text-2xl" />
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-4">सोलर पैनल (Solar Panels)</h3>
              <p className="text-slate-600 font-medium leading-relaxed mb-6 text-lg">
                नवीनतम तकनीक वाले मोनोक्रिस्टलाइन (Monocrystalline) और हाफ-कट (Half-Cut) सोलर पैनल। कम धूप में भी बेहतरीन प्रदर्शन और 25 साल की पावर वारंटी।
              </p>
            </div>
            <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
              <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200"><FaCheckCircle className="inline mr-1 text-emerald-500" /> Tier 1 Brands</span>
              <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200"><FaCheckCircle className="inline mr-1 text-emerald-500" /> 25 Yrs Warranty</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative h-[250px] md:h-full min-h-[250px] rounded-2xl overflow-hidden shadow-inner group-hover:shadow-lg transition-all duration-500">
            <Image src="/images/solar_panel_product.png" alt="Premium Quality Solar Panel" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.2} className="lg:col-span-1">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-saffron-300 hover:shadow-[0_20px_40px_rgba(245,158,11,0.1)] transition-all duration-300 h-full flex flex-col justify-between group shadow-sm">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center mb-6 shadow-lg shadow-saffron-500/30">
              <FaChargingStation className="text-white text-xl" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3">सोलर इन्वर्टर</h3>
            <p className="text-slate-600 font-medium mb-6">
              स्मार्ट और हाई-एफिशिएंसी इन्वर्टर जो बिजली के नुकसान को रोकते हैं और आपको मोबाइल ऐप से मॉनिटरिंग की सुविधा देते हैं।
            </p>
          </div>
          <button className="text-left font-bold text-saffron-600 hover:text-saffron-700 flex items-center gap-2 group-hover:gap-3 transition-all">
            संपर्क करें <span>→</span>
          </button>
        </div>
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.3} className="lg:col-span-1">
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 h-full flex flex-col justify-between group relative overflow-hidden text-white shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-600 flex items-center justify-center mb-6 shadow-inner">
              <FaCarBattery className="text-blue-400 text-xl" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">सोलर बैटरी</h3>
            <p className="text-slate-400 font-medium leading-relaxed mb-4">
              <strong>लिथियम-आयन (Lithium)</strong> और <strong>लेड-एसिड (Lead Acid)</strong> ट्यूबलर बैटरियां जो रात में भी आपको बिना रुकी बिजली देंगी।
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.4} className="lg:col-span-2">
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 h-full flex flex-col md:flex-row items-center gap-8 group relative overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:border-blue-200 transition-all shadow-sm">
          <div className="w-full md:w-1/3 flex justify-center items-center">
            <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-100 shadow-inner flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-50 transition-all">
              <FaIndustry className="text-blue-500 text-3xl" />
            </div>
          </div>
          <div className="w-full md:w-2/3 md:pl-8 md:border-l border-slate-100 text-center md:text-left">
            <h3 className="text-2xl font-black text-slate-800 mb-3">सोलर स्ट्रक्चर (Solar Structures)</h3>
            <p className="text-slate-600 font-medium mb-4 leading-relaxed">
              जंग-रोधी (Rust-proof) गैल्वेनाइज्ड आयरन (GI) स्ट्रक्चर। यह हाई-विंड स्पीड यानी तेज़ आंधी और तूफ़ान में भी आपके सोलर पैनल को मजबूती से सुरक्षित रखता है।
            </p>
            <span className="inline-block py-1 px-3 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest border border-slate-200">
              मज़बूत बुनियाद
            </span>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 relative overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 bg-gradient-to-br from-emerald-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-saffron-500/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <AnimatedSection direction="up" delay={0.1}>
                <span className="inline-block py-1 px-3 rounded-full bg-saffron-500/20 text-saffron-300 font-bold text-sm tracking-widest uppercase mb-6 border border-saffron-500/30">
                  सर्वश्रेष्ठ गुणवत्ता
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
                  हमारे <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">प्रीमियम</span> उत्पाद
                </h1>
                <p className="text-lg md:text-xl text-emerald-100/80 font-medium leading-relaxed">
                  अंतरराष्ट्रीय मानकों पर खरे उतरने वाले बेहतरीन सोलर उत्पाद जो देते हैं 25 साल की गारंटी।
                </p>
              </AnimatedSection>
            </div>

            <div className="w-full md:w-1/2">
              <AnimatedSection direction="left" delay={0.2}>
                <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-emerald-700/50 group">
                  <Image
                    src="/images/products_hero.png"
                    alt="Premium Solar Inverter and Battery"
                    width={800}
                    height={600}
                    className="w-full h-[350px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none flex flex-col justify-end p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-saffron-500/20 backdrop-blur-md border border-saffron-400/30 flex items-center justify-center">
                         <FaChargingStation className="text-saffron-400 text-xl" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">एडवांस टेक्नोलॉजी</div>
                        <div className="text-saffron-300 text-sm font-medium">Smart Inverters</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-20 md:py-32 relative z-20 -mt-10">
        <div className="max-w-6xl mx-auto px-5">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <FallbackProducts />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
