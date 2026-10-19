import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import HeroBackground from "../components/HeroBackground";
import { fadeIn } from "../animations/animations";
import About from "../components/About";
import Tools from "../components/Tools";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Certificates from "../components/Certificates";
import useTrackVisit from "../hooks/useTrackVisit";
import PageLoader from "../components/states/PageLoader";
import useProfile from "../hooks/useProfile";
import useProjects from "../hooks/useProjects";
import useSkills from "../hooks/useSkills";
import useCertificates from "../hooks/useCertificates";

const Home = () => {
  const {
    loading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useProfile();

  const {
    loading: projectsLoading,
    error: projectsError,
    refetch: refetchProjects,
  } = useProjects();

  const {
    loading: skillsLoading,
    error: skillsError,
    refetch: refetchSkills,
  } = useSkills();

  const {
    loading: certificatesLoading,
    error: certificatesError,
    refetch: refetchCertificates,
  } = useCertificates();

  useTrackVisit();

  const isLoading =
    profileLoading || projectsLoading || skillsLoading || certificatesLoading;

  const hasError =
    profileError || projectsError || skillsError || certificatesError;

  const [loaded, setLoaded] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    if (!isLoading || hasError || hasTimedOut) return;

    const timer = setTimeout(() => {
      setHasTimedOut(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, [isLoading, hasError, hasTimedOut]);

  useEffect(() => {
    if (isLoading || hasError || hasTimedOut) return;

    const timer = setTimeout(() => setLoaded(true), 500);

    return () => clearTimeout(timer);
  }, [isLoading, hasError, hasTimedOut]);

  const handleRetry = async () => {
    setLoaded(false);
    setHasTimedOut(false);

    await Promise.allSettled([
      refetchProfile(),
      refetchProjects(),
      refetchSkills(),
      refetchCertificates(),
    ]);
  };

  const showError = Boolean(hasError || hasTimedOut);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <HeroBackground />

      <AnimatePresence mode="wait">
        {isLoading || showError || !loaded ? (
          <PageLoader key="loader" error={showError} onRetry={handleRetry} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div variants={fadeIn()} initial="hidden" animate="visible">
              <Navbar />
            </motion.div>

            <div className="container mx-auto mt-10 w-full max-w-6xl px-6 md:px-8">
              <motion.div
                variants={fadeIn({ delay: 0.2 })}
                initial="hidden"
                animate="visible"
              >
                <Hero />
              </motion.div>

              <About />
              <Tools />
              <Projects />
              <Certificates />
              <Contact />
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
