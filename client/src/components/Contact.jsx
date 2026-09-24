import { motion } from "motion/react";
import { fadeUp } from "../animations/animations";
import { LuAmpersand } from "react-icons/lu";
import sendEmail from "../utils/emailService";
import { MdOutlineEmail, MdOutlineWhatsapp } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const handleSubmit = (e) => {
  e.preventDefault();

  const form = e.target;

  sendEmail({
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  });

  form.reset();
};

const Contact = () => {
  return (
    <section className="mt-10 text-center" id="contact">
      <h1 className="mb-3 flex justify-center text-3xl font-bold md:text-4xl">
        Contact <LuAmpersand /> Chat
      </h1>
      <motion.p
        className="mx-auto text-sm leading-relaxed text-gray-500 md:text-base"
        variants={fadeUp({ delay: 0.2 })}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        Get in touch with me and let's discuss how I can help you achieve your
        goals.
      </motion.p>

      <motion.div
        className="mt-5 flex flex-col items-stretch gap-6 md:flex-row"
        variants={fadeUp({ delay: 0.3 })}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* CONTACT */}
        <div className="flex-1">
          <div className="bg-surface border-accent flex h-full flex-col items-start justify-center rounded-md border p-6">
            {/* Label */}
            <div className="flex items-center gap-2 rounded-2xl bg-[#49de80]/10 px-4 py-1 text-sm font-medium text-white">
              <span className="relative flex shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#49de80] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#49de80]" />
              </span>

              <h4 className="text-md font-medium text-[#49de80]">
                Available for work
              </h4>
            </div>

            {/* Info */}
            <div className="mt-4 flex w-full flex-col items-start gap-4">
              <p className="text-sm font-medium text-white/50">CONTACT INFO</p>

              <div className="flex w-full flex-col gap-3">
                {/* Email */}
                <div className="flex items-center gap-5">
                  <MdOutlineEmail className="rounded border border-white bg-[#3d3d3d] p-1 text-3xl" />
                  <div className="text-start">
                    <p className="text-xs text-white/50">Email</p>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=waelk8506@gmail.com"
                      target="_blank"
                      className="hover:text-accent text-sm transition-colors"
                    >
                      waelk8506@gmail.com
                    </a>
                  </div>
                </div>

                <hr className="w-full border-white/20" />

                {/* Github */}
                <div className="flex items-center gap-5">
                  <FaGithub className="rounded border border-white bg-[#3d3d3d] p-1 text-3xl" />
                  <div className="text-start">
                    <p className="text-xs text-white/50">Github</p>
                    <a
                      href="https://github.com/5haled-Wael"
                      target="_blank"
                      className="hover:text-accent text-sm transition-colors"
                    >
                      5haled-Wael
                    </a>
                  </div>
                </div>

                <hr className="w-full border-white/20" />

                {/* Linkedin */}
                <div className="flex items-center gap-5">
                  <FaLinkedinIn className="rounded border border-white bg-[#3d3d3d] p-1 text-3xl" />
                  <div className="text-start">
                    <p className="text-xs text-white/50">Linkedin</p>
                    <a
                      href="https://www.linkedin.com/in/khaled-wael-665375320/"
                      target="_blank"
                      className="hover:text-accent text-sm transition-colors"
                    >
                      Khaled Wael
                    </a>
                  </div>
                </div>

                <hr className="w-full border-white/20" />

                {/* Whatsapp */}
                <div className="flex items-center gap-5">
                  <MdOutlineWhatsapp className="rounded border border-white bg-[#3d3d3d] p-1 text-3xl" />
                  <div className="text-start">
                    <p className="text-xs text-white/50">Whatsapp</p>
                    <a
                      href="https://wa.me/201119217866"
                      target="_blank"
                      className="hover:text-accent text-sm transition-colors"
                    >
                      +20 111 921 7866
                    </a>
                  </div>
                </div>

                {/* CV */}
                <a
                  href="/CV.pdf"
                  download
                  className="bg-accent-glow hover:bg-accent cursor-pointer rounded-2xl px-5 py-3 transition-colors hover:text-black"
                >
                  Download my CV
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface border-accent focus:text-primary flex flex-1 flex-col gap-7 rounded-md border p-6 text-start"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              spellCheck={false}
              className="bg-surface text-primary w-full rounded-md border border-gray-200 p-2 text-sm"
              placeholder="Mo Salah"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              spellCheck={false}
              className="bg-surface text-primary w-full rounded-md border border-gray-200 p-2 text-sm"
              placeholder="mo.salah@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              spellCheck={false}
              className="bg-surface text-primary w-full rounded-md border border-gray-200 p-2 text-sm"
              placeholder="Your message here..."
            />
          </div>

          <button
            type="submit"
            className="bg-accent-glow hover:bg-accent flex cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:text-black"
          >
            Send
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
