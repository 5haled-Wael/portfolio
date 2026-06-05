import personalInfo from "../data/personalInfo";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/animations";
import ImageCard from "../components/ImageCard";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-20 md:mt-4 md:py-0">
      <div className="container mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center md:px-8">
        <motion.div
          variants={fadeUp({ delay: 0.2 })}
          initial="hidden"
          animate="visible"
          className="w-full flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            Hi I'm <span className="text-accent">{personalInfo.name}</span>
          </h1>
          <h2 className="mt-3 font-mono text-2xl font-bold sm:text-3xl md:text-4xl">
            <span className="text-[#49de80]">&lt;</span>
            <span className="text-secondary mx-2">{personalInfo.title}</span>
            <span className="text-[#49de80]">/&gt;</span>
          </h2>
          <p className="text-secondary mx-auto mt-5 max-w-md leading-relaxed md:mx-0">
            {personalInfo.subtitle}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <button className="bg-accent-glow hover:bg-accent cursor-pointer rounded-full px-5 py-3 transition-colors hover:text-black">
              Download my CV
            </button>
            <button className="bg-accent-glow hover:bg-accent cursor-pointer rounded-full px-5 py-3 transition-colors hover:text-black">
              Explore my projects
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp({ delay: 0.6 })}
          initial="hidden"
          animate="visible"
          className="mx-auto flex shrink-0 items-center justify-center md:mx-0 md:h-70 md:w-70 lg:h-85 lg:w-85"
        >
          <ImageCard
            name={personalInfo.name}
            title={personalInfo.title}
            image={personalInfo.image}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
