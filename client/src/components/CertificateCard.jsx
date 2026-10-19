import "yet-another-react-lightbox/styles.css";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Lightbox } from "yet-another-react-lightbox";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/animations";
import { useState } from "react";

const CertificateCard = ({ certificate }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUp({ delay: 0.2 })}
      className="bg-surface border-border hover:border-accent mt-5 flex h-full flex-col rounded-xl border p-3 shadow-md transition-[border-color,box-shadow] duration-300 hover:shadow-lg"
    >
      <div className="border-border relative flex aspect-4/3 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-black/20">
        {certificate.images.length > 1 && (
          <div className="absolute inset-0 z-10 flex items-center justify-between px-2">
            <button
              type="button"
              aria-label="Previous image"
              className="bg-accent/80 hover:bg-accent-glow cursor-pointer rounded-full p-1 text-white backdrop-blur-sm transition"
              onClick={() =>
                setCurrentImage(
                  (currentImage - 1 + certificate.images.length) %
                    certificate.images.length,
                )
              }
            >
              <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>

            <button
              type="button"
              aria-label="Next image"
              className="bg-accent/80 hover:bg-accent-glow cursor-pointer rounded-full p-1 text-white backdrop-blur-sm transition"
              onClick={() =>
                setCurrentImage((currentImage + 1) % certificate.images.length)
              }
            >
              <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>
          </div>
        )}
        <img
          src={certificate.images[currentImage].url}
          alt={certificate.title}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 px-3 pt-4 pb-4 sm:px-4 sm:pb-5">
        <p className="text-accent truncate text-xs font-semibold tracking-widest uppercase">
          {certificate.issuer}
        </p>

        <h3
          className="text-primary line-clamp-2 text-base leading-snug font-bold sm:text-lg"
          title={certificate.title}
        >
          {certificate.title}
        </h3>

        <div className="border-border mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t pt-3">
          <time dateTime={certificate.date} className="text-secondary text-sm">
            {new Date(certificate.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="text-secondary hover:text-accent flex cursor-pointer items-center gap-2 text-sm transition-colors"
          >
            Show full certificate
            <ExternalLink className="h-4 w-4 shrink-0" />
          </button>

          {/* Show Image Lightbox */}
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            index={currentImage}
            slides={certificate.images.map((image) => ({ src: image.url }))}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
