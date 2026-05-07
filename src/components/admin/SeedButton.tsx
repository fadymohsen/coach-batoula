"use client";

import { useState } from "react";

export default function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function handleSeed() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      setResult(data.success ? "تم تحميل البيانات بنجاح! أعد تحميل الصفحة." : "فشل التحميل");
    } catch {
      setResult("خطأ في الاتصال");
    }
    setLoading(false);
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <p className="text-sm font-bold text-gray-500 mb-3">تحميل البيانات الأساسية</p>
      <button
        onClick={handleSeed}
        disabled={loading}
        className="px-6 py-3 bg-[#b48a66] text-white rounded-xl font-bold hover:bg-[#9a7555] transition-colors disabled:opacity-50"
      >
        {loading ? "جاري التحميل..." : "تحميل الباقات والمحتوى"}
      </button>
      {result && <p className="mt-3 text-sm font-bold text-green-600">{result}</p>}
    </div>
  );
}
