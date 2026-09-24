import { motion } from "framer-motion";
import { fadeUp } from "../animations/animations";
import { LuAmpersand } from "react-icons/lu";
import personalInfo from "../data/personalInfo";

const Tools = () => {
  return (
    <section className="mt-10" id="tools">
      <motion.h1
        className="flex items-center text-2xl font-bold md:text-3xl"
        variants={fadeUp()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        Tools <LuAmpersand /> Technology
      </motion.h1>

      <motion.p
        variants={fadeUp({ delay: 0.2 })}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-md mt-2 text-gray-500"
      >
        My Professional Skills
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {personalInfo.skills.map((skill, i) => (
          <motion.div
            key={i}
            variants={fadeUp({ delay: i * 0.1 })}
            className="hover:bg-accent-glow flex items-center gap-4 rounded-2xl border border-gray-200 p-4 shadow-sm transition-colors"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="h-9 w-9 shrink-0 object-contain"
              loading="lazy"
            />
            <div>
              <h3 className="font-semibold">{skill.name}</h3>
              <p className="text-sm text-gray-500">{skill.type}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Tools;
