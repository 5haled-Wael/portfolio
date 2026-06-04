import { motion } from "motion/react";
import { fadeDown } from "../animations/animations";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const NavLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors px-6 md:px-8 py-4 ${scrolled ? "bg-surface backdrop-blur-md shadow-lg" : ""}`}
    >
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-primary text-2xl font-bold tracking-wider">
          Portfolio
        </div>

        {/* Desktop Navigation */}
        <ul className="space-x-4 hidden md:flex">
          {NavLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <motion.span
            className="block h-px w-6 bg-[var(--color-primary)]"
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-px w-6 bg-[var(--color-primary)]"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-px w-6 bg-[var(--color-primary)]"
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>

        {/* Mobile Navigation */}

        {open && (
          <motion.ul
            className="absolute left-0 top-full w-full md:hidden
               flex flex-col items-center space-y-4
               rounded-b-xl
               bg-accent-glow/80 py-2
               backdrop-blur-md shadow-lg"
            variants={fadeDown}
            initial="hidden"
            animate="visible"
          >
            {NavLinks.map((link) => (
              <li
                key={link.name}
                className="border-b last:border-0 border-border w-full text-center py-2 pb-4"
              >
                <a
                  href={link.href}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
