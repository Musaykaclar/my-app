"use client";

import { useRouter } from "next/navigation";
import { 
  FaHome, FaBriefcase, FaTools, FaShoppingCart, FaHandshake, FaLock, FaStore, FaBuilding, FaPenNib, FaUserTie, 
  FaTruck, FaGavel, FaKey, FaFileSignature, FaGlobe, FaUserShield, FaPeopleArrows, FaUserFriends, FaClipboardCheck, FaLaptopHouse 
} from "react-icons/fa";

const contracts = [
  { name: "Kira Sözleşmesi", icon: <FaHome />, slug: "kira-sozlesmesi" },
  { name: "İş Sözleşmesi", icon: <FaBriefcase />, slug: "is-sozlesmesi" },
  { name: "Hizmet Sözleşmesi", icon: <FaTools />, slug: "hizmet-sozlesmesi" },
  { name: "Satış Sözleşmesi", icon: <FaShoppingCart />, slug: "satis-sozlesmesi" },
  { name: "Ortaklık Sözleşmesi", icon: <FaHandshake />, slug: "ortaklik-sozlesmesi" },
  { name: "Gizlilik Sözleşmesi", icon: <FaLock />, slug: "gizlilik-sozlesmesi" },
  { name: "Bayilik Sözleşmesi", icon: <FaStore />, slug: "bayilik-sozlesmesi" },
  { name: "Franchise Sözleşmesi", icon: <FaBuilding />, slug: "franchise-sozlesmesi" },
  { name: "Vekalet Sözleşmesi", icon: <FaPenNib />, slug: "vekalet-sozlesmesi" },
  { name: "Danışmanlık Sözleşmesi", icon: <FaUserTie />, slug: "danismanlik-sozlesmesi" },
  { name: "Taşeronluk Sözleşmesi", icon: <FaTruck />, slug: "taseronluk-sozlesmesi" },
  { name: "Teminat Sözleşmesi", icon: <FaGavel />, slug: "teminat-sozlesmesi" },
  { name: "Kefalet Sözleşmesi", icon: <FaKey />, slug: "kefalet-sozlesmesi" },
  { name: "Lisans Sözleşmesi", icon: <FaFileSignature />, slug: "lisans-sozlesmesi" },
  { name: "Tedarik Sözleşmesi", icon: <FaGlobe />, slug: "tedarik-sozlesmesi" },
  { name: "Abonelik Sözleşmesi", icon: <FaUserShield />, slug: "abonelik-sozlesmesi" },
  { name: "İşbirliği Sözleşmesi", icon: <FaPeopleArrows />, slug: "isbirligi-sozlesmesi" },
  { name: "Evlilik Mal Rejimi Sözleşmesi", icon: <FaUserFriends />, slug: "evlilik-mal-rejimi-sozlesmesi" },
  { name: "Feragat Sözleşmesi", icon: <FaClipboardCheck />, slug: "feragat-sozlesmesi" },
  { name: "Uzaktan Çalışma Sözleşmesi", icon: <FaLaptopHouse />, slug: "uzaktan-calisma-sozlesmesi" },
];

export default function PopularContracts() {
  const router = useRouter();

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Popüler Sözleşmeler</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {contracts.map((contract, idx) => (
            <button
              key={idx}
              onClick={() => router.push(`/contracts/${contract.slug}`)}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none border border-gray-100 hover:border-[#fb7185]/20"
            >
              <span className="text-4xl mb-3 text-[#fb7185]">{contract.icon}</span>
              <span className="text-md font-semibold text-gray-700 text-center">{contract.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}