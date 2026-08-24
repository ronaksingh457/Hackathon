import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const VIDEO_DATA = [
  {
    id: 0,
    index: "01",
    category: "NATURE",
    label: "01 / NATURE",
    url: "/videos/nature.mp4",
    fallbackUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4",
  },
  {
    id: 1,
    index: "02",
    category: "CITY",
    label: "02 / CITY",
    url: "/videos/city.mp4",
    fallbackUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4",
  },
  {
    id: 2,
    index: "03",
    category: "COAST",
    label: "03 / COAST",
    url: "/videos/coast.mp4",
    fallbackUrl:
      "https://cdn.pixabay.com/video/2024/05/24/213511_large.mp4",
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoSources, setVideoSources] = useState(VIDEO_DATA.map((v) => v.url));
  const [liveClock, setLiveClock] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const heroRef = useRef(null);
  const videoRefs = useRef([]);

  // Preload videos as object URLs for immediate playback with fallback to direct URLs
  useEffect(() => {
    VIDEO_DATA.forEach((item, idx) => {
      fetch(item.url)
        .then((response) => {
          if (!response.ok) throw new Error("Fetch failed with status " + response.status);
          return response.blob();
        })
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          setVideoSources((prev) => {
            const updated = [...prev];
            updated[idx] = blobUrl;
            return updated;
          });
        })
        .catch(() => {
          // Fallback to original URL
          setVideoSources((prev) => {
            const updated = [...prev];
            updated[idx] = item.url || item.fallbackUrl;
            return updated;
          });
        });
    });
  }, []);

  // Robust video playback & mute handler across all browsers
  useEffect(() => {
    videoRefs.current.forEach((videoEl, idx) => {
      if (!videoEl) return;

      // Force HTML5 DOM properties required by browser autoplay policies
      videoEl.muted = true;
      videoEl.defaultMuted = true;
      videoEl.playsInline = true;

      if (idx === activeIndex) {
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.log("Autoplay will trigger on first user interaction:", err);
          });
        }
      } else {
        videoEl.pause();
      }
    });
  }, [activeIndex, videoSources]);

  // Unblock autoplay on any user interaction in case of strict browser policy
  useEffect(() => {
    const handleUserInteraction = () => {
      const currentActive = videoRefs.current[activeIndex];
      if (currentActive && currentActive.paused) {
        currentActive.muted = true;
        currentActive.play?.().catch(() => {});
      }
    };

    window.addEventListener("click", handleUserInteraction, { once: true });
    window.addEventListener("touchstart", handleUserInteraction, { once: true });
    window.addEventListener("keydown", handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [activeIndex]);

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

  // Intersection Observer for reveal animations (threshold: 0.35)
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
    setMenuOpen(false);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="travel-hero relative w-full h-[100dvh] min-h-[640px] overflow-hidden bg-black select-none"
      aria-label="Tourism Hero Section"
    >
      {/* Triple Layer Full-Screen Video Background */}
      {VIDEO_DATA.map((item, idx) => (
        <video
          key={item.id}
          ref={(el) => {
            if (el) {
              videoRefs.current[idx] = el;
              el.muted = true;
              el.defaultMuted = true;
              el.playsInline = true;
            }
          }}
          id={`hero-bg-video-${idx}`}
          src={videoSources[idx]}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          onCanPlay={(e) => {
            e.target.muted = true;
            if (idx === activeIndex) {
              e.target.play()?.catch(() => {});
            }
          }}
          className={`object-cover absolute inset-0 w-full h-full transition-opacity duration-[1200ms] ease-in-out pointer-events-none ${
            activeIndex === idx ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Subtle Video Overlays */}
      <div className="absolute inset-0 bg-black/20 z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[1] pointer-events-none" />

      {/* Top Navbar */}
      <header className="absolute top-0 left-0 right-0 z-20 w-full pointer-events-auto">
        <nav
          className="mx-auto max-w-[1340px] flex items-center justify-between py-6 px-[18px] min-[810px]:py-[30px] min-[810px]:px-[18px] min-[1200px]:py-9 min-[1200px]:px-[15px]"
          aria-label="Main Navigation"
        >
          {/* Desktop & Tablet Left Navigation (≥ 810px) */}
          <div className="hidden min-[810px]:flex items-center gap-6 min-[1200px]:gap-8">
            <button
              onClick={() => scrollToSection("featured")}
              className="hero-nav-link text-white"
            >
              <span className="text-[8px] mr-1.5 opacity-70 font-mono">01</span>
              <span className="text-[12px] font-medium uppercase tracking-tight">DESTINATIONS</span>
            </button>
            <button
              onClick={() => scrollToSection("featured")}
              className="hero-nav-link text-white"
            >
              <span className="text-[8px] mr-1.5 opacity-70 font-mono">02</span>
              <span className="text-[12px] font-medium uppercase tracking-tight">EXPERIENCES</span>
            </button>
            <button
              onClick={() => scrollToSection("featured")}
              className="hero-nav-link text-white"
            >
              <span className="text-[8px] mr-1.5 opacity-70 font-mono">03</span>
              <span className="text-[12px] font-medium uppercase tracking-tight">DISCOVER</span>
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hero-nav-link text-white"
            >
              <span className="text-[8px] mr-1.5 opacity-70 font-mono">04</span>
              <span className="text-[12px] font-medium uppercase tracking-tight">ABOUT</span>
            </button>
          </div>

          {/* Desktop & Tablet Right Travel Info & Live Clock (≥ 810px) */}
          <div className="hidden min-[810px]:flex items-center gap-4 text-white">
            <span className="text-[12px] font-medium uppercase tracking-tight opacity-90">
              EXPLORE THE WORLD
            </span>
            <span
              id="live-local-clock"
              className="tabular-nums font-mono text-[12px] font-medium tracking-wider px-2.5 py-1 rounded bg-white/10 backdrop-blur-sm border border-white/15"
            >
              {liveClock || "00:00:00"}
            </span>
          </div>

          {/* Mobile Brand / Status (< 810px) */}
          <div className="min-[810px]:hidden flex items-center gap-2 text-white">
            <span className="pulse-dot w-[7px] h-[7px] rounded-full bg-white inline-block" />
            <span className="text-[11px] font-medium uppercase tracking-wider">
              EXPLORE THE WORLD
            </span>
          </div>

          {/* Mobile Hamburger Toggle Button (< 810px) */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="min-[810px]:hidden text-white p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-1 focus:ring-white/50"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile Dropdown Navigation Panel with CSS Grid Accordion Transition */}
        <div
          id="mobile-nav-panel"
          className={`mobile-nav-panel min-[810px]:hidden px-[18px] ${menuOpen ? "open" : ""}`}
        >
          <div className="bg-black/90 backdrop-blur-2xl border border-white/15 rounded-2xl px-6 py-6 shadow-2xl flex flex-col gap-5 my-2">
            <button
              onClick={() => scrollToSection("featured")}
              className="text-white font-medium text-[28px] leading-8 text-left hover:text-[#e0c97f] transition-colors"
            >
              01 / DESTINATIONS
            </button>
            <button
              onClick={() => scrollToSection("featured")}
              className="text-white font-medium text-[28px] leading-8 text-left hover:text-[#e0c97f] transition-colors"
            >
              02 / EXPERIENCES
            </button>
            <button
              onClick={() => scrollToSection("featured")}
              className="text-white font-medium text-[28px] leading-8 text-left hover:text-[#e0c97f] transition-colors"
            >
              03 / DISCOVER
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white font-medium text-[28px] leading-8 text-left hover:text-[#e0c97f] transition-colors"
            >
              04 / ABOUT
            </button>
            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-white/80 text-xs font-mono">
              <span className="uppercase tracking-wider">LIVE LOCAL TIME</span>
              <span className="tabular-nums font-semibold text-white">{liveClock}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Hero Centered Content */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-[1340px] mx-auto pointer-events-auto">
        <div className="flex flex-col items-center justify-center max-w-[90vw] min-[810px]:max-w-[75vw] min-[1200px]:max-w-[70vw]">
          {/* Main Hero Headline */}
          <h1
            id="hero-main-headline"
            className={`reveal text-white font-medium text-center tracking-[-0.04em] ${
              revealed ? "active" : ""
            }`}
            style={{
              fontSize: "clamp(44px, 6.8vw, 106px)",
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
            className={`reveal reveal-d1 text-white/85 text-base sm:text-lg leading-6 font-medium text-center mt-6 max-w-[600px] mx-auto ${
              revealed ? "active" : ""
            }`}
          >
            Discover places, experiences, weather, culture, time, and everything you need before you begin your journey.
          </p>

          {/* Primary CTA Button */}
          <div
            className={`reveal reveal-d2 mt-8 flex items-center justify-center ${
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

      {/* Destination Switcher (Bottom-Left) */}
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

      {/* Status Indicator (Bottom-Right) */}
      <div
        className="hidden min-[810px]:flex items-center gap-2.5 absolute bottom-9 right-[15px] min-[810px]:right-[18px] min-[1200px]:right-[40px] z-20 pointer-events-auto select-none"
        aria-label="Status Indicator"
      >
        <span
          className="pulse-dot w-[7px] h-[7px] rounded-full bg-white inline-block"
          aria-hidden="true"
        />
        <span className="text-white text-[12px] font-medium uppercase tracking-wider opacity-90">
          EXPLORE THE WORLD
        </span>
      </div>
    </section>
  );
}
