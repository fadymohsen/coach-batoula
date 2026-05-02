import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/coach-batoula-logo.jpg"
                alt="كوتش بتولة"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-navy">كوتش بتولة</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-navy">
              <a href="#about" className="hover:text-pink-dark transition-colors">
                من أنا
              </a>
              <a href="#services" className="hover:text-pink-dark transition-colors">
                خدماتي
              </a>
              <a href="#testimonials" className="hover:text-pink-dark transition-colors">
                آراء العملاء
              </a>
              <a href="#contact" className="hover:text-pink-dark transition-colors">
                تواصلي معي
              </a>
            </div>
            <a
              href="#contact"
              className="bg-navy text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-navy-dark transition-colors"
            >
              احجزي الآن
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pink-light to-background">
        {/* Decorative flowers */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-8 h-8 text-pink-medium text-3xl">✿</div>
          <div className="absolute top-20 left-20 w-6 h-6 text-pink-medium text-2xl">✿</div>
          <div className="absolute bottom-20 right-40 w-10 h-10 text-pink-medium text-4xl">✿</div>
          <div className="absolute top-40 left-10 w-5 h-5 text-pink-medium text-xl">✿</div>
          <div className="absolute bottom-10 left-40 w-7 h-7 text-pink-medium text-3xl">✿</div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-right space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy leading-tight">
                ابدأي رحلتك
                <br />
                <span className="text-pink-dark">نحو حياة أفضل</span>
              </h1>
              <p className="text-lg sm:text-xl text-navy/70 max-w-lg mx-auto lg:mx-0 lg:mr-0">
                مع كوتش بتولة، هتكتشفي قوتك الحقيقية وتتعلمي إزاي تعيشي حياة
                متوازنة ومليانة إنجازات.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#contact"
                  className="bg-navy text-white px-8 py-3.5 rounded-full text-lg font-bold hover:bg-navy-dark transition-colors"
                >
                  احجزي جلستك الأولى
                </a>
                <a
                  href="#services"
                  className="border-2 border-navy text-navy px-8 py-3.5 rounded-full text-lg font-bold hover:bg-navy hover:text-white transition-colors"
                >
                  اعرفي أكتر
                </a>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-pink-medium/30 rounded-full blur-3xl" />
                <Image
                  src="/coach-batoula.jpg"
                  alt="كوتش بتولة"
                  width={450}
                  height={550}
                  className="relative rounded-3xl drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 flex justify-center">
              <Image
                src="/og-image.jpg"
                alt="كوتش بتولة"
                width={400}
                height={400}
                className="rounded-full shadow-xl"
              />
            </div>
            <div className="flex-1 space-y-6 text-center lg:text-right">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
                مين كوتش بتولة؟
              </h2>
              <p className="text-lg text-navy/70 leading-relaxed">
                أنا بتولة، مدربة متخصصة في تطوير الذات والتنمية البشرية. شغفي
                إني أساعد كل ست تكتشف إمكانياتها وتحقق أهدافها. من خلال خبرتي،
                بقدم برامج تدريبية مصممة خصيصاً عشان تناسب احتياجاتك.
              </p>
              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto lg:mx-0 lg:mr-0">
                <div className="bg-pink-light rounded-2xl p-6 text-center">
                  <div className="text-3xl font-extrabold text-pink-dark">+500</div>
                  <div className="text-sm font-semibold text-navy mt-1">متدربة</div>
                </div>
                <div className="bg-pink-light rounded-2xl p-6 text-center">
                  <div className="text-3xl font-extrabold text-pink-dark">+50</div>
                  <div className="text-sm font-semibold text-navy mt-1">ورشة عمل</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-background to-pink-light/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
              خدماتي
            </h2>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto">
              برامج تدريبية متنوعة تناسب احتياجاتك وأهدافك
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "جلسات فردية",
                desc: "جلسات خاصة ومخصصة ليكي، نشتغل فيها على أهدافك الشخصية خطوة بخطوة.",
                icon: "💎",
              },
              {
                title: "ورش عمل جماعية",
                desc: "ورش تفاعلية في مجموعات صغيرة، تجربة مليانة طاقة وتعلم وتبادل خبرات.",
                icon: "👥",
              },
              {
                title: "برامج تطوير الذات",
                desc: "برامج متكاملة لتطوير مهاراتك وبناء ثقتك بنفسك وتحقيق التوازن في حياتك.",
                icon: "🌟",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-pink-light"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
                <p className="text-navy/60 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
              آراء المتدربات
            </h2>
            <p className="text-lg text-navy/60">
              اللي بيقولوه عني بعد التجربة
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "سارة أحمد",
                text: "كوتش بتولة غيرت حياتي بجد! اتعلمت أحط أهداف واضحة وأحققها. أنصح أي حد يبدأ معاها.",
              },
              {
                name: "نور محمد",
                text: "الورش بتاعتها مليانة طاقة إيجابية ومعلومات عملية. كل جلسة بتخليني أطلع بحاجة جديدة.",
              },
              {
                name: "مريم خالد",
                text: "أسلوبها بسيط ومؤثر جداً. حسيت بفرق كبير في ثقتي بنفسي بعد البرنامج التدريبي.",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-pink-light/50 rounded-3xl p-8 border border-pink-medium/30"
              >
                <div className="text-pink-dark text-4xl mb-4">&ldquo;</div>
                <p className="text-navy/70 leading-relaxed mb-6">{testimonial.text}</p>
                <div className="font-bold text-navy">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-b from-pink-light to-pink-medium/40"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-6">
            مستعدة تبدأي رحلتك؟
          </h2>
          <p className="text-lg text-navy/70 mb-10 max-w-xl mx-auto">
            احجزي جلستك الأولى دلوقتي وابدأي أول خطوة في رحلة التغيير.
          </p>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-navy text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-navy-dark transition-colors shadow-lg"
          >
            تواصلي معي عبر واتساب
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-dark text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/coach-batoula-logo.jpg"
                alt="كوتش بتولة"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="text-lg font-bold">كوتش بتولة</span>
            </div>
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} كوتش بتولة. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
