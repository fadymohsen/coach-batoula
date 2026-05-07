"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import {
  Heart, Star, ShieldCheck, Clock, Zap, CheckCircle2, ArrowRight,
  ChevronDown, Activity, Apple, BookOpen, Award, GraduationCap,
  Phone, Menu, X, TrendingDown,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Helper components
───────────────────────────────────────────────────────────── */

function AnimatedCounter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

function Wave({ bg, fill }: { bg: string; fill: string }) {
  return (
    <div style={{ background: bg }}>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full block" style={{ height: 56, display: "block" }}>
        <path fill={fill} d="M0,28 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Animation variants
───────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.65 } },
};
const staggerGrid = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5 } },
};

const TESTIMONIALS = [
  {
    name: "سارة م.",
    tag: "مقاومة أنسولين",
    result: "−8 كيلو في 6 أسابيع",
    stars: 5,
    quote: "كنت يأسانة من كل دايت جربته. بتولة عطتني نظام ما حسيت فيه بأي حرمان، وأول مرة بحياتي أثبّت وزني بعد ما نزلت.",
  },
  {
    name: "نور خ.",
    tag: "تكيس مبايض",
    result: "−12 كيلو في 3 شهور",
    stars: 5,
    quote: "عندي تكيس مبايض وما كنت أتوقع نتيجة بهالسرعة. بتولة فهمت حالتي الصحية وصممت نظام خاص فيني، والنتائج تحكي.",
  },
  {
    name: "فاطمة ع.",
    tag: "أم مرضعة",
    result: "−5 كيلو في شهر",
    stars: 5,
    quote: "كنت خايفة لأني مرضعة، بس بتولة ضمنت احتياجاتي وبنتي. النظام كان مريح، والوزن نزل وأنا مبسوطة ومو تعبانة.",
  },
];

