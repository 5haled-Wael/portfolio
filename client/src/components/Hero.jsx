import { motion } from "framer-motion";
import { fadeUp } from "../animations/animations";
import ImageCard from "../components/ImageCard";
import useProfile from "../hooks/useProfile";

const Hero = () => {
  const { profile } = useProfile();

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      id="home"
    >
      <div className="mt-20 flex w-full flex-col gap-12 md:mt-0 md:flex-row md:items-center">
        <motion.div
          variants={fadeUp({ delay: 0.2 })}
          initial="hidden"
          animate="visible"
          className="w-full flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            Hi I'm <span className="text-accent">{profile?.name}</span>
          </h1>
          <h2 className="mt-3 font-mono text-2xl font-bold sm:text-3xl md:text-4xl">
            <span className="text-[#49de80]">&lt;</span>
            <span className="text-secondary mx-2">{profile?.title}</span>
            <span className="text-[#49de80]">/&gt;</span>
          </h2>
          <p className="text-secondary mx-auto mt-5 max-w-md leading-relaxed md:mx-0">
            {profile?.subtitle}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            {profile?.cv?.url && (
              <a
                href={profile?.cv.url.replace(
                  "/upload/",
                  "/upload/fl_attachment:Khaled-Wael-CV/",
                )}
                download
                className="bg-accent text-primary hover:bg-accent-glow flex items-center justify-center rounded-3xl px-4 py-2 text-center font-semibold transition-colors"
              >
                Download my CV
              </a>
            )}
            <a
              href="#projects"
              className="bg-accent-glow hover:bg-accent cursor-pointer rounded-full px-5 py-3 transition-colors hover:text-black"
            >
              Explore my projects
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp({ delay: 0.6 })}
          initial="hidden"
          animate="visible"
          className="mx-auto flex shrink-0 items-center justify-center md:mx-0 md:h-70 md:w-70 lg:h-85 lg:w-85"
        >
          <ImageCard
            name={profile?.name}
            title={profile?.title}
            image={profile?.image?.url}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
