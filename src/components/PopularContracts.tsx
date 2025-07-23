"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  FaHome, FaBriefcase, FaTools, FaShoppingCart, FaHandshake, FaLock, FaStore, FaBuilding, FaPenNib, FaUserTie,
  FaTruck, FaGavel, FaKey, FaFileSignature, FaGlobe, FaUserShield, FaPeopleArrows, FaUserFriends, FaClipboardCheck, FaLaptopHouse
} from "react-icons/fa";

const contracts = [
  { key: "rental", icon: <FaHome />, slug: "kira-sozlesmesi" },
  { key: "employment", icon: <FaBriefcase />, slug: "is-sozlesmesi" },
  { key: "service", icon: <FaTools />, slug: "hizmet-sozlesmesi" },
  { key: "sales", icon: <FaShoppingCart />, slug: "satis-sozlesmesi" },
  { key: "partnership", icon: <FaHandshake />, slug: "ortaklik-sozlesmesi" },
  { key: "nda", icon: <FaLock />, slug: "gizlilik-sozlesmesi" },
  { key: "dealership", icon: <FaStore />, slug: "bayilik-sozlesmesi" },
  { key: "franchise", icon: <FaBuilding />, slug: "franchise-sozlesmesi" },
  { key: "proxy", icon: <FaPenNib />, slug: "vekalet-sozlesmesi" },
  { key: "consultancy", icon: <FaUserTie />, slug: "danismanlik-sozlesmesi" },
  { key: "subcontractor", icon: <FaTruck />, slug: "taseronluk-sozlesmesi" },
  { key: "guarantee", icon: <FaGavel />, slug: "teminat-sozlesmesi" },
  { key: "surety", icon: <FaKey />, slug: "kefalet-sozlesmesi" },
  { key: "license", icon: <FaFileSignature />, slug: "lisans-sozlesmesi" },
  { key: "supply", icon: <FaGlobe />, slug: "tedarik-sozlesmesi" },
  { key: "subscription", icon: <FaUserShield />, slug: "abonelik-sozlesmesi" },
  { key: "collaboration", icon: <FaPeopleArrows />, slug: "isbirligi-sozlesmesi" },
  { key: "marriage", icon: <FaUserFriends />, slug: "evlilik-mal-rejimi-sozlesmesi" },
  { key: "waiver", icon: <FaClipboardCheck />, slug: "feragat-sozlesmesi" },
  { key: "remote", icon: <FaLaptopHouse />, slug: "uzaktan-calisma-sozlesmesi" },
];

export default function PopularContracts() {
  const t = useTranslations("PopularContracts");
  const router = useRouter();

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {t("title")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {contracts.map((contract, idx) => (
            <button
              key={idx}
              onClick={() => router.push(`/contracts/${contract.slug}`)}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none border border-gray-100 hover:border-[#fb7185]/20"
            >
              <span className="text-4xl mb-3 text-[#fb7185]">{contract.icon}</span>
              <span className="text-md font-semibold text-gray-700 text-center">
                {t(`contracts.${contract.key}`)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
