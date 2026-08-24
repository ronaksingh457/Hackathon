import { useEffect, useRef, useState } from "react";
import { useBackgroundVideo } from "./BackgroundVideoContext.jsx";
import SearchBar from "./SearchBar.jsx";

export default function HeroSection() {
  const { activeIndex, setActiveIndex, VIDEO_DATA } = useBackgroundVideo();
  const [liveClock, setLiveClock] = useState("");
  const [revealed, setRevealed] = useState(false);

  const heroRef = useRef(null);

  // Live 24-hour clock using Intl.DateTimeFormat()
  useEffect(() => {
    const timeFormatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const updateTime = () => {
      setLiveClock(timeFormatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="travel-hero relative w-full h-[100dvh] min-h-[640px] overflow-hidden bg-transparent select-none flex flex-col justify-between"
      aria-label="Tourism Hero Section"
    >
      {/* Top Header Bar with Live Clock Badge */}
      <header className="absolute top-0 left-0 right-0 z-20 w-full pointer-events-auto">
        <div className="mx-auto max-w-[1340px] flex items-center justify-between py-6 px-[18px] min-[810px]:py-[30px] min-[810px]:px-[18px] min-[1200px]:py-9 min-[1200px]:px-[15px]">
          <div className="flex items-center gap-2 text-white">
            <span className="pulse-dot w-[7px] h-[7px] rounded-full bg-white inline-block" />
            <span className="text-[12px] font-medium uppercase tracking-wider opacity-90">
              TRAVELIQ INTEL
            </span>
          </div>

          <div className="flex items-center gap-3 text-white">
            <span className="hidden sm:inline-block text-[11px] font-medium uppercase tracking-wider opacity-70 font-mono">
              LOCAL TIME
            </span>
            <span
              id="live-local-clock"
              className="tabular-nums font-mono text-[12px] font-medium tracking-wider px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
            >
              {liveClock || "00:00:00"}
            </span>
          </div>
        </div>
      </header>

      {/* Main Hero Centered Content */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-[1340px] mx-auto pointer-events-auto my-auto">
        <div className="flex flex-col items-center justify-center max-w-[90vw] min-[810px]:max-w-[75vw] min-[1200px]:max-w-[70vw] w-full">
          {/* Main Hero Headline */}
          <h1
            id="hero-main-headline"
            className={`reveal text-white font-medium text-center tracking-[-0.04em] ${
              revealed ? "active" : ""
            }`}
            style={{
              fontSize: "clamp(40px, 6.4vw, 100px)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            <span className="block">More Than a Destination.</span>
            <span className="block">Get the Full Picture.</span>
          </h1>

          {/* Supporting Description */}
          <p
            id="hero-supporting-description"
            className={`reveal reveal-d1 text-white/85 text-base sm:text-lg leading-6 font-medium text-center mt-5 max-w-[620px] mx-auto ${
              revealed ? "active" : ""
            }`}
          >
            Discover places, experiences, weather, culture, time, and everything you need before you begin your journey.
          </p>

          {/* Search Option above Explore Destinations */}
          <div
            className={`reveal reveal-d2 mt-7 w-full max-w-[620px] mx-auto z-30 ${
              revealed ? "active" : ""
            }`}
          >
            <SearchBar
              variant="hero"
              showPopularPills={true}
              placeholder="Search any place or destination (e.g. Taj Mahal, Goa, Red Fort...)"
            />
          </div>

          {/* Primary CTA Button */}
          <div
            className={`reveal reveal-d3 mt-6 flex items-center justify-center ${
              revealed ? "active" : ""
            }`}
          >
            <button
              id="hero-primary-cta"
              onClick={() => scrollToSection("featured")}
              className="hero-cta-btn"
              aria-label="Explore Destinations"
            >
              <span>EXPLORE DESTINATIONS</span>
            </button>
          </div>
        </div>
      </main>

      {/* Destination Category Switcher (Bottom-Left) */}
      <div
        className="absolute bottom-9 left-[15px] min-[810px]:left-[18px] min-[1200px]:left-[40px] z-20 flex flex-col gap-2 pointer-events-auto"
        role="tablist"
        aria-label="Destination category background switcher"
      >
        {VIDEO_DATA.map((item, idx) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeIndex === idx}
            aria-label={`Select ${item.category} background video`}
            onClick={() => setActiveIndex(idx)}
            className={`dest-switcher-item ${
              activeIndex === idx
                ? "opacity-100 font-semibold"
                : "opacity-55 hover:opacity-75"
            }`}
          >
            <span className="text-[8px] font-mono opacity-80">{item.index}</span>
            <span className="text-[12px] font-medium tracking-tight">/ {item.category}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
