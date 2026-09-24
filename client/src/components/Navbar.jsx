import { motion } from "motion/react";
import { fadeDown } from "../animations/animations";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll event to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle section change
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  const NavLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Tools", href: "#tools" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full px-6 py-4 transition-colors md:px-8 ${scrolled ? "bg-surface shadow-lg backdrop-blur-md" : ""}`}
    >
      <div className="container mx-auto flex max-w-6xl items-center justify-between">
        <div className="text-primary text-2xl font-bold tracking-wider">
          Portfolio
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden space-x-4 md:flex">
          {NavLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={
                  activeSection === link.href.slice(1)
                    ? "text-accent hover:text-accent/80 transition-colors"
                    : "text-primary hover:text-accent transition-colors"
                }
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="flex cursor-pointer flex-col gap-1.5 p-1 md:hidden"
          onClick={() => setOpen(!open)}
        >
          <motion.span
            className="bg-primary block h-px w-6"
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="bg-primary block h-px w-6"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="bg-primary block h-px w-6"
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>

        {/* Mobile Navigation */}

        {open && (
          <motion.ul
            className="bg-accent-glow/80 absolute top-full left-0 flex w-full flex-col items-center space-y-4 rounded-b-xl py-2 shadow-lg backdrop-blur-md md:hidden"
            variants={fadeDown}
            initial="hidden"
            animate="visible"
          >
            {NavLinks.map((link) => (
              <li
                key={link.name}
                className="border-border w-full border-b py-2 pb-4 text-center last:border-0"
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-primary hover:text-accent transition-colors"
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
