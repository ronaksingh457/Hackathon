import DestinationCard from "../components/DestinationCard";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import { cities, featuredCities, cityTaglines } from "../data/cities";

export default function Home() {
  return (
    <div className="page home-page">
      <Navbar overlay />
      <HeroSection />

      <section className="featured" id="featured">
        <div className="section-heading">
          <h2>Featured Destinations</h2>
          <p>Hand-picked destinations with real-time intelligence ready to explore.</p>
        </div>
        <div className="destination-grid">
          {featuredCities.map((slug) => {
            const city = cities[slug];
            return (
              <DestinationCard
                key={slug}
                slug={slug}
                name={city.name}
                state={city.state}
                image={city.image}
                description={cityTaglines[slug]}
              />
            );
          })}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-inner">
          <h2>Not another map. Not another feed.</h2>
          <p>
            SAARTHI combines live weather, local time, structured places and food data, and an
            explainable safety assessment engine into one destination briefing — so you understand a
            place before you arrive, not after something goes wrong.
          </p>
          <div className="about-grid">
            <div className="about-card">
              <h4>Real-Time Data</h4>
              <p>Live weather and local time sourced directly from Open-Meteo for every destination.</p>
            </div>
            <div className="about-card">
              <h4>Explainable Safety</h4>
              <p>Transparent risk factors and weights — never an unexplained black-box score.</p>
            </div>
            <div className="about-card">
              <h4>Structured Intelligence</h4>
              <p>Traffic, crowd and local reports organized clearly — not a social media feed.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>SAARTHI — Local Intelligence · Built for Smart India Hackathon</p>
      </footer>
    </div>
  );
}
