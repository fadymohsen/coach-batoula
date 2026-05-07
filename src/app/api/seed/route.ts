import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const plans = [
      {
        slug: "basic",
        title: "الخطوة الأولى",
        price: 45,
        benefits: [
          "اتصال شخصي لتقييم الحالة الصحية والغذائية بدقة.",
          "إعداد نظام غذائي مخصص بحسب الهدف ونمط الحياة.",
          "خطة رياضية مناسبة للمستوى البدني.",
          "تحديث النظام كل 10 أيام لضمان أفضل استجابة وتقدم مستمر.",
        ],
      },
      {
        slug: "premium",
        title: "تغيير خطير",
        price: 99,
        benefits: [
          "اتصال تفصيلي لتقييم الحالة الصحية والغذائية وتحديد الأهداف بدقة.",
          "إعداد نظام غذائي مخصص يتناسب مع طبيعة الجسم ونمط الحياة.",
          "خطة رياضية عملية قابلة للتطبيق حسب المستوى البدني.",
          "تحديث النظام كل 15 يوم لضمان استمرار التحفيز وتسريع النتائج.",
        ],
      },
      {
        slug: "ultimate",
        title: "الرحلة",
        price: 299,
        benefits: [
          "اتصال شهري للمتابعة وتقييم التقدم وتعديل المسار عند الحاجة.",
          "نظام غذائي مخصص ومتجدد بحسب المرحلة والتطور.",
          "تجديد النظام كل 15 يوم للحفاظ على التحفيز ومنع الثبات.",
          "خطة خاصة لشهر رمضان تراعي الصيام وتنظيم الوجبات.",
          "دعم مستمر لضمان استمرارية النتائج طوال العام.",
        ],
      },
    ];

    for (const p of plans) {
      await prisma.plan.upsert({
        where: { slug: p.slug },
        update: { title: p.title, price: p.price, benefits: p.benefits },
        create: p,
      });
    }

    const contentItems = [
      { key: "about_title", value: "أنا بتول.. وقبل ما أكون مدربتك، أنا كنت بمكانك بيوم من الأيام." },
      { key: "mission_title", value: 'رسالتي إلك: القصة مو "دايت"، القصة "حياة"' },
      { key: "insta_link", value: "https://www.instagram.com/batool.home?igsh=MXhnY3R5eDh0d20wcQ==" },
      { key: "fb_link", value: "https://www.facebook.com/share/1HAy8RGqgV/" },
      { key: "tiktok_link", value: "https://www.tiktok.com/@batool_home?_r=1&_t=ZN-95w9fa2xqyZ" },
      { key: "yt_link", value: "https://youtube.com/@batoolhome6303?si=1u2ZLkH4PhLCTd30" },
    ];

    for (const item of contentItems) {
      await prisma.content.upsert({
        where: { key: item.key },
        update: { value: item.value },
        create: item,
      });
    }

    return NextResponse.json({ success: true, message: "Seed completed" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: "Seed failed" }, { status: 500 });
  }
}
