import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  MapPin,
  AlertCircle,
  Gem,
  UtensilsCrossed,
  Landmark,
  Compass,
  Star,
  Flame,
  ArrowRight,
} from "lucide-react";
import { searchPlacesAndCities, popularSearchPicks } from "../data/cities";

export default function SearchBar({
  autoFocus = false,
  compact = false,
  variant = "default", // "default" | "hero" | "compact"
  placeholder = "Search destinations or places (e.g., Taj Mahal, Goa, Red Fort...)",
  onNavigate,
  showPopularPills = false,
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [notFound, setNotFound] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const isHero = variant === "hero";
  const isCompact = compact || variant === "compact";

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return searchPlacesAndCities(query, 8);
  }, [query]);

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelectItem(item) {
    if (!item) return;
    if (item.type === "city") {
      navigate(`/city/${item.citySlug}`);
    } else {
      const hash = item.targetSection ? `#${item.targetSection}` : "";
      const searchParam = item.targetParam ? `?${item.targetParam}` : "";
      navigate(`/city/${item.citySlug}${searchParam}${hash}`);
    }
    setQuery("");
    setIsOpen(false);
    setNotFound(false);
    onNavigate?.(item);
  }

  function handlePillClick(pill) {
    if (pill.type === "city") {
      navigate(`/city/${pill.citySlug}`);
    } else {
      const matches = searchPlacesAndCities(pill.query, 1);
      if (matches.length > 0) {
        handleSelectItem(matches[0]);
      } else {
        navigate(`/city/${pill.citySlug}`);
      }
    }
    setIsOpen(false);
    onNavigate?.();
  }

  function handleChange(e) {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(true);
    setActiveIndex(-1);
    setNotFound(false);
  }

  function handleKeyDown(e) {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setIsOpen(true);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length === 0) {
        setNotFound(true);
        return;
      }
      const target = activeIndex >= 0 ? suggestions[activeIndex] : suggestions[0];
      if (target) handleSelectItem(target);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  function clearInput() {
    setQuery("");
    setNotFound(false);
    inputRef.current?.focus();
  }

  const getItemIcon = (type) => {
    switch (type) {
      case "city":
        return <Compass size={16} className="text-sky-500" />;
      case "place":
        return <Landmark size={16} className="text-amber-500" />;
      case "hidden_gem":
        return <Gem size={16} className="text-purple-500" />;
      case "food":
        return <UtensilsCrossed size={16} className="text-emerald-500" />;
      default:
        return <MapPin size={16} className="text-blue-500" />;
    }
  };

  const getItemBadgeClass = (type) => {
    switch (type) {
      case "city":
        return "badge-city";
      case "place":
        return "badge-place";
      case "hidden_gem":
        return "badge-gem";
      case "food":
        return "badge-food";
      default:
        return "badge-default";
    }
  };

  return (
    <div
      className={`search-bar ${isCompact ? "search-bar-compact" : ""} ${
        isHero ? "search-bar-hero" : ""
      }`}
      ref={containerRef}
    >
      <div className="search-input-wrap">
        <div className="search-icon-wrapper">
          <Search size={isCompact ? 17 : isHero ? 22 : 20} className="search-icon" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={isHero ? "Search any destination or place (e.g. Taj Mahal, Goa, Red Fort...)" : placeholder}
          aria-label="Search for a destination or place"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          className="search-input"
        />
        {query && (
          <button className="search-clear" onClick={clearInput} aria-label="Clear search">
            <X size={16} />
          </button>
        )}
        {isHero && !query && (
          <div className="search-kbd-hint hidden sm:flex items-center gap-1 text-[11px] font-mono text-white/50 bg-white/10 px-2 py-0.5 rounded border border-white/15">
            <span>PRESS</span>
            <kbd className="font-semibold text-white/80">↵</kbd>
          </div>
        )}
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && (
        <div className="search-suggestions" role="listbox">
          {query.trim() ? (
            suggestions.length > 0 ? (
              <div className="search-suggestions-list">
                <div className="search-suggestions-header">
                  <span>RECOMMENDED PLACES & DESTINATIONS ({suggestions.length})</span>
                </div>
                {suggestions.map((item, idx) => (
                  <button
                    key={`${item.type}-${item.id}`}
                    role="option"
                    aria-selected={activeIndex === idx}
                    className={`search-suggestion-item ${
                      activeIndex === idx ? "active" : ""
                    }`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => handleSelectItem(item)}
                  >
                    {item.image && (
                      <div className="suggestion-thumb">
                        <img src={item.image} alt={item.name} loading="lazy" />
                      </div>
                    )}
                    <div className="suggestion-icon-badge">
                      {getItemIcon(item.type)}
                    </div>
                    <div className="suggestion-content">
                      <div className="suggestion-title-row">
                        <span className="suggestion-name">{item.name}</span>
                        <span className={`suggestion-type-badge ${getItemBadgeClass(item.type)}`}>
                          {item.category || (item.type === "city" ? "City" : "Place")}
                        </span>
                      </div>
                      <div className="suggestion-sub-row">
                        <span className="suggestion-subtitle">{item.subtitle}</span>
                        {item.rating && (
                          <span className="suggestion-rating">
                            <Star size={11} className="fill-amber-400 text-amber-400 inline -mt-0.5 mr-0.5" />
                            {item.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight size={14} className="suggestion-arrow" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="search-empty">
                <AlertCircle size={18} />
                <div>
                  <p className="search-empty-title">No matching places found</p>
                  <p className="search-empty-sub">
                    Try searching for: <strong>Taj Mahal</strong>, <strong>Hawa Mahal</strong>, <strong>Goa</strong>, <strong>Red Fort</strong>, or <strong>Charminar</strong>.
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="search-default-dropdown">
              <div className="search-suggestions-header flex items-center gap-1.5">
                <Flame size={13} className="text-amber-500" />
                <span>POPULAR DESTINATIONS & ICONIC PLACES</span>
              </div>
              <div className="search-quick-grid">
                {popularSearchPicks.map((pick) => (
                  <button
                    key={pick.name}
                    className="search-quick-item"
                    onClick={() => handlePillClick(pick)}
                  >
                    <span className="quick-item-name">{pick.name}</span>
                    <span className="quick-item-category">{pick.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Popular search pills under search bar for hero variant */}
      {showPopularPills && (
        <div className="search-popular-pills">
          <span className="pills-label">
            <Flame size={13} className="text-amber-400 inline mr-1" />
            Trending:
          </span>
          <div className="pills-list">
            {popularSearchPicks.slice(0, 5).map((pick) => (
              <button
                key={pick.name}
                type="button"
                className="pill-chip"
                onClick={() => handlePillClick(pick)}
              >
                {pick.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

