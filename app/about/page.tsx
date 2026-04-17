import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FaHeart, FaCheckCircle, FaUsers, FaLeaf, FaShieldAlt } from "react-icons/fa";

export const metadata = {
  title: "हमारे बारे में | PM सूर्य घर योजना",
  description: "जानें कि कैसे हम PM सूर्य घर योजना के माध्यम से उत्तर प्रदेश को रोशन कर रहे हैं।",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 relative overflow-x-hidden">
      <Header />
      
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
                  हमारा मिशन है उत्तर प्रदेश के हर परिवार को मुफ्त और स्वच्छ बिजली से जोड़ना, ताकि बिजली का बिल ज़ीरो हो सके और आपकी आमदनी बढ़े।
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
                  <Image 
                    src="/images/about_hero.png" 
                    alt="Solar Panel Installation PM Surya Ghar" 
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
                 <p className="text-slate-600 font-medium">हमारा हर कदम हमारे ग्राहकों की मुस्कान सुनिश्चित करने के लिए होता है। हम इंस्टॉलेशन से लेकर सर्विसिंग तक आपके साथ हैं।</p>
               </div>
             </AnimatedSection>
             <AnimatedSection direction="up" delay={0.3}>
               <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                 <FaShieldAlt className="text-4xl text-blue-500 mb-6" />
                 <h3 className="text-2xl font-bold text-slate-800 mb-4">भरोसा और वारंटी</h3>
                 <p className="text-slate-600 font-medium">बिना किसी छिपी हुई फीस के पूरी पारदर्शिता और 25 साल तक की लंबी वारंटी जो आपको निश्चिंत करती है।</p>
               </div>
             </AnimatedSection>
             <AnimatedSection direction="up" delay={0.4}>
               <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                 <FaLeaf className="text-4xl text-emerald-500 mb-6" />
                 <h3 className="text-2xl font-bold text-slate-800 mb-4">स्वच्छ पर्यावरण</h3>
                 <p className="text-slate-600 font-medium">प्रदूषण मुक्त ऊर्जा को बढ़ावा देकर हम आने वाली पीढ़ियों के लिए एक सुरक्षित और स्वच्छ कल का निर्माण कर रहे हैं।</p>
               </div>
             </AnimatedSection>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
