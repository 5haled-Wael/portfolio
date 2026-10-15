import { motion } from "motion/react";
import { fadeUp } from "../animations/animations";
import { LuAmpersand } from "react-icons/lu";
import { MdOutlineEmail, MdOutlineWhatsapp } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import useProfile from "../hooks/useProfile";
import useCreateMessage from "../hooks/useCreateMessage";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const { profile, loading, error } = useProfile();
  const { mutate: createMessage, isPending } = useCreateMessage();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    createMessage(
      {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
      },
      {
        onSuccess: () => {
          toast.success("Message sent successfully!");
          form.reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <section className="mt-10 text-center" id="contact">
      <h1 className="mb-3 flex items-center justify-center gap-2 text-3xl font-bold md:text-4xl">
        Contact <LuAmpersand /> Chat
      </h1>
      <motion.p
        className="text-secondary mx-auto max-w-xl text-sm leading-relaxed md:text-base"
        variants={fadeUp({ delay: 0.2 })}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        Get in touch with me and let's discuss how I can help you achieve your
        goals.
      </motion.p>

      {loading && <div className="h-screen w-screen">Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      <motion.div
        className="mt-5 flex flex-col items-stretch gap-6 md:flex-row"
        variants={fadeUp({ delay: 0.3 })}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* CONTACT */}
        <div className="flex-1">
          <div className="bg-surface border-border flex h-full flex-col items-start justify-center rounded-lg border p-6">
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
              <p className="text-secondary text-sm font-medium">CONTACT INFO</p>

              <div className="flex w-full flex-col gap-4">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <MdOutlineEmail className="border-border bg-surface text-secondary size-10 rounded-lg border p-2" />
                  <div className="text-start">
                    <p className="text-secondary text-xs">Email</p>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile?.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent text-sm transition-colors"
                    >
                      {profile?.email}
                    </a>
                  </div>
                </div>

                <hr className="border-border w-full" />

                {/* Github */}
                <div className="flex items-center gap-4">
                  <FaGithub className="border-border bg-surface text-secondary size-10 rounded-lg border p-2" />
                  <div className="text-start">
                    <p className="text-secondary text-xs">Github</p>
                    <a
                      href={profile?.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent text-sm transition-colors"
                    >
                      5haled-Wael
                    </a>
                  </div>
                </div>

                <hr className="border-border w-full" />

                {/* Linkedin */}
                <div className="flex items-center gap-4">
                  <FaLinkedinIn className="border-border bg-surface text-secondary size-10 rounded-lg border p-2" />
                  <div className="text-start">
                    <p className="text-secondary text-xs">Linkedin</p>
                    <a
                      href={profile?.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent text-sm transition-colors"
                    >
                      Khaled Wael
                    </a>
                  </div>
                </div>

                <hr className="border-border w-full" />

                {/* Whatsapp */}
                <div className="flex items-center gap-4">
                  <MdOutlineWhatsapp className="border-border bg-surface text-secondary size-10 rounded-lg border p-2" />
                  <div className="text-start">
                    <p className="text-secondary text-xs">Whatsapp</p>
                    <a
                      href="https://wa.me/201119217866"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent text-sm transition-colors"
                    >
                      +20 111 921 7866
                    </a>
                  </div>
                </div>

                {/* CV */}
                <a
                  href={profile?.cv.url.replace(
                    "/upload/",
                    "/upload/fl_attachment:Khaled-Wael-CV/",
                  )}
                  download
                  className="bg-accent text-primary hover:bg-accent/80 rounded-lg px-4 py-2 text-center font-semibold transition-colors"
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
          className="bg-surface border-border flex flex-1 flex-col gap-4 rounded-lg border p-6 text-start"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-secondary text-sm font-medium"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              spellCheck={false}
              className="border-border bg-surface text-primary focus:border-accent w-full rounded-lg border px-2 py-1 text-sm outline-none"
              placeholder="Mo Salah"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-secondary text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              spellCheck={false}
              className="border-border bg-surface text-primary focus:border-accent w-full rounded-lg border px-2 py-1 text-sm outline-none"
              placeholder="mo.salah@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="subject"
              className="text-secondary text-sm font-medium"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              required
              spellCheck={false}
              className="border-border bg-surface text-primary focus:border-accent w-full rounded-lg border px-2 py-1 text-sm outline-none"
              placeholder="Subject"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-secondary text-sm font-medium"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              required
              spellCheck={false}
              className="border-border bg-surface text-primary focus:border-accent w-full resize-none rounded-lg border px-2 py-1 text-sm outline-none"
              placeholder="Your message here..."
            />
          </div>

          <button
            type="submit"
            className="bg-accent text-primary hover:bg-accent/80 flex items-center justify-center rounded-lg px-4 py-2 font-semibold transition-colors"
          >
            {isPending ? (
              <LoaderCircle className="animate-spin" size={18} />
            ) : (
              "Send"
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
