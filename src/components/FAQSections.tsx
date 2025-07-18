"use client"
import { useState } from "react";

const faqData = [
  {
    question: "Sözleşme oluşturma süreci nasıl işliyor?",
    answer: 
      "Sözleşme oluşturmak için öncelikle ihtiyaç duyduğunuz sözleşme türünü seçmelisiniz. Ardından, sistemimiz size dinamik olarak hazırlanan form alanları sunar. Bu alanları eksiksiz ve doğru şekilde doldurmanız gerekmektedir. Tüm bilgiler girildikten sonra, sistem otomatik olarak hukuki kurallara uygun, standartlara uyumlu bir sözleşme metni oluşturur. Oluşturulan sözleşmeyi inceleyip, gerekirse düzenlemeler yapabilir ve son halini PDF formatında indirebilirsiniz. Bu sayede, karmaşık hukuki işlemlerle uğraşmadan profesyonel bir sözleşmeye sahip olabilirsiniz.",
  },
  {
    question: "Hazırlanan sözleşmeler hukuki olarak bağlayıcı mıdır?",
    answer: 
      "Platformumuzda hazırlanan sözleşmeler, Türkiye Cumhuriyeti mevzuatına uygun olarak oluşturulmakta ve genel geçer hukuki standartları içermektedir. Ancak, her sözleşme özel koşullara, tarafların durumuna ve kullanım amacına göre farklılık gösterebilir. Bu nedenle, özellikle kritik ve büyük ölçekli hukuki işlemlerinizde bir hukuk uzmanına danışmanız önemle tavsiye edilir. Platformumuz standart ve genel kullanım amaçlı sözleşmeler sağlamaktadır, kişiye özel hukuki danışmanlık hizmeti sunmamaktadır.",
  },
  {
    question: "Verilerim ve sözleşmelerim nasıl korunuyor?",
    answer: 
      "Kullanıcılarımızın gizliliği ve veri güvenliği bizim için en öncelikli konulardan biridir. Tüm kişisel verileriniz ve oluşturduğunuz sözleşmeler, endüstri standartlarında güvenlik protokolleriyle korunmaktadır. Verileriniz, SSL sertifikalı bağlantılar üzerinden aktarılır ve sunucularımızda şifreli şekilde saklanır. Ayrıca, üçüncü taraflarla veri paylaşımı kesinlikle yapılmamaktadır. Platformumuzda güvenliğiniz için düzenli olarak sistem güncellemeleri ve denetimleri gerçekleştirilmektedir.",
  },
  {
    question: "Sözleşmelerimi dilediğim zaman güncelleyebilir miyim?",
    answer: 
      "Evet, oluşturduğunuz sözleşmeleri platformumuz üzerinden istediğiniz zaman görüntüleyebilir ve güncelleyebilirsiniz. Sözleşme üzerinde değişiklik yapmanız gerektiğinde, ilgili sözleşmeyi açarak form alanlarını düzenleyebilir, ardından güncellenmiş yeni bir sürüm oluşturabilirsiniz. Bu özellik, özellikle sözleşme taraflarında veya koşullarında meydana gelen değişikliklere hızlı ve kolay adapte olmanızı sağlar. Böylece sürekli güncel ve geçerli sözleşmelere sahip olursunuz.",
  },
  {
    question: "Platformu kullanmak için özel bir hukuk bilgisine ihtiyacım var mı?",
    answer: 
      "Hayır, platformumuz kullanıcı dostu arayüzü sayesinde hukuk bilgisi olmayan kişilerin bile kolayca sözleşme hazırlamasına olanak tanır. Hazırlanan sözleşmeler, alanında uzman hukukçular tarafından oluşturulan standart şablonlar baz alınarak hazırlanır. Size düşen tek görev, doğru ve eksiksiz bilgileri girmektir. Eğer hukuki terimler hakkında kafanız karışırsa, platform içerisindeki açıklamalar ve yardım notları size rehberlik eder. Ancak, karmaşık hukuki durumlarda yine de profesyonel destek almanız faydalı olacaktır.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="max-w-5xl mx-auto my-20 px-4">
      <h2 className="text-3xl font-bold text-center text-black mb-8">Sıkça Sorulan Sorular</h2>
      <div className="space-y-6">
        {faqData.map((item, i) => (
          <div
            key={i}
            className="border rounded-lg p-6 cursor-pointer bg-white shadow-lg"
            onClick={() => toggle(i)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{item.question}</h3>
              <span className="text-[#be123c] font-bold text-2xl select-none">{openIndex === i ? "−" : "+"}</span>
            </div>
            {openIndex === i && (
              <p className="mt-4 text-gray-700 leading-relaxed">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
