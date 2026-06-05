import { useRef } from "react";

const colors = [
  ["#7b61ff", "#06b6d4"],
  ["#7b61ff", "#f59e0b"],
  ["#a855f7", "#ec4899"],
  ["#7b61ff", "#10b981"],
];

const ImageCard = ({ name = "", title = "", image = 0 }) => {
  const cardRef = useRef(null);
  const auroraRef = useRef(null);
  const colorIndex = useRef(0);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const aurora = auroraRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rotateX = ((y - cy) / cy) * -12;
    const rotateY = ((x - cx) / cx) * 12;

    card.style.transition =
      "transform 0.05s ease-out, box-shadow 0.05s ease-out";
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.boxShadow = `${-rotateY * 1.5}px ${rotateX * 1.5}px 40px rgba(124,93,249,0.25)`;

    const pct_x = Math.round((x / rect.width) * 100);
    const pct_y = Math.round((y / rect.height) * 100);
    const [c1, c2] = colors[colorIndex.current];
    aurora.style.background = `radial-gradient(circle at ${pct_x}% ${pct_y}%, ${c1}30 0%, ${c2}15 40%, transparent 70%)`;
  };

  const handleMouseEnter = () => {
    colorIndex.current = (colorIndex.current + 1) % colors.length;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const aurora = auroraRef.current;

    card.style.transition =
      "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease-out";
    card.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.boxShadow = "none";

    aurora.style.background = "none";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto aspect-3/4 w-full max-w-70 cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-[#13131f] transition-transform duration-100 sm:max-w-[320px] md:max-w-85"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Aurora overlay */}
      <div
        ref={auroraRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
      />

      {/* Background Image */}
      <img
        src={image}
        alt={name}
        className="h-full w-full translate-y-1/12 object-cover"
      />

      {/* Overlay */}
      <div className="bg-background/30 absolute inset-0 flex flex-col items-center justify-between p-5">
        {/* Top */}
        <div className="text-center">
          <h2 className="bg-linear-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            {name}
          </h2>

          <p className="text-secondary font-mono text-xs font-bold tracking-wider uppercase md:text-sm">
            {title}
          </p>
        </div>

        {/* Bottom Card */}
        <div className="bg-secondary/20 flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 drop-shadow backdrop-blur">
          {/* Left: Avatar + Info */}
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={image}
              alt={name}
              className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white/10"
            />
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-accent truncate font-mono text-xs lowercase">
                @{name.replace(/\s/g, "-")}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#49de80] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#49de80]" />
                </span>
                <span className="text-secondary text-xs">Online</span>
              </div>
            </div>
          </div>

          {/* Right: Button */}
          <button className="bg-accent-glow hover:bg-accent shrink-0 cursor-pointer rounded-lg px-4 py-1.5 text-xs font-medium transition-colors hover:text-black">
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
