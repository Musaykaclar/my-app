"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaDownload } from "react-icons/fa";

export default function ContractDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : undefined;

  const router = useRouter();
  const [contractText, setContractText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchContract = async () => {
      try {
        const res = await fetch("http://localhost:1337/parse/functions/getContractText", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Parse-Application-Id": process.env.NEXT_PUBLIC_PARSE_APP_ID!,
            "X-Parse-Master-Key": process.env.NEXT_PUBLIC_PARSE_MASTER_KEY!,
          },
          body: JSON.stringify({ filename: `${slug}.txt` }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Dosya okunamadı");
        }

        const data = await res.json();
        setContractText(data.result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Bilinmeyen bir hata oluştu");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [slug]);

  const downloadPDF = () => {
    if (!contractText || !slug) return;

    const blob = new Blob([contractText], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${slug}.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#fb7185] hover:text-[#f35a75] mb-6 transition-colors"
        >
          <FaArrowLeft /> Geri Dön
        </button>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fb7185]"></div>
          </div>
        )}

        {error && <p className="text-red-600 text-center p-4 bg-red-50 rounded-lg">{error}</p>}

        {contractText && slug && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-gray-100">
              <h1 className="text-2xl font-bold text-gray-800 capitalize">
                {slug.replace(/-/g, " ")}
              </h1>
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#fb7185] text-white rounded-lg hover:bg-[#f35a75] transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
              >
                <FaDownload /> PDF Olarak İndir
              </button>
            </div>

            <div className="p-6">
              <pre className="whitespace-pre-wrap font-sans text-gray-700 bg-gray-50 p-5 rounded-lg border border-gray-200 overflow-x-auto">
                {contractText}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
