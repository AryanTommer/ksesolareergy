import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { FaSolarPanel, FaBroom, FaWrench, FaBolt, FaBatteryFull, FaTools } from "react-icons/fa";

const SITE_NAME = "PM सूर्य घर योजना";

export function generateMetadata(): Metadata {
  return {
    title: `हमारी सेवाएँ | ${SITE_NAME}`,
    description: "सोलर पैनल इंस्टॉलेशन, सफाई, रखरखाव और बैटरी रिपेयरिंग जैसी हमारी प्रीमियम सेवाएँ।",
  };
}

interface Service {
  id: string;
  title: string;
  titleEn: string | null;
  slug: string;
  tagline: string | null;
  description: string;
  excerpt: string | null;
  icon: string;
  iconColor: string;
  image: string | null;
  imageAlt: string | null;
  blurDataUrl: string | null;
  features: { title: string; description?: string }[] | null;
  ctaText: string | null;
  ctaLink: string | null;
}

const getServices = unstable_cache(
  async (): Promise<Service[]> => {
    try {
      const services = await prisma.service.findMany({
        where: { status: "published", isActive: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      });
      return services as Service[];
    } catch {
      return [];
    }
  },
  ["services-page"],
  { tags: ["services"], revalidate: 3600 }
);

const iconColorClasses: Record<string, string> = {
  saffron: "text-saffron-500",
  emerald: "text-emerald-500",
  blue: "text-blue-500",
  slate: "text-slate-500",
  rose: "text-rose-500",
  purple: "text-purple-500",
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const colorClass = iconColorClasses[service.iconColor] || iconColorClasses.saffron;

  return (
    <AnimatedSection direction="up" delay={0.1 * index}>
      <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col">
        <div className="bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-slate-100">
          <span className={`text-4xl ${colorClass}`}>{service.icon}</span>
        </div>
        <h3 className="text-xl font-extrabold text-slate-800 mb-3 group-hover:text-saffron-600 transition-colors">
          {service.title}
        </h3>
        {service.excerpt ? (
          <p className="text-slate-500 font-medium leading-relaxed flex-1">{service.excerpt}</p>
        ) : (
          <div
            className="text-slate-500 font-medium leading-relaxed flex-1 prose prose-sm"
            dangerouslySetInnerHTML={{ __html: service.description }}
          />
        )}
        {service.ctaText && (
          <Link
            href={service.ctaLink || `/services/${service.slug}`}
            className="mt-4 inline-flex items-center gap-2 text-saffron-600 font-bold hover:text-saffron-700 group-hover:gap-3 transition-all"
          >
            {service.ctaText} <span>→</span>
          </Link>
        )}
      </div>
    </AnimatedSection>
  );
}

function FallbackServices() {
  const services = [
    {
      icon: <FaSolarPanel className="text-4xl text-saffron-500" />,
      title: "सोलर पैनल इंस्टॉलेशन",
      desc: "छत पर विशेषज्ञ टीम द्वारा सुरक्षित और लंबे समय तक चलने वाला सोलर पैनल इंस्टॉलेशन।",
    },
    {
      icon: <FaBroom className="text-4xl text-emerald-500" />,
      title: "सोलर पैनल की सफाई और धुलाई",
      desc: "पैनल की कार्यक्षमता बढ़ाने के लिए पेशेवर सफाई और धुलाई सेवाएँ। धूप का पूरा फायदा उठाएँ।",
    },
    {
      icon: <FaTools className="text-4xl text-blue-500" />,
      title: "मरम्मत और रखरखाव सेवाएँ",
      desc: "समय-समय पर चेकअप और रखरखाव ताकि आपका सोलर सिस्टम 25 साल तक बिना रुके काम करे।",
    },
    {
      icon: <FaBolt className="text-4xl text-amber-500" />,
      title: "इन्वर्टर रिपेयरिंग",
      desc: "सोलर इन्वर्टर की किसी भी तकनीकी समस्या का त्वरित और विश्वसनीय समाधान।",
    },
    {
      icon: <FaBatteryFull className="text-4xl text-rose-500" />,
      title: "बैटरी रिपेयरिंग",
      desc: "लेड एसिड या लिथियम बैटरी की जांच और रिपेयरिंग जिससे बैटरी बैकअप हमेशा दमदार रहे।",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <AnimatedSection key={index} direction="up" delay={0.1 * index}>
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group h-full">
            <div className="bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-slate-100">
              {service.icon}
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 mb-3 group-hover:text-saffron-600 transition-colors">
              {service.title}
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed">{service.desc}</p>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 relative overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 bg-gradient-to-br from-slate-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <AnimatedSection direction="left" delay={0.1}>
                <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-sm tracking-widest uppercase mb-6 border border-emerald-500/30 shadow-sm">
                  प्रीमियम सेवाएँ
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
                  हमारी <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-400 to-saffron-300">विशेषज्ञ</span> सेवाएँ
                </h1>
                <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
                  हम सिर्फ इंस्टॉलेशन नहीं करते, हम आपके सोलर सिस्टम को 25 साल तक बेहतरीन स्थिति में रखने के लिए पूरी तरह प्रतिबद्ध हैं।
                </p>
              </AnimatedSection>
            </div>

            <div className="w-full md:w-1/2">
              <AnimatedSection direction="right" delay={0.2}>
                <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-700/50 group">
                  <Image
                    src="/images/services_hero.png"
                    alt="Professional Solar Panel Installation"
                    width={800}
                    height={600}
                    className="w-full h-[350px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none flex flex-col justify-end p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 flex items-center justify-center">
                        <FaTools className="text-emerald-400 text-xl" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">प्रशिक्षित इंजीनियर</div>
                        <div className="text-emerald-300 text-sm font-medium">Top-tier Service</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 relative z-20 -mt-10">
        <div className="max-w-6xl mx-auto px-5">
          {services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          ) : (
            <FallbackServices />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
