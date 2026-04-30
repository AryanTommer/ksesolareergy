import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { FaHeart, FaCheckCircle, FaUsers, FaLeaf, FaShieldAlt, FaLinkedin, FaEnvelope } from "react-icons/fa";

const SITE_NAME = "PM सूर्य घर योजना";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutPage = await prisma.aboutPage.findUnique({ where: { id: "main" } });
    return {
      title: aboutPage?.metaTitle || `हमारे बारे में | ${SITE_NAME}`,
      description: aboutPage?.metaDescription || "जानें कि कैसे हम PM सूर्य घर योजना के माध्यम से उत्तर प्रदेश को रोशन कर रहे हैं।",
    };
  } catch {
    return {
      title: `हमारे बारे में | ${SITE_NAME}`,
      description: "जानें कि कैसे हम PM सूर्य घर योजना के माध्यम से उत्तर प्रदेश को रोशन कर रहे हैं।",
    };
  }
}

interface AboutPageData {
  heroEnabled: boolean;
  heroTagline: string | null;
  heroTitle: string;
  heroHighlight: string | null;
  heroDescription: string | null;
  heroImage: string | null;
  heroImageAlt: string | null;
  statsEnabled: boolean;
  statsTitle: string | null;
  stats: { value: string; label: string; suffix?: string }[] | null;
  missionEnabled: boolean;
  missionTitle: string | null;
  missionContent: string | null;
  missionImage: string | null;
  valuesEnabled: boolean;
  valuesTitle: string | null;
  valuesSubtitle: string | null;
  values: { title: string; description: string; icon: string; color: string }[] | null;
  teamEnabled: boolean;
  teamTitle: string | null;
  teamSubtitle: string | null;
  ctaEnabled: boolean;
  ctaTitle: string | null;
  ctaDescription: string | null;
  ctaButtonText: string | null;
  ctaButtonLink: string | null;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image: string | null;
  linkedin: string | null;
  email: string | null;
}

const getAboutData = unstable_cache(
  async (): Promise<{ page: AboutPageData | null; team: TeamMember[] }> => {
    try {
      const [page, team] = await Promise.all([
        prisma.aboutPage.findUnique({ where: { id: "main" } }),
        prisma.teamMember.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
      ]);
      return { page: page as AboutPageData | null, team: team as TeamMember[] };
    } catch {
      return { page: null, team: [] };
    }
  },
  ["about-page"],
  { tags: ["about", "team"], revalidate: 3600 }
);

const valueColorClasses: Record<string, string> = {
  saffron: "text-saffron-500",
  emerald: "text-emerald-500",
  blue: "text-blue-500",
  slate: "text-slate-500",
};

function FallbackPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 text-slate-900 relative">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-saffron-50 md:rounded-l-[100px] -z-10" />
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <AnimatedSection direction="left" delay={0.1}>
                <span className="inline-block py-1 px-3 rounded-full bg-saffron-100 text-saffron-700 font-bold text-sm tracking-widest uppercase mb-6 border border-saffron-200">
                  PM सूर्य घर — उत्तर प्रदेश
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
                  हर घर रोशन, <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">भारत का भविष्य</span>
                </h1>
                <p className="text-lg text-slate-600 mb-8 font-medium leading-relaxed">
                  हम सिर्फ सोलर पैनल नहीं लगाते, हम विश्वास और पर्यावरण की सुरक्षा की नींव रखते हैं।
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <FaCheckCircle className="text-emerald-500 text-lg" />
                    </div>
                    <span className="font-bold text-slate-700">100% गुणवत्ता</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-saffron-100 flex items-center justify-center">
                      <FaUsers className="text-saffron-500 text-lg" />
                    </div>
                    <span className="font-bold text-slate-700">50K+ ग्राहक</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
            <div className="w-full md:w-1/2">
              <AnimatedSection direction="right" delay={0.2}>
                <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 group">
                  <Image src="/images/about_hero.png" alt="Solar Panel Installation PM Surya Ghar" width={800} height={600} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="max-w-6xl mx-auto px-5">
          <AnimatedSection direction="up" delay={0.1} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">हमारा नज़रिया <FaLeaf className="inline text-emerald-500" /></h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">हम पर्यावरण और तकनीकी उत्कृष्टता को एक साथ ला रहे हैं।</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection direction="up" delay={0.2}>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                <FaHeart className="text-4xl text-rose-500 mb-6" />
                <h3 className="text-2xl font-bold text-slate-800 mb-4">ग्राहक संतुष्टि</h3>
                <p className="text-slate-600 font-medium">हमारा हर कदम हमारे ग्राहकों की मुस्कान सुनिश्चित करने के लिए होता है।</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.3}>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                <FaShieldAlt className="text-4xl text-blue-500 mb-6" />
                <h3 className="text-2xl font-bold text-slate-800 mb-4">भरोसा और वारंटी</h3>
                <p className="text-slate-600 font-medium">बिना किसी छिपी हुई फीस के पूरी पारदर्शिता और 25 साल तक की लंबी वारंटी।</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.4}>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                <FaLeaf className="text-4xl text-emerald-500 mb-6" />
                <h3 className="text-2xl font-bold text-slate-800 mb-4">स्वच्छ पर्यावरण</h3>
                <p className="text-slate-600 font-medium">प्रदूषण मुक्त ऊर्जा को बढ़ावा देकर हम स्वच्छ कल का निर्माण कर रहे हैं।</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

