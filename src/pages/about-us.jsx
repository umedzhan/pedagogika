import { Header } from "../components/header";
import { motion } from "framer-motion";
import { Users, BookOpen, Lightbulb, Globe, Heart, Award } from "lucide-react";
import { Link } from "react-router-dom";

export const AboutUs = () => {
  const team = [
    {
      name: "Dr. Oybek To‘ychiyev",
      role: "Ilmiy rahbar",
      desc: "Pedagogika fanlari doktori, 20+ yillik tajriba",
      image: "/team/oybek.jpg",
    },
    {
      name: "Gulnoza Karimova",
      role: "Ilmiy muharrir",
      desc: "Filologiya fanlari nomzodi, 15 yillik tajriba",
      image: "/team/gulnoza.jpg",
    },
    {
      name: "Jamshid Xo‘jayev",
      role: "Texnik rahbar",
      desc: "Full-stack dasturchi, 10 yillik tajriba",
      image: "/team/jamshid.jpg",
    },
    {
      name: "Malika Usmonova",
      role: "Dizayner",
      desc: "UI/UX mutaxassisi, 8 yillik tajriba",
      image: "/team/malika.jpg",
    },
  ];

  const stats = [
    { icon: BookOpen, value: "500+", label: "Maqola" },
    { icon: Users, value: "120+", label: "Muallif" },
    { icon: Globe, value: "45+", label: "Mamlakat" },
    { icon: Heart, value: "10K+", label: "O‘quvchi" },
  ];

  return (
    <>
      <div className="px-[120px]">
        <Header />
      </div>
      <div className="min-h-screen bg-linear-to-br from-[#F5F5F4] via-white to-[#F5F5F4]">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="absolute inset-0 bg-linear-to-r from-green-600 to-green-800 opacity-90" />
          <div className="absolute inset-0 bg-black opacity-20" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">
              Pedagogika Ilmiy Portali
            </h1>
            <p className="text-xl lg:text-2xl text-green-50 mb-8 max-w-4xl mx-auto leading-relaxed">
              Zamonaviy pedagogika fanlari bo‘yicha eng so‘nggi tadqiqotlar,
              maqolalar va ilmiy yutuqlar – barchasi bir joyda.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl text-white">
                <Award className="w-8 h-8 inline-block mr-2" />
                <span className="text-lg font-semibold">
                  Ilmiy sifat kafolati
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl text-white">
                <Lightbulb className="w-8 h-8 inline-block mr-2" />
                <span className="text-lg font-semibold">
                  Innovatsion yondashuv
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* MISSION SECTION */}
        <section className="py-20 px-6 lg:px-[120px]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                  Bizning maqsadimiz
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  <strong>Pedagogika.uz</strong> – O‘zbekiston va jahon
                  pedagogika olimlari o‘rtasida ko‘prik bo‘lib xizmat qiluvchi
                  ilmiy platforma. Bizning maqsadimiz – ta'lim sohasidagi eng
                  so‘nggi tadqiqotlarni ochiq va qulay tarzda taqdim etish.
                </p>
                <ul className="space-y-4 text-gray-700">
                  {[
                    "Ilmiy maqolalarni nashr qilish",
                    "O‘qituvchilar va talabalar uchun bepul resurslar",
                    "Xalqaro ilmiy hamkorlikni rivojlantirish",
                    "Zamonaviy ta'lim texnologiyalarini targ‘ib qilish",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="bg-linear-to-br from-green-50 to-blue-50 p-10 rounded-3xl shadow-xl">
                <div className="text-center">
                  <div className="text-6xl font-extrabold text-green-700 mb-2">
                    2018
                  </div>
                  <p className="text-xl font-semibold text-gray-800">
                    Yildan beri faol
                  </p>
                  <p className="text-gray-600 mt-4">
                    O‘zbekistonning eng katta pedagogika portali
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
          <div className="max-w-7xl mx-auto px-6 lg:px-[120px]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  viewport={{ once: true }}
                  className="text-center text-white"
                >
                  <stat.icon className="w-12 h-12 mx-auto mb-3" />
                  <div className="text-4xl lg:text-5xl font-extrabold">
                    {stat.value}
                  </div>
                  <div className="text-lg font-medium mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="py-20 px-6 lg:px-[120px] bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                Bizning jamoa
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Har bir maqola ortida – tajribali olimlar va mutaxassislar
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden rounded-xl mb-5">
                    <div className="bg-gradient-to-br from-green-400 to-blue-500 w-full h-48 rounded-xl flex items-center justify-center text-white text-6xl font-bold">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        member.name.charAt(0)
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-green-700 font-semibold mb-2">
                    {member.role}
                    {"Ilmiy rahbar"}
                  </p>
                  <p className="text-sm text-gray-600">{member.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 px-6 lg:px-[120px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-green-600 to-green-700 p-12 rounded-3xl shadow-2xl"
          >
            <h2 className="text-4xl font-extrabold text-white mb-6">
              Ilmiy hamjamiyatga qo‘shiling
            </h2>
            <p className="text-xl text-green-50 mb-8">
              O‘z maqolangizni nashr qiling, tajribangizni ulashing va
              pedagogika fanini rivojlantirishga hissa qo‘shing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/articles/create"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Maqola yozish
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg border-2 border-white hover:bg-green-800 transition-all transform hover:scale-105"
              >
                Ro‘yxatdan o‘tish
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
