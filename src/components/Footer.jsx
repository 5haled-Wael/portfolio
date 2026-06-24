import { MdOutlineEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-10 flex items-center justify-between gap-4 py-5 text-sm">
      {/* Navigation Links */}
      <div className="hidden gap-2 md:flex">
        <a href="#home" className="hover:text-accent text-sm transition-colors">
          Home
        </a>
        <a
          href="#about"
          className="hover:text-accent text-sm transition-colors"
        >
          About
        </a>
        <a
          href="#projects"
          className="hover:text-accent text-sm transition-colors"
        >
          Projects
        </a>
      </div>

      {/* Social Links */}
      <div className="flex gap-2">
        <a
          href="https://github.com/5haled-Wael"
          target="_blank"
          className="hover:text-accent text-xl transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/khaled-wael-665375320/"
          target="_blank"
          className="hover:text-accent text-xl transition-colors"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=waelk8506@gmail.com"
          target="_blank"
          className="hover:text-accent text-xl transition-colors"
        >
          <MdOutlineEmail />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-secondary">
        &copy; {new Date().getFullYear()} Khaled Wael
      </p>
    </footer>
  );
};

export default Footer;
