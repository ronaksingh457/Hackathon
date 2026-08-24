import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const BackgroundVideoContext = createContext({
  activeIndex: 0,
  setActiveIndex: () => {},
  videoSources: [],
  VIDEO_DATA: [],
});

export const VIDEO_DATA = [
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
    fallbackUrl: "https://cdn.pixabay.com/video/2024/05/24/213511_large.mp4",
  },
];

export function BackgroundVideoProvider({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoSources, setVideoSources] = useState(VIDEO_DATA.map((v) => v.url));
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

      videoEl.muted = true;
      videoEl.defaultMuted = true;
      videoEl.playsInline = true;

      if (idx === activeIndex) {
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.log("Autoplay will trigger on user interaction:", err);
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

  return (
    <BackgroundVideoContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        videoSources,
        VIDEO_DATA,
      }}
    >
      {/* Viewport Fixed Background Layer */}
      <div className="fixed-background-video-root" aria-hidden="true">
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
            id={`bg-video-${idx}`}
            src={videoSources[idx]}
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={(e) => {
              e.target.muted = true;
              if (idx === activeIndex) {
                e.target.play()?.catch(() => {});
              }
            }}
            className={`fixed-bg-video ${activeIndex === idx ? "active" : ""}`}
          />
        ))}
        {/* Dark translucent overlay gradient */}
        <div className="fixed-bg-overlay" />
      </div>

      {/* Main Page Content Wrapper */}
      <main className="page-content">{children}</main>
    </BackgroundVideoContext.Provider>
  );
}

export function useBackgroundVideo() {
  return useContext(BackgroundVideoContext);
}