const CERTIFICATES = [
  { img: "/content/_.jpg (3).jpeg", title: "SuperHuman Clinics",  sub: "تدريب عملي في التغذية العلاجية" },
  { img: "/content/_.jpg (5).jpeg", title: "Challenge Academy",   sub: "تغذية سريرية ورياضية والسمنة" },
  { img: "/content/_.jpg (9).jpeg", title: "ICNC 2026",           sub: "مؤتمر التغذية التجميلية الدولي" },
  { img: "/content/_.jpg.jpeg",     title: "ICN Certificate",     sub: "شهادة في التغذية الصحية" },
  { img: "/content/_.jpg (2).jpeg", title: "Diabetes Workshop",   sub: "ورشة عمل متخصصة بالسكري" },
  { img: "/content/_.jpg (8).jpeg", title: "CFT Course",          sub: "تشريح الجسم وتصميم البرامج" },
];

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 55 });
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-rose/30">

      {/* ── Scroll progress ───────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-rose z-[200] origin-left"
        style={{ scaleX }}
      />

      {/* ── Floating WhatsApp ─────────────────── */}
      <motion.a
        href="https://wa.me/"
        target="_blank"
        rel="noopener"
        className="fixed bottom-8 left-6 z-50 w-14 h-14 rounded-full bg-rose text-white flex items-center justify-center shadow-2xl shadow-rose/30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 220, damping: 18 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        aria-label="واتساب"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </motion.a>

      {/* ── Navbar ───────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 glass" style={{ top: 3 }}>
        <div className="max-w-7xl mx-auto px-5 h-[72px] flex items-center justify-between">
          <motion.a
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-rose">
              <Image src="/coach-batoula-logo.jpg" alt="كوتش بتولة" fill className="object-cover" />
            </div>
            <span className="text-xl font-black text-charcoal">كوتش بتولة</span>
          </motion.a>

          <div className="hidden lg:flex items-center gap-9 text-sm font-bold text-charcoal/65">
            {[["#about","من أنا"],["#certs","شهاداتي"],["/plans","الباقات"],["#faq","الأسئلة"]].map(([href,label]) => (
              <a key={href} href={href} className="relative group py-1">
                {label}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-rose scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              href="https://wa.me/"
              target="_blank"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="btn-shine hidden sm:flex bg-charcoal text-white px-6 py-2.5 rounded-full text-sm font-black hover:bg-charcoal-dark transition-all shadow-md items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal/50 focus-visible:ring-offset-2"
            >
              <Phone size={15} />
              احجزي الآن
            </motion.a>
            <button
              onClick={() => setNavOpen(true)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full hover:bg-charcoal/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/50"
              aria-label="القائمة"
            >
              <Menu size={22} className="text-charcoal" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile nav overlay ────────────────── */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            className="fixed inset-0 z-[150] bg-white flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setNavOpen(false)}
              className="absolute top-6 left-6 w-11 h-11 flex items-center justify-center rounded-full bg-charcoal/5 hover:bg-charcoal/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/50"
              aria-label="إغلاق القائمة"
            >
              <X size={20} className="text-charcoal" />
            </button>
            {[["#about","من أنا"],["#certs","شهاداتي"],["/plans","الباقات"],["#faq","الأسئلة"]].map(([href,label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setNavOpen(false)}
                className="text-3xl font-black text-charcoal hover:text-rose transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="https://wa.me/"
              onClick={() => setNavOpen(false)}
              className="mt-4 flex items-center gap-3 bg-rose text-white px-10 py-4 rounded-full text-lg font-black shadow-xl shadow-rose/20"
            >
              <Phone size={20} />
              احجزي الآن
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Dot-grid texture */}
        <div className="absolute inset-0 hero-dots opacity-60 pointer-events-none" />
        {/* Animated glow blobs */}
        <div className="float-1 absolute top-24 right-[6%]  w-[380px] h-[380px] bg-rose/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="float-2 absolute bottom-24 left-[6%] w-[300px] h-[300px] bg-gold/10 rounded-full blur-[90px]  pointer-events-none" />
        <div className="float-3 absolute top-1/2 left-1/2  w-[200px] h-[200px] bg-rose/5  rounded-full blur-[80px]  pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-10 items-center z-10 py-16">

          {/* Text */}
          <motion.div
            initial="hidden" animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-7 text-right order-2 lg:order-1"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-light text-rose-dark text-xs font-bold border border-rose/20">
                <Star size={12} className="fill-rose-dark shrink-0" />
                كوتش تغذية معتمدة · ماجستير أمراض مزمنة · Life Coach
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl lg:text-[4.4rem] font-black text-charcoal leading-[1.08]">
              القصة مو &quot;دايت&quot;<br />
              <span className="text-gold italic">القصة &quot;حياة&quot;</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[1.15rem] text-charcoal/60 leading-relaxed max-w-lg ml-auto">
              أنا هون لحتى غيّر الفكرة اللي ببالنا كلنا عن الدايت. الدايت مو عقوبة، ولا هو فترة حرمان مؤقتة —
              هدفي ساعدك تبني نمط حياة صحي بيمشيك العمر كله.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-end">
              <a href="#plans" className="btn-shine bg-charcoal text-white px-9 py-4 rounded-full text-base font-black hover:bg-charcoal-dark transition-all shadow-xl flex items-center justify-center gap-3">
                ابدأي رحلتك الآن
                <ArrowRight size={19} className="rotate-180" />
              </a>
              <a href="#about" className="border-2 border-charcoal/12 px-9 py-4 rounded-full text-base font-black hover:bg-charcoal/5 transition-all text-charcoal flex items-center justify-center">
                تعرفي على قصتي
              </a>
            </motion.div>

            {/* Animated stats */}
            <motion.div variants={fadeUp} className="flex items-center gap-6 pt-7 border-t border-charcoal/5 justify-end">
              <div className="text-right">
                <div className="text-2xl font-black text-charcoal">
                  +<AnimatedCounter to={500} />
                </div>
                <div className="text-[11px] font-bold text-charcoal/40 tracking-tight">متدربة سعيدة</div>
              </div>
              <div className="w-px h-9 bg-charcoal/8" />
              <div className="text-right">
                <div className="text-2xl font-black text-rose">
                  <AnimatedCounter to={27} suffix=" kg" />
                </div>
                <div className="text-[11px] font-bold text-charcoal/40 tracking-tight">تجربة شخصية ناجحة</div>
              </div>
              <div className="w-px h-9 bg-charcoal/8" />
              <div className="text-right">
                <div className="text-2xl font-black text-gold">
                  +<AnimatedCounter to={8} />
                </div>
                <div className="text-[11px] font-bold text-charcoal/40 tracking-tight">شهادات دولية</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="absolute inset-0 rounded-[44px] bg-gradient-to-br from-rose/30 via-transparent to-gold/30 blur-3xl scale-90 pointer-events-none" />
            <div className="relative rounded-[44px] overflow-hidden shadow-2xl bg-[#0b1018] w-full max-w-[460px] aspect-[3/4]">
              <Image src="/coach-batoula.jpg" alt="كوتش بتولة" fill className="object-cover object-top" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1018]/65 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 glass p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-charcoal">دبلوم تغذية علاجية</div>
                    <div className="text-xs text-charcoal/50 mt-0.5">American Institute · CertiPro Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-20 pointer-events-none">
          <ChevronDown size={28} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS STRIP
      ═══════════════════════════════════════ */}
      <section className="bg-white border-y border-charcoal/5 py-10">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={staggerGrid} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: <Heart size={20} className="text-rose" />, to: 500, prefix: "+", suffix: "", label: "متدربة سعيدة" },
              { icon: <TrendingDown size={20} className="text-gold" />, to: 27, prefix: "",  suffix: " kg", label: "إنجازي الشخصي" },
              { icon: <Award size={20} className="text-charcoal" />, to: 8, prefix: "+",  suffix: "", label: "شهادة دولية" },
              { icon: <Zap size={20} className="text-rose-dark" />, to: 12, prefix: "",  suffix: " ساعة", label: "أقصى وقت انتظار" },
            ].map((s, i) => (
              <motion.div key={i} variants={staggerItem} className="text-center space-y-1">
                <div className="flex justify-center mb-2">{s.icon}</div>
                <div className="text-3xl font-black text-charcoal">
                  <AnimatedCounter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="text-xs font-bold text-charcoal/40">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════ */}
      <section id="about" className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative group order-2 lg:order-1"
            >
              <div className="absolute -inset-3 bg-rose/8 rounded-[56px] blur-2xl group-hover:bg-rose/14 transition-all duration-700 pointer-events-none" />
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-[4/5]">
                <Image src="/content/_.jpg (12).jpeg" alt="بتول في حفل التخرج" fill className="object-cover object-center" />
              </div>
              <div className="absolute top-8 -right-4 glass p-5 rounded-3xl shadow-2xl hidden lg:block border border-white/60">
                <div className="text-3xl font-black text-rose mb-1">27 kg</div>
                <div className="text-sm font-semibold text-charcoal/70 leading-snug text-right max-w-[168px]">
                  خسرتهم دهوناً خلال 6 شهور بدون حرمان
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden" whileInView="show" viewport={{ once: true }}
              className="space-y-7 text-right order-1 lg:order-2"
            >
              <motion.div variants={fadeUp} className="space-y-3">
                <h2 className="text-4xl lg:text-5xl font-black text-charcoal leading-snug">
                  أنا بتول.. <br />
                  <span className="text-rose">وقبل ما أكون مدربتك،<br />كنت بمكانك.</span>
                </h2>
                <div className="h-1.5 w-20 bg-gold rounded-full ml-auto" />
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-5 text-[1.05rem] text-charcoal/60 leading-relaxed">
                <p>
                  كنت عم عاني من زيادة الوزن، وجربت كل أنواع الدايت "المشكل والملون".. بس النتيجة كانت تعب
                  أكتر وأمراض. صار عندي مقاومة أنسولين، دهون على الكبد، كولسترول، والتهاب غدة.
                </p>
                <blockquote className="relative bg-rose-light/35 px-6 py-5 rounded-2xl italic text-charcoal/75 text-base">
                  <span className="absolute top-3 right-3 text-5xl text-rose/20 font-serif leading-none">&ldquo;</span>
                  بلشت أفهم إنو المشكلة مو بالدايت، المشكلة إني ماني فاهمة جسمي. قررت أعمل تغيير لنمط أكلي
                  بيتناسب مع حياتي ومواعيدي أنا.. وهون كانت شرارة الأمل.
                </blockquote>
                <p>
                  استمريت 6 شهور ونزلت <strong className="font-black text-charcoal">27 كيلو دهون</strong>! وثبّتت وزني بـ 6 شهور تانية بكل
                  سهولة — لأني ما كنت عاملة دايت، كنت عم عيش نمط حياة جديد.
                </p>
              </motion.div>

              <motion.div variants={staggerGrid} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: <BookOpen size={16}/>, title: "دبلوم التغذية العلاجية", sub: "American Institute" },
                  { icon: <Award size={16}/>,    title: "ماجستير الأمراض المزمنة", sub: "قيد الدراسة" },
                  { icon: <Activity size={16}/>, title: "Life Coach معتمدة",        sub: "NTC · NLP Practitioner" },
                  { icon: <ShieldCheck size={16}/>, title: "SuperHuman Clinics",    sub: "تدريب عملي وعيادي" },
                ].map((item, idx) => (
                  <motion.div key={idx} variants={staggerItem}
                    className="flex items-center gap-3 p-4 rounded-2xl border border-charcoal/5 hover:border-rose/25 hover:bg-rose-light/15 transition-all text-right"
                  >
                    <div className="flex-1">
                      <div className="font-black text-charcoal text-sm">{item.title}</div>
                      <div className="text-xs text-charcoal/40 mt-0.5">{item.sub}</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-rose-light text-rose flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wave transition → mission */}
      <Wave bg="var(--background)" fill="var(--charcoal)" />

      {/* ═══════════════════════════════════════
          MISSION
      ═══════════════════════════════════════ */}
      <section id="mission" className="bg-charcoal text-white relative overflow-hidden" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose/8  rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-0  left-0  w-72 h-72 bg-gold/5  rounded-full blur-[90px]  pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-3xl mx-auto text-center space-y-5 mb-16">
            <h2 className="text-4xl lg:text-5xl font-black leading-tight">
              رسالتي إلك: <br />
              <span className="text-rose">الأكل متعة.. مو عقوبة</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              ليش طريقتي مختلفة؟ لأننا بنبني نمط حياة بيشبهك أنتِ — مو نظام مؤقت بينتهي وترجعي لعاداتك القديمة.
            </p>
          </motion.div>

          <motion.div
            variants={staggerGrid} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              { title: "أكل البيت هو الأساس", desc: "ما في داعي تطبخي لحالك. كلي من نفس طبخ عيلتك بتعديلات بسيطة وذكية.", icon: <Apple className="w-6 h-6"/>, num: "١" },
              { title: "بدون حرمان",           desc: "السر هو الاعتدال مو المنع. الأكل متعة ومستحيل نستمر إذا حارمين حالنا.", icon: <Heart className="w-6 h-6"/>, num: "٢" },
              { title: "واقعية ومرنة",          desc: "بعرف إنو الحياة فيها عزائم وضغوطات. النظام بيتفصّل على حياتك أنتِ.", icon: <Clock className="w-6 h-6"/>, num: "٣" },
              { title: "تعديل سلوك",            desc: "الوزن رقم بيطلع وبينزل، بس السلوك هو اللي بيبقى. نشتغل على الجذور.", icon: <Zap  className="w-6 h-6"/>, num: "٤" },
            ].map((f, idx) => (
              <motion.div key={idx} variants={staggerItem} className="glass-dark p-7 rounded-[28px] group hover:border-rose/25 transition-all">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-5xl font-black text-white/6 select-none">{f.num}</span>
                  <div className="w-12 h-12 rounded-xl bg-white/6 flex items-center justify-center text-rose group-hover:scale-110 group-hover:bg-rose/20 transition-all">
                    {f.icon}
                  </div>
                </div>
                <h3 className="text-lg font-black mb-2 text-right">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed text-right">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Wave transition → light */}
      <Wave bg="var(--charcoal)" fill="var(--background)" />

      {/* ═══════════════════════════════════════
          TARGET AUDIENCE
      ═══════════════════════════════════════ */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center space-y-4 mb-14">
            <h2 className="text-4xl lg:text-5xl font-black text-charcoal">أي حالة… معي خطة لها</h2>
            <p className="text-charcoal/50 text-lg">خبرة متخصصة مع طيف واسع من الحالات الصحية</p>
          </motion.div>

          <motion.div
            variants={staggerGrid} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              "مقاومة الأنسولين","تكيس المبايض","خمول الغدة الدرقية","نشاط الغدة الدرقية",
              "الأطفال","الحوامل والمرضعات","مرضى المرارة","جرثومة المعدة",
              "جراحات السمنة","السمنة والنحافة",
            ].map((tag, idx) => (
              <motion.div key={idx} variants={staggerItem}
                className="px-6 py-3 rounded-full bg-white border border-charcoal/6 text-charcoal font-bold hover:border-rose hover:text-rose hover:shadow-lg transition-all shadow-sm text-sm cursor-default"
                whileHover={{ scale: 1.07, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {tag}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TRANSFORMATION
      ═══════════════════════════════════════ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-rose/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.1 } } }}
              initial="hidden" whileInView="show" viewport={{ once: true }}
              className="space-y-7 text-right order-2 lg:order-1"
            >
              <motion.div variants={fadeUp} className="space-y-3">
                <span className="inline-block text-rose font-black tracking-widest text-xs uppercase px-4 py-2 rounded-full bg-rose-light border border-rose/15">
                  نتائج حقيقية
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-charcoal leading-snug">
                  نتائج مو بس <br />
                  <span className="text-rose">بالأرقام… بالصور</span>
                </h2>
                <div className="h-1.5 w-20 bg-gold rounded-full ml-auto" />
              </motion.div>

              <motion.p variants={fadeUp} className="text-[1.05rem] text-charcoal/60 leading-relaxed">
                ميزان الصبية وأطباقها — تعبها وربي يعطيها ألف عافية. هي شاطرة، حابة الرحلة،
                مستمتعة فيها. تعرف مصلحتها وعم تحاول وتستمر وتصبر لتشوف أفضل النتائج.
              </motion.p>

              <motion.div variants={staggerGrid} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-3 gap-3">
                <motion.div variants={staggerItem} className="text-center p-4 rounded-2xl bg-background border border-charcoal/5 hover:border-rose/20 transition-colors">
                  <div className="text-xl font-black text-charcoal">
                    ٤<span className="text-charcoal/35 mx-0.5">–</span>٦ <span className="text-rose text-sm">كيلو</span>
                  </div>
                  <div className="text-[11px] text-charcoal/40 font-bold mt-1 leading-snug">بالشهر الواحد</div>
                </motion.div>
                {[
                  { to: 500, prefix:"+", suffix:"", label:"عميلة نجحت" },
                  { to: 100, prefix:"+", suffix:"", label:"نجاح الشهرين الأخيرين" },
                ].map((s, i) => (
                  <motion.div key={i} variants={staggerItem} className="text-center p-4 rounded-2xl bg-background border border-charcoal/5 hover:border-rose/20 transition-colors">
                    <div className="text-xl font-black text-charcoal">
                      {s.prefix}<AnimatedCounter to={s.to} />
                    </div>
                    <div className="text-[11px] text-charcoal/40 font-bold mt-1 leading-snug">{s.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.blockquote variants={fadeUp} className="relative bg-gold-light/40 px-7 py-6 rounded-2xl text-charcoal/70 italic text-right leading-relaxed text-base">
                <span className="absolute top-2 right-4 text-5xl text-gold/25 font-serif leading-none select-none" aria-hidden="true">&ldquo;</span>
                &quot;بدي أنزل بس 5 كيلو وكتيرررر، صعب التزم وصعب ينزلو، بس مع بتولة مافي شي مستحيل —
                نتيجة شهرين مرونة ووعي ونظام مريح بدون حرمان!&quot;
              </motion.blockquote>

              <motion.div variants={fadeUp}>
                <a href="https://wa.me/" target="_blank" className="btn-shine inline-flex items-center gap-3 bg-charcoal text-white px-8 py-4 rounded-full font-black hover:bg-charcoal-dark transition-all shadow-lg">
                  <Phone size={17} />
                  ابدأي رحلتك اليوم
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative order-1 lg:order-2"
            >
              <div className="absolute -inset-4 bg-gold/10 rounded-[56px] blur-2xl pointer-events-none" />
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
                <Image src="/content/Picsart_26-05-02_11-03-52-910.jpg.jpeg" alt="قبل وبعد" width={600} height={720} className="w-full object-cover" />
                <div className="absolute top-4 right-4 left-4 flex justify-between">
                  <div className="bg-white/85 backdrop-blur-sm text-charcoal text-xs font-black px-4 py-1.5 rounded-full shadow">قبل</div>
                  <div className="bg-charcoal/85 backdrop-blur-sm text-white  text-xs font-black px-4 py-1.5 rounded-full shadow">بعد</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 hero-dots opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center space-y-4 mb-14">
            <span className="inline-block text-rose font-black tracking-widest text-xs uppercase px-4 py-2 rounded-full bg-rose-light border border-rose/15">
              آراء المتدربات
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-charcoal">ماذا قالت الصبايا؟</h2>
            <p className="text-charcoal/50 text-lg">نتائج حقيقية من متدربات حقيقيات</p>
          </motion.div>

          <motion.div
            variants={staggerGrid} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Featured testimonial */}
            <motion.div variants={staggerItem} className="bg-rose-light/25 rounded-[28px] p-8 md:p-10 text-right">
              <motion.div
                className="flex gap-1 justify-end mb-5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }}
              >
                {Array.from({ length: TESTIMONIALS[0].stars }).map((_, s) => (
                  <motion.span
                    key={s}
                    variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 480, damping: 20 } } }}
                    className="inline-flex"
                  >
                    <Star size={16} className="fill-gold text-gold" />
                  </motion.span>
                ))}
              </motion.div>
              <p className="text-lg md:text-xl text-charcoal/75 italic leading-relaxed mb-7">
                &ldquo;{TESTIMONIALS[0].quote}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-5 border-t border-rose/10">
                <span className="text-sm font-black text-rose bg-white/80 px-4 py-1.5 rounded-full shadow-sm">
                  {TESTIMONIALS[0].result}
                </span>
                <div className="text-right">
                  <div className="font-black text-charcoal">{TESTIMONIALS[0].name}</div>
                  <div className="text-xs text-rose font-bold mt-0.5">{TESTIMONIALS[0].tag}</div>
                </div>
              </div>
            </motion.div>

            {/* Two compact testimonials */}
            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
              className="grid md:grid-cols-2 gap-6"
            >
              {TESTIMONIALS.slice(1).map((t, i) => (
                <motion.div key={i} variants={staggerItem} className="bg-white/90 rounded-3xl border border-charcoal/6 p-6 text-right shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <Star key={s} size={13} className="fill-gold text-gold" />
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="font-black text-charcoal text-sm">{t.name}</div>
                      <div className="text-xs text-rose font-bold mt-0.5">{t.tag}</div>
                    </div>
                  </div>
                  <p className="text-charcoal/65 text-sm leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-charcoal/5">
                    <span className="text-xs font-bold text-charcoal/35">نتيجة موثّقة</span>
                    <span className="text-sm font-black text-rose bg-rose-light px-3 py-1 rounded-full">
                      {t.result}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PLANS
      ═══════════════════════════════════════ */}
      <section id="plans" className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"radial-gradient(circle at 12% 50%, rgba(183,110,121,0.07) 0%, transparent 50%), radial-gradient(circle at 88% 50%, rgba(197,160,89,0.07) 0%, transparent 50%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14 space-y-4">
            <span className="inline-block text-gold font-black tracking-widest text-xs uppercase px-4 py-2 rounded-full bg-gold-light border border-gold/20">
              باقات الاشتراك
            </span>
            <h2 className="text-4xl lg:text-6xl font-black text-charcoal">باقات التغيير</h2>
            <p className="text-charcoal/50 text-xl font-bold">ليست حمية مؤقتة… بل رحلة حقيقية</p>
          </motion.div>

          <motion.div
            variants={staggerGrid} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-7"
          >
            {/* Plan 1 */}
            <motion.div variants={staggerItem} className="premium-card flex flex-col">
              <div className="space-y-2 mb-7 text-right">
                <span className="text-rose font-black tracking-widest text-xs uppercase">الخطوة الأولى</span>
                <h3 className="text-3xl font-black text-charcoal">شهر واحد</h3>
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-4xl font-black text-charcoal">$45</span>
                  <span className="text-charcoal/30 text-sm">/ شهر</span>
                </div>
                <div className="text-xs font-bold text-rose-dark bg-rose-light px-3 py-1.5 rounded-full inline-block">تجديد شهري $35</div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["اتصال شخصي لتقييم الحالة الصحية والغذائية","نظام غذائي مخصص بحسب الهدف ونمط الحياة","خطة رياضية مناسبة للمستوى البدني","تحديث النظام كل 10 أيام","متابعة مباشرة مع بتولة عبر واتساب"].map((item,i)=>(
                  <li key={i} className="flex items-start gap-3 justify-end">
                    <span className="text-charcoal/60 text-sm font-semibold text-right leading-relaxed">{item}</span>
                    <CheckCircle2 size={17} className="text-gold shrink-0 mt-0.5" />
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/" className="btn-shine w-full py-4 rounded-2xl bg-charcoal text-white font-black text-center hover:bg-charcoal-dark transition-all flex items-center justify-center gap-2">
                <Phone size={16}/> احجزي الآن
              </a>
            </motion.div>

            {/* Plan 2 — Featured */}
            <motion.div variants={{ hidden:{opacity:0,y:60}, show:{opacity:1,y:0,transition:{duration:0.6}} }} className="premium-card flex flex-col border-rose ring-4 ring-rose/10 relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-rose text-white px-5 py-1.5 rounded-full text-xs font-black shadow-lg shadow-rose/20 whitespace-nowrap flex items-center gap-1.5">
                <Star size={11} className="fill-white shrink-0" />
                الأكثر طلباً
              </div>
              <div className="space-y-2 mb-7 text-right">
                <span className="text-rose font-black tracking-widest text-xs uppercase">تغيير خطير</span>
                <h3 className="text-3xl font-black text-charcoal">3 شهور</h3>
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-4xl font-black text-charcoal">$99</span>
                  <span className="text-charcoal/30 text-sm">/ 3 شهور</span>
                </div>
                <div className="text-xs font-bold text-charcoal/45 bg-charcoal/5 px-3 py-1.5 rounded-full inline-block">توفير أكثر من 25%</div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["اتصال تفصيلي لتقييم الحالة وتحديد الأهداف","نظام غذائي مخصص يتناسب مع طبيعة الجسم","خطة رياضية عملية قابلة للتطبيق","تحديث النظام كل 15 يوم لضمان التحفيز","متابعة مستمرة ودعم خلال الرحلة كاملة"].map((item,i)=>(
                  <li key={i} className="flex items-start gap-3 justify-end">
                    <span className="text-charcoal/60 text-sm font-semibold text-right leading-relaxed">{item}</span>
                    <CheckCircle2 size={17} className="text-rose shrink-0 mt-0.5" />
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/" className="btn-shine w-full py-4 rounded-2xl bg-rose text-white font-black text-center hover:bg-rose-dark transition-all shadow-xl shadow-rose/20 flex items-center justify-center gap-2">
                <Phone size={16}/> احجزي الآن
              </a>
            </motion.div>

            {/* Plan 3 */}
            <motion.div variants={staggerItem} className="premium-card flex flex-col shadow-2xl">
              <div className="space-y-2 mb-7 text-right">
                <span className="text-gold font-black tracking-widest text-xs uppercase">الرحلة الكاملة</span>
                <h3 className="text-3xl font-black text-charcoal">سنة كاملة</h3>
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-4xl font-black text-gold">$299</span>
                  <span className="text-charcoal/40 text-sm">/ سنة</span>
                </div>
                <div className="text-xs font-bold text-gold/70 bg-gold/10 px-3 py-1.5 rounded-full inline-block">ليست حمية مؤقتة… رحلة للأبد</div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["اتصال شهري للمتابعة وتقييم التقدم","نظام غذائي مخصص ومتجدد بحسب المرحلة","تجديد النظام كل 15 يوم طوال العام","خطة خاصة لشهر رمضان المبارك","دعم مستمر لضمان استمرارية النتائج"].map((item,i)=>(
                  <li key={i} className="flex items-start gap-3 justify-end">
                    <span className="text-charcoal/60 text-sm font-semibold text-right leading-relaxed">{item}</span>
                    <CheckCircle2 size={17} className="text-gold shrink-0 mt-0.5" />
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/" className="btn-shine w-full py-4 rounded-2xl bg-gold text-charcoal font-black text-center hover:bg-gold-dark transition-all flex items-center justify-center gap-2">
                <Phone size={16}/> ابدأي رحلتك السنوية
              </a>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-10 text-center space-y-1">
            <p className="text-charcoal/40 text-sm font-bold">المتابعة مع بتولة شخصياً عبر واتساب · الخاص والمجموعات متاحان</p>
            <p className="text-charcoal/30 text-xs">في حال تم الدفع يتم الحجز والتواصل خلال 12 ساعة فقط</p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CERTIFICATES
      ═══════════════════════════════════════ */}
      <section id="certs" className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center space-y-4 mb-14">
            <span className="inline-block text-rose font-black tracking-widest text-xs uppercase px-4 py-2 rounded-full bg-rose-light border border-rose/15">
              مؤهلات موثّقة
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-charcoal">شهادات معتمدة دولياً</h2>
            <p className="text-charcoal/50 text-lg max-w-2xl mx-auto">
              بتابع تطوير نفسي باستمرار وبحضر مؤتمرات دورية عشان أعطيكم الأفضل دائماً
            </p>
          </motion.div>

          <motion.div
            variants={staggerGrid} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-5"
          >
            {CERTIFICATES.map((cert, idx) => (
              <motion.div
                key={idx} variants={staggerItem}
                className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-[400ms] aspect-[3/4] cursor-zoom-in"
              >
                <Image src={cert.img} alt={cert.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-350 text-right">
                  <div className="text-white font-black text-sm leading-snug">{cert.title}</div>
                  <div className="text-white/60 text-xs mt-1">{cert.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerGrid} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mt-6 grid sm:grid-cols-3 gap-5"
          >
            {[
              { src: "/content/_.jpg (6).jpeg",  alt: "بتولة تحمل شهادة الدبلوم" },
              { src: "/content/_.jpg (10).jpeg", alt: "بتولة مع شهاداتها" },
              { src: "/content/_.jpg (11).jpeg", alt: "بتولة في INSEP PRO" },
            ].map((p, i) => (
              <motion.div key={i} variants={staggerItem} className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
                <Image src={p.src} alt={p.alt} fill className="object-cover object-center hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ
      ═══════════════════════════════════════ */}
      <section id="faq" className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14 space-y-4">
            <h2 className="text-4xl font-black text-charcoal">الأسئلة الشائعة</h2>
            <p className="text-charcoal/50 text-lg">كل ما تحتاجين معرفته قبل البدء</p>
          </motion.div>

          <motion.div
            variants={staggerGrid} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="space-y-3"
          >
            {[
              { q:"كم كيلو بنزل بلشهر؟",                                  a:"من 4 لـ 6 كيلو حسب الوزن والعمر والحالة الصحية. النتائج تختلف من شخص لآخر لكن بنضمن التقدم المستمر." },
              { q:"هل متاح دايت للحامل والمرضع؟",                         a:"نعم، متاح دايت مخصص وآمن تماماً للحوامل والمرضعات مع مراعاة كافة الاحتياجات الغذائية." },
              { q:"المتابعة مع بتولة شخصياً؟",                            a:"نعم مباشرة، المتابعة مع بتولة شخصياً عبر الواتساب لضمان أفضل نتيجة ممكنة." },
              { q:"كروب ولا خاص؟",                                        a:"متاح في الحالتين حسب اختيارك — في كروب الصبايا على واتساب أو متابعة خاصة." },
              { q:"امتى فينا نبدأ؟",                                      a:"في حال تم الدفع يتم الحجز والتواصل معك خلال 12 ساعة فقط — البداية سريعة!" },
              { q:"هل البرنامج مناسب لمرضى السكري ومقاومة الأنسولين؟",   a:"نعم، لدي شهادة متخصصة في ورشة السكري التغذوية وخبرة واسعة في التعامل مع هذه الحالات." },
            ].map((faq, i) => (
              <motion.div key={i} variants={staggerItem}>
                <div className="premium-card !p-0 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 hover:bg-rose-light/20 transition-colors"
                    aria-expanded={openFaq === i}
                  >
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
                      className="text-rose shrink-0"
                    >
                      <ChevronDown size={19} />
                    </motion.div>
                    <span className="font-black text-charcoal text-[0.95rem] flex-1 pr-4 text-right">{faq.q}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-6 pb-6 pt-3 text-charcoal/60 text-sm leading-relaxed text-right border-t border-rose-light/40">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER / CTA
      ═══════════════════════════════════════ */}
      <footer className="bg-charcoal text-white py-20 relative overflow-hidden">
        <div className="absolute top-0  right-0 w-80 h-80 bg-rose/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0  w-64 h-64 bg-gold/8  rounded-full blur-[80px]  pointer-events-none" />
        <div className="float-1 absolute top-1/3 left-1/4 w-32 h-32 bg-rose/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-5">
            <h2 className="text-4xl lg:text-5xl font-black leading-tight">مستعدة لتبدأي حياة جديدة؟</h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              انضمي الآن لأكثر من 500 صبية غيّروا حياتهم للأفضل. أنتِ مو بس عم تشتركي بـ &quot;دايت&quot; —
              أنتِ عم تبدأي رحلة تغيير حقيقية تمتد لعام كامل.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col items-center gap-6">
            <a
              href="https://wa.me/"
              target="_blank"
              className="btn-shine px-12 py-6 rounded-full bg-rose text-white text-xl font-black hover:bg-rose-dark transition-all shadow-2xl shadow-rose/25 flex items-center gap-4"
            >
              تواصل معي عبر واتساب
              <Zap size={22} />
            </a>

            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/batool.home?igsh=MXhnY3R5eDh0d20wcQ==" target="_blank" rel="noopener" aria-label="إنستغرام" className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-rose hover:border-rose/50 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1HAy8RGqgV/" target="_blank" rel="noopener" aria-label="فيسبوك" className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-rose hover:border-rose/50 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@batool_home?_r=1&_t=ZN-95w9fa2xqyZ" target="_blank" rel="noopener" aria-label="تيك توك" className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-rose hover:border-rose/50 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="https://youtube.com/@batoolhome6303?si=1u2ZLkH4PhLCTd30" target="_blank" rel="noopener" aria-label="يوتيوب" className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-rose hover:border-rose/50 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </motion.div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
            <p>© {new Date().getFullYear()} كوتش بتولة. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-1">
              <span>Powered by</span>
              <a href="https://veliq.co" target="_blank" rel="noopener" className="text-white/50 hover:text-rose transition-colors font-bold">VELIQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