export default async function AboutPage() {
  const { page, team } = await getAboutData();

  if (!page) {
    return (
      <main className="flex min-h-screen flex-col bg-slate-50 relative overflow-x-hidden">
        <Header />
        <FallbackPage />
        <Footer />
      </main>
    );
  }

  const stats = (page.stats as { value: string; label: string; suffix?: string }[]) || [];
  const values = (page.values as { title: string; description: string; icon: string; color: string }[]) || [];

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 relative overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      {page.heroEnabled && (
        <section className="pt-32 pb-20 md:pt-40 md:pb-24 text-slate-900 relative">
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-saffron-50 md:rounded-l-[100px] -z-10" />
          <div className="max-w-6xl mx-auto px-5 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <AnimatedSection direction="left" delay={0.1}>
                  {page.heroTagline && (
                    <span className="inline-block py-1 px-3 rounded-full bg-saffron-100 text-saffron-700 font-bold text-sm tracking-widest uppercase mb-6 border border-saffron-200">
                      {page.heroTagline}
                    </span>
                  )}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
                    {page.heroTitle}
                    {page.heroHighlight && (
                      <>
                        {" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                          {page.heroHighlight}
                        </span>
                      </>
                    )}
                  </h1>
                  {page.heroDescription && (
                    <div
                      className="text-lg text-slate-600 mb-8 font-medium leading-relaxed prose"
                      dangerouslySetInnerHTML={{ __html: page.heroDescription }}
                    />
                  )}
                </AnimatedSection>
              </div>
              <div className="w-full md:w-1/2">
                <AnimatedSection direction="right" delay={0.2}>
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 group">
                    <Image
                      src={page.heroImage || "/images/about_hero.png"}
                      alt={page.heroImageAlt || "About Us"}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {page.statsEnabled && stats.length > 0 && (
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-5">
            {page.statsTitle && (
              <AnimatedSection direction="up" delay={0.1} className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">{page.statsTitle}</h2>
              </AnimatedSection>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedSection key={index} direction="up" delay={0.1 * index} className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-emerald-600">
                    {stat.value}
                    {stat.suffix && <span className="text-saffron-500">{stat.suffix}</span>}
                  </div>
                  <div className="text-slate-600 font-medium mt-2">{stat.label}</div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission Section */}
      {page.missionEnabled && page.missionContent && (
        <section className="py-20 md:py-32 bg-slate-50">
          <div className="max-w-6xl mx-auto px-5">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {page.missionImage && (
                <div className="w-full md:w-1/2">
                  <AnimatedSection direction="left" delay={0.1}>
                    <Image
                      src={page.missionImage}
                      alt="Our Mission"
                      width={600}
                      height={400}
                      className="rounded-3xl shadow-lg"
                    />
                  </AnimatedSection>
                </div>
              )}
              <div className={page.missionImage ? "w-full md:w-1/2" : "w-full max-w-3xl mx-auto"}>
                <AnimatedSection direction="right" delay={0.2}>
                  {page.missionTitle && (
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">{page.missionTitle}</h2>
                  )}
                  <div
                    className="text-slate-600 font-medium leading-relaxed prose prose-lg"
                    dangerouslySetInnerHTML={{ __html: page.missionContent }}
                  />
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      {page.valuesEnabled && values.length > 0 && (
        <section className="py-20 md:py-32 bg-white relative">
          <div className="max-w-6xl mx-auto px-5">
            <AnimatedSection direction="up" delay={0.1} className="text-center mb-16">
              {page.valuesTitle && (
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                  {page.valuesTitle}
                </h2>
              )}
              {page.valuesSubtitle && (
                <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">{page.valuesSubtitle}</p>
              )}
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <AnimatedSection key={index} direction="up" delay={0.1 * index}>
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                    <span className={`text-4xl ${valueColorClasses[value.color] || "text-saffron-500"} mb-6 block`}>
                      {value.icon}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">{value.title}</h3>
                    <p className="text-slate-600 font-medium">{value.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {page.teamEnabled && team.length > 0 && (
        <section className="py-20 md:py-32 bg-slate-50">
          <div className="max-w-6xl mx-auto px-5">
            <AnimatedSection direction="up" delay={0.1} className="text-center mb-16">
              {page.teamTitle && (
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">{page.teamTitle}</h2>
              )}
              {page.teamSubtitle && (
                <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">{page.teamSubtitle}</p>
              )}
            </AnimatedSection>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <AnimatedSection key={member.id} direction="up" delay={0.1 * index}>
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100 hover:shadow-lg transition-all">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={120}
                        height={120}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-slate-200 flex items-center justify-center text-3xl text-slate-400">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <h3 className="font-bold text-slate-800">{member.name}</h3>
                    <p className="text-sm text-slate-500 mb-3">{member.role}</p>
                    <div className="flex justify-center gap-3">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" className="text-blue-600 hover:text-blue-700">
                          <FaLinkedin />
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="text-slate-500 hover:text-slate-700">
                          <FaEnvelope />
                        </a>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {page.ctaEnabled && page.ctaTitle && (
        <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-black mb-4">{page.ctaTitle}</h2>
              {page.ctaDescription && <p className="text-emerald-100 text-lg mb-8">{page.ctaDescription}</p>}
              {page.ctaButtonText && (
                <Link
                  href={page.ctaButtonLink || "/contact"}
                  className="inline-block px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
                >
                  {page.ctaButtonText}
                </Link>
              )}
            </AnimatedSection>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
