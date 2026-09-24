import { motion } from "motion/react";
import projects from "../data/projects.json";
import { fadeUp } from "../animations/animations";

const ProjectsGrid = () => {
  return (
    <div className="mt-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={fadeUp({ delay: 0.3 * (index + 1) })}
            className="group border-accent/20 hover:border-accent/60 bg-surface rounded-xl border p-5 shadow-sm transition-colors duration-300"
          >
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="h-48 w-full rounded-lg object-cover object-top"
              />
              <div className="absolute inset-0 rounded-lg bg-black/40 transition-colors duration-300 group-hover:bg-black/10" />
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-accent/10 text-accent rounded-full px-2 py-0.5 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-glow hover:bg-accent rounded-2xl px-4 py-2 text-sm transition-colors hover:text-black"
                >
                  Live
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-glow hover:bg-accent rounded-2xl px-4 py-2 text-sm transition-colors hover:text-black"
                >
                  Code
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectsGrid;
