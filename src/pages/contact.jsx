import { Header } from "../components/header";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

export const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.");
    e.target.reset();
  };

  const contacts = [
    {
      icon: Mail,
      label: "Elektron pochta",
      value: "info@pedagogika.uz",
      href: "mailto:info@pedagogika.uz",
    },
    {
      icon: Phone,
      label: "Telefon",
      value: "+998 71 200 00 00",
      href: "tel:+998712000000",
    },
    {
      icon: MapPin,
      label: "Manzil",
      value: "Termiz sh., Ibn Sino ko‘chasi 15",
      href: "https://maps.google.com/?q=Termiz+Ibn+Sino+ko'chasi+15",
    },
    {
      icon: Clock,
      label: "Ish vaqti",
      value: "Dushanba - Juma: 09:00 - 18:00",
    },
  ];

  const socials = [
    {
      icon: Facebook,
      name: "Facebook",
      href: "https://facebook.com/pedagogika.uz",
      color: "hover:text-blue-600",
    },
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://instagram.com/pedagogika.uz",
      color: "hover:text-pink-600",
    },
    {
      icon: Youtube,
      name: "YouTube",
      href: "https://youtube.com/@pedagogika_uz",
      color: "hover:text-red-600",
    },
  ];

  return (
    <>
      <div className="px-[120px]">
        <Header />
      </div>

      <div className="min-h-screen bg-linear-to-br from-[#F5F5F4] via-white to-[#F5F5F4]">
        {/* HERO SECTION */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-green-700 to-green-900 opacity-95" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-7xl mx-auto px-6 lg:px-[120px] text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">
              Biz bilan bog‘laning
            </h1>
            <p className="text-xl lg:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              Savollaringiz bormi? Takliflaringiz bormi? Yoki shunchaki salom
              aytmoqchimisiz? Biz har doim aloqada bo‘lishga tayyormiz.
            </p>
          </motion.div>
        </section>

        {/* CONTACT INFO + FORM */}
        <section className="py-20 px-6 lg:px-[120px]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {/* Kontakt ma'lumotlari */}
              <div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
                  Bizni topish oson
                </h2>
                <div className="space-y-6">
                  {contacts.map((contact, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-5 p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-linear-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center text-white shrink-0">
                        <contact.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {contact.label}
                        </p>
                        {contact.href ? (
                          <a
                            href={contact.href}
                            target={
                              contact.href.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-gray-900 hover:text-green-700 transition"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-lg font-semibold text-gray-900">
                            {contact.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Ijtimoiy tarmoqlar */}
                <div className="mt-10">
                  <p className="text-xl font-bold text-gray-900 mb-4">
                    Ijtimoiy tarmoqlarda
                  </p>
                  <div className="flex gap-4">
                    {socials.map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className={`w-12 h-12 bg-green-300 rounded-xl flex items-center justify-center text-gray-700 hover:bg-linear-to-r from-green-600 to-green-700 ${social.color} text-white transition-all duration-300 transform hover:scale-110 shadow-lg`}
                      >
                        <social.icon className="w-6 h-6" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kontakt formasi */}
              <div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
                  Xabar yuborish
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="bg-white p-8 rounded-3xl shadow-2xl space-y-6"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ismingiz
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500 focus:border-transparent transition"
                      placeholder="To‘liq ismingiz"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Elektron pochta
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500 focus:border-transparent transition"
                      placeholder="email@misol.uz"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mavzu
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500 focus:border-transparent transition"
                      placeholder="Xabar mavzusi"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Xabar
                    </label>
                    <textarea
                      required
                      rows="6"
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500 focus:border-transparent transition resize-none"
                      placeholder="Xabaringizni bu yerda yozing..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-5 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-all duration-300"
                  >
                    <Send className="w-6 h-6" />
                    Xabar yuborish
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* XARITA */}
        <section className="py-16 px-6 lg:px-[120px]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-4xl font-extrabold text-gray-900">
                Bizni xaritada toping
              </h2>
            </motion.div>

            <div className="bg-gray-200 border-2 border-dashed rounded-3xl w-full h-96 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-green-600" />
                <p className="text-xl font-semibold">
                  Google Maps integratsiyasi
                </p>
                <p className="text-sm mt-2">Keyinchalik qo‘shiladi</p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="py-16 bg-linear-to-r from-green-700 to-green-900">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-6">
              Savolingiz bormi? Bizga yozing!
            </h3>
            <p className="text-xl text-green-100 mb-8">
              Har qanday savol, taklif yoki hamkorlik takliflari uchun ochiqmiz.
            </p>
            <a
              href="mailto:info@pedagogika.uz"
              className="inline-flex items-center gap-3 bg-white text-green-700 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              <Mail className="w-6 h-6" />
              info@pedagogika.uz
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
