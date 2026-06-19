import { motion } from "framer-motion";
import projects from "../data/projects.json";
import { fadeUp } from "../animations/animations";

const ProjectsGrid = () => {
  return (
    <div className="mt-12">
      <motion.div
        variants={fadeUp({ delay: 0.3 })}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <div
            key={[project.id]}
            className="border-accent bg-surface p-10 shadow-sm"
          >
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="z-0 h-48 w-full rounded-lg object-cover object-top"
              />
              {/* Overlay */}
              <div className="absolute inset-0 z-10 rounded-lg bg-black/40 transition-colors hover:bg-black/10" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectsGrid;
