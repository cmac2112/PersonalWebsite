import { useState, useEffect, useRef } from "react";
import HHNebula    from "../../assets/slideshow/hhnebulaj700.jpg";
import SatView     from "../../assets/slideshow/StellarSatView.jpg";
import PfpDesktop  from "../../assets/slideshow/pfpdesktop.jpg";
import MyImage     from "../../assets/slideshow/football.png"
import Blog        from "../../assets/slideshow/code.jpg";
import MaterialIcon from "../MaterialIcon/MaterialIcon";
import Button       from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { DefinedRoutes } from "../../Helpers/RouteConstants";

const SLIDES = [
  {
    image:    MyImage,
    title:    "Hello",
    subtitle: "I'm Caden McArthur",
    cta:      "Who Am I?",
    icon:     "person_celebrate",
    route:    DefinedRoutes.Story,
  },
  {
    image:    SatView,
    title:    "My Projects",
    subtitle: "& Experience",
    cta:      "Explore",
    icon:     "ar_stickers",
    route:    DefinedRoutes.Projects,
  },
  {
    image:    Blog,
    title:    "My Blog",
    subtitle: "What am I working on?",
    cta:      "Blog",
    icon:     "edit",
    route:    DefinedRoutes.Blog,
  },
  {
    image:    HHNebula,
    title:    "My Gallery",
    subtitle: "Explore The Cosmos",
    cta:      "My Astrophotography",
    icon:     "moon_stars",
    route:    DefinedRoutes.Images,
  },
];

const AUTO_MS        = 8_000;
const POST_MANUAL_MS = 20_000;

const Slideshow = () => {
  const navigate  = useNavigate();
  const manualRef = useRef(false);
  const [current, setCurrent] = useState(0);

  const isMobile = () =>
    window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const advance = (dir: 1 | -1) => {
    manualRef.current = true;
    setCurrent(prev => (prev + dir + SLIDES.length) % SLIDES.length);
  };

  const goTo = (i: number) => {
    manualRef.current = true;
    setCurrent(i);
  };

  useEffect(() => {
    const delay = manualRef.current ? POST_MANUAL_MS : AUTO_MS;
    const t = setTimeout(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
      manualRef.current = false;
    }, delay);
    return () => clearTimeout(t);
  }, [current]);

  const handleNav = (route: string) => {
    setTimeout(() => navigate(route), isMobile() ? 350 : 0);
  };

  const slide = SLIDES[current];

  return (
    <div className="relative w-full h-screen min-h-[520px] overflow-hidden bg-gray-950 select-none">

      {/* Background image – remounts on change to trigger cross-fade */}
      <img
        key={`img-${current}`}
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover animate-fade-in"
      />

      {/* Bottom-up dark ramp – keeps text legible regardless of image content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />
      {/* Radial vignette – darkens edges, draws eye to centre */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)] pointer-events-none" />

      {/* Slide content – remounts on change to replay stagger animations */}
      <div
        key={`content-${current}`}
        className="absolute inset-x-0 bottom-0 pb-24 sm:pb-28 flex flex-col items-center text-center px-6 pointer-events-none"
      >
        {/* Gold accent rule */}
        <span className="block w-12 h-[3px] rounded-full bg-[#ffcf0d] mb-5 animate-slide-up" />

        <h1 className="
            text-white font-black leading-none tracking-tight
            drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)]
            text-[clamp(2.75rem,9vw,7rem)]
            animate-slide-up [animation-delay:80ms]">
          {slide.title}
        </h1>

        <p className="
            text-white/75 font-light tracking-widest uppercase
            text-[clamp(0.75rem,1.8vw,1.1rem)]
            mt-3 mb-8
            animate-slide-up [animation-delay:220ms]">
          {slide.subtitle}
        </p>

        <div className="animate-slide-up [animation-delay:380ms] pointer-events-auto">
          <Button
            label={slide.cta}
            OnClickCallback={() => handleNav(slide.route)}
            materialIcon={slide.icon}
            iconPosition="right"
          />
        </div>
      </div>

      {/* Prev arrow */}
      <button
        onClick={() => advance(-1)}
        aria-label="Previous slide"
        className="
          absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10
          w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
          bg-white/10 border border-white/20 text-white backdrop-blur-sm
          hover:bg-[#ffcf0d]/20 hover:border-[#ffcf0d]/50 hover:text-[#ffcf0d] hover:scale-110
          transition-all duration-300 cursor-pointer"
      >
        <MaterialIcon name="navigate_before" />
      </button>

      {/* Next arrow */}
      <button
        onClick={() => advance(1)}
        aria-label="Next slide"
        className="
          absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10
          w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
          bg-white/10 border border-white/20 text-white backdrop-blur-sm
          hover:bg-[#ffcf0d]/20 hover:border-[#ffcf0d]/50 hover:text-[#ffcf0d] hover:scale-110
          transition-all duration-300 cursor-pointer"
      >
        <MaterialIcon name="navigate_next" />
      </button>

      {/* Pill / dot indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-[6px] rounded-full transition-all duration-300 cursor-pointer
              ${i === current
                ? "w-7 bg-[#ffcf0d]"
                : "w-[6px] bg-white/35 hover:bg-white/65"}`}
          />
        ))}
      </div>

      {/* Auto-advance progress bar */}
      <div
        key={`prog-${current}`}
        className="absolute bottom-0 left-0 h-[3px] bg-[#ffcf0d]/70 animate-progress-fill"
      />
    </div>
  );
};

export default Slideshow;
