import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, MapPin, AlertCircle } from "lucide-react";
import { supportedCities } from "../data/cities";

export default function SearchBar({ autoFocus = false, compact = false, onNavigate }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [notFound, setNotFound] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return supportedCities.filter(
      (c) =>
        c.name.toLowerCase().startsWith(q) ||
        c.name.toLowerCase().includes(q)
    );
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

  function goToCity(slug) {
    navigate(`/city/${slug}`);
    setQuery("");
    setIsOpen(false);
    setNotFound(false);
    onNavigate?.();
  }

  function handleChange(e) {
    setQuery(e.target.value);
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
      if (target) goToCity(target.slug);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  function clearInput() {
    setQuery("");
    setNotFound(false);
    inputRef.current?.focus();
  }

  return (
    <div className={`search-bar ${compact ? "search-bar-compact" : ""}`} ref={containerRef}>
      <div className="search-input-wrap">
        <Search size={compact ? 17 : 20} className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Where are you going?"
          aria-label="Search for a destination"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          className="search-input"
        />
        {query && (
          <button className="search-clear" onClick={clearInput} aria-label="Clear search">
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && query.trim() && (
        <div className="search-suggestions" role="listbox">
          {suggestions.length > 0 ? (
            suggestions.map((c, idx) => (
              <button
                key={c.slug}
                role="option"
                aria-selected={activeIndex === idx}
                className={`search-suggestion-item ${activeIndex === idx ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => goToCity(c.slug)}
              >
                <MapPin size={15} />
                <span>
                  <strong>{c.name}</strong>, {c.state}, {c.country}
                </span>
              </button>
            ))
          ) : (
            <div className="search-empty">
              <AlertCircle size={16} />
              <div>
                <p className="search-empty-title">City not found</p>
                <p className="search-empty-sub">
                  Try: {supportedCities.slice(0, 5).map((c) => c.name).join(", ")}...
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
