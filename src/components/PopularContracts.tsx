"use client"
import { 
  FaHome, FaBriefcase, FaTools, FaShoppingCart, FaHandshake, FaLock, FaStore, FaBuilding, FaPenNib, FaUserTie, 
  FaTruck, FaGavel, FaKey, FaFileSignature, FaGlobe, FaUserShield, FaPeopleArrows, FaUserFriends, FaClipboardCheck, FaLaptopHouse 
} from "react-icons/fa";

const contracts = [
  { name: "Kira Sözleşmesi", icon: <FaHome /> },
  { name: "İş Sözleşmesi", icon: <FaBriefcase /> },
  { name: "Hizmet Sözleşmesi", icon: <FaTools /> },
  { name: "Satış Sözleşmesi", icon: <FaShoppingCart /> },
  { name: "Ortaklık Sözleşmesi", icon: <FaHandshake /> },
  { name: "Gizlilik Sözleşmesi", icon: <FaLock /> },
  { name: "Bayilik Sözleşmesi", icon: <FaStore /> },
  { name: "Franchise Sözleşmesi", icon: <FaBuilding /> },
  { name: "Vekalet Sözleşmesi", icon: <FaPenNib /> },
  { name: "Danışmanlık Sözleşmesi", icon: <FaUserTie /> },
  { name: "Taşeronluk Sözleşmesi", icon: <FaTruck /> },
  { name: "Teminat Sözleşmesi", icon: <FaGavel /> },
  { name: "Kefalet Sözleşmesi", icon: <FaKey /> },
  { name: "Lisans Sözleşmesi", icon: <FaFileSignature /> },
  { name: "Tedarik Sözleşmesi", icon: <FaGlobe /> },
  { name: "Abonelik Sözleşmesi", icon: <FaUserShield /> },
  { name: "İşbirliği Sözleşmesi", icon: <FaPeopleArrows /> },
  { name: "Evlilik Mal Rejimi Sözleşmesi", icon: <FaUserFriends /> },
  { name: "Feragat Sözleşmesi", icon: <FaClipboardCheck /> },
  { name: "Uzaktan Çalışma Sözleşmesi", icon: <FaLaptopHouse /> },
];

export default function PopularContracts() {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center text-black mb-8">Popüler Sözleşmeler</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
        {contracts.map((contract, idx) => (
          <div key={idx} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <span className="text-4xl text-[#fb7185] mb-2">{contract.icon}</span>
            <span className="text-md font-semibold text-gray-700 text-center">{contract.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
  