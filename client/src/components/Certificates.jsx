import { motion } from "framer-motion";
import { fadeUp } from "../animations/animations";
import CertificatesGrid from "./CertificatesGrid";

const Certificates = () => {
  return (
    <section className="mt-10 text-center" id="certificates">
      <h1 className="mb-3 text-3xl font-bold md:text-4xl">Certificates</h1>
      <motion.p
        className="mx-auto text-sm leading-relaxed text-gray-500 md:text-base"
        variants={fadeUp({ delay: 0.2 })}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        A collection of certifications earned through continuous learning,
        hands-on training, and a commitment to growing as a developer.
      </motion.p>

      <CertificatesGrid />
    </section>
  );
};

export default Certificates;
