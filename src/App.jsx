import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import HeroBackground from "./components/HeroBackground";
import { fadeIn } from "./animations/animations";
import About from "./components/About";

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

            <motion.div
              variants={fadeIn({ delay: 0.2 })}
              initial="hidden"
              animate="visible"
            >
              <Hero />
            </motion.div>

            <About />
          </div>
        )}
      </AnimatePresence>

      <div className="h-100"></div>
    </div>
  );
};

export default App;
