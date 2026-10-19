import { MdOutlineEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import useProfile from "../hooks/useProfile";

const Footer = () => {
  const { profile } = useProfile();

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
          href={profile?.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent text-xl transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href={profile?.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent text-xl transition-colors"
        >
          <FaLinkedinIn />
        </a>
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile?.email}`}
          target="_blank"
          rel="noopener noreferrer"
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
