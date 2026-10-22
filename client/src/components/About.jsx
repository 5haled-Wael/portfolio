import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, CalendarDays } from "lucide-react";
import { fadeUp } from "../animations/animations";
import PendulumCard from "./PendulumCard";
import useProfile from "../hooks/useProfile";
import useProjects from "../hooks/useProjects";
import useSkills from "../hooks/useSkills";
import useCertificates from "../hooks/useCertificates";

const About = () => {
  const { profile } = useProfile();
  const { projects } = useProjects();
  const { skills } = useSkills();
  const { certificates } = useCertificates();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const text = profile?.about ?? "";

  const stats = [
    { label: "Projects", value: projects?.length },
    { label: "Skills", value: skills?.length },
    { label: "Certificates", value: certificates?.length },
  ];

  const education = [
    { icon: GraduationCap, value: profile?.university },
    {
      icon: CalendarDays,
      value: profile?.graduation && `Class of ${profile.graduation}`,
    },
  ].filter((item) => item.value);

  return (
    <section
      className="behavior-smooth mt-5 flex flex-col items-center justify-center"
      id="about"
    >
      <div className="from-background via-surface to-surface border-accent flex min-h-100 w-full rounded-xl border bg-linear-to-br px-6 py-12 shadow-[0_10px_30px_rgba(124,93,249,0.25)] md:px-10 md:py-20">
        <div ref={ref} className="md:flex-1">
          <motion.h1
            className="text-2xl font-bold md:text-3xl"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            About Me
          </motion.h1>

          <p className="text-secondary mx-auto mt-5 text-sm leading-relaxed md:mx-0 md:text-base">
            {isInView &&
              text.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.1,
                    delay: 0.4 + i * 0.03,
                  }}
                  className="mr-1 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </p>

          <div className="mt-4 space-y-2">
            {education.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp({ delay: 0.6 + i * 0.1 })}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-secondary flex items-start gap-2 text-xs md:text-sm"
              >
                <item.icon className="text-accent mt-0.5 h-4 w-4 shrink-0" />
                <span className="leading-relaxed">{item.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex items-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp({ delay: 0.8 + i * 0.2 })}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex-1"
              >
                <span className="text-2xl font-bold md:text-3xl">
                  {stat.value ?? 0}
                  <span className="text-accent text-xl md:text-2xl">+</span>
                </span>

                <span className="text-primary/80 block text-xs md:text-sm">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.span
            className="text-secondary mt-4 block text-xs md:text-sm"
            variants={fadeUp({ delay: 1 })}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Working with heart, creating with mind.
          </motion.span>
        </div>

        <div className="border-border mx-4 h-0 border-l md:h-100" />

        <div className="hidden md:flex md:flex-1">
          <PendulumCard />
        </div>
      </div>
    </section>
  );
};

export default About;
