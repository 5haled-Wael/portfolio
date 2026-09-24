import Blob from "./Blob";

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Top-left blob */}
      <Blob
        duration={7}
        xMovement={[0, 80, -50, 30, 0]}
        yMovement={[0, -90, 60, -30, 0]}
        className="absolute -top-16 -left-16 h-56 w-56 sm:h-72 sm:w-72 md:h-96 md:w-96"
        color="#1a0f6e"
      />

      {/* Top-right blob */}
      <Blob
        duration={9}
        xMovement={[0, -70, 90, -40, 0]}
        yMovement={[0, 80, -50, 40, 0]}
        className="absolute -right-16 top-10 h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80"
        color="#1a0f6e"
      />

      {/* Bottom-center blob */}
      <Blob
        duration={11}
        opacity={0.35}
        xMovement={[-40, 60, -50, 30, -20]}
        yMovement={[0, -80, 60, -30, 0]}
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 h-48 w-48 sm:h-60 sm:w-60 md:h-72 md:w-72 hidden sm:block"
        color="#0a0a3a"
      />

      {/* Center blob */}
      <Blob
        duration={8}
        opacity={0.5}
        xMovement={[0, 70, -60, 40, -20, 0]}
        yMovement={[0, -80, 60, -40, 30, 0]}
        className="absolute left-1/2 top-24 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48"
        color="#6b3fa0"
      />

      {/* Bottom-right blob */}
      <Blob
        duration={10}
        opacity={0.6}
        xMovement={[0, 60, -50, 40, -30, 0]}
        yMovement={[0, -70, 50, -30, 20, 0]}
        className="absolute bottom-12 right-12 h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40 hidden sm:block"
        color="#6b3fa0"
      />
    </div>
  );
};

export default HeroBackground;
