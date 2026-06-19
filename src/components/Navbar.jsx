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
                className="text-primary hover:text-primary/80 transition-colors"
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
