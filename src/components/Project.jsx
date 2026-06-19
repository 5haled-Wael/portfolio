import { motion } from "motion/react";
import { fadeUp } from "../animations/animations";
import ProjectsGrid from "./ProjectsGrid";

const Project = () => {
  return (
    <div className="mt-10 text-center">
      <h1 className="mb-3 text-3xl font-bold md:text-4xl">Project</h1>
      <motion.p
        className="mx-auto text-sm leading-relaxed text-gray-500 md:text-base"
        variants={fadeUp({ delay: 0.2 })}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        A selection of projects that reflect my skills, creativity, and passion
        for building meaningful digital experiences.
      </motion.p>

      <ProjectsGrid />
    </div>
  );
};

export default Project;
