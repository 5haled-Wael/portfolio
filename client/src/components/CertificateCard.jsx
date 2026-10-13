import "yet-another-react-lightbox/styles.css";
import { Lightbox } from "yet-another-react-lightbox";
import { motion } from "motion/react";
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
      className="bg-surface border-border hover:border-accent mt-5 rounded-xl border p-3 shadow-md transition-colors"
    >
      <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-lg bg-black/5">
        {certificate.images.length > 1 && (
          <div className="absolute inset-0 z-10 flex items-center justify-between px-2">
            <button
              type="button"
              aria-label="Previous image"
              className="rounded-full bg-black/50 p-1 text-white transition hover:bg-black/75"
              onClick={() =>
                setCurrentImage(
                  (currentImage - 1 + certificate.images.length) %
                    certificate.images.length,
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-8 w-8"
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  d="m14 8-4 4 4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Next image"
              className="rounded-full bg-black/50 p-1 text-white transition hover:bg-black/75"
              onClick={() =>
                setCurrentImage((currentImage + 1) % certificate.images.length)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-8 w-8"
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  d="m10 8 4 4-4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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

      <div className="flex flex-col gap-2 px-4 pt-4 pb-5">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase">
          {certificate.issuer}
        </p>

        <h3
          className="line-clamp-2 text-lg leading-snug font-bold"
          title={certificate.title}
        >
          {certificate.title}
        </h3>

        <div className="border-border mt-2 flex items-center justify-between border-t pt-3">
          <time dateTime={certificate.date} className="text-sm text-gray-500">
            {new Date(certificate.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="flex gap-2 text-sm text-gray-500"
          >
            Show full certificate
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
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
