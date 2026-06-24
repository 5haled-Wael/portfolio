import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import HeroBackground from "./components/HeroBackground";
import { fadeIn } from "./animations/animations";
import About from "./components/About";
import Tools from "./components/Tools";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <HeroBackground />
      <AnimatePresence>
        {loaded && (
          <div>
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

              <Contact />

              <Footer />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
