import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/style.css";
import logo from "../assets/logo-removebg-preview.png";
import { AccessibilityContext } from "../contexts/AccessibilityContext";

export default function Header() {
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accessPanelOpen, setAccessPanelOpen] = useState(false);
  const navigate = useNavigate();
  const accessRef = useRef(null);
  const { setTextSize, setHighContrast, setIsMuted, disableAccessibility } = useContext(AccessibilityContext);
  const productBtnRef = useRef(null);
  const submenuRef = useRef(null);

  function submitSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (accessRef.current && !accessRef.current.contains(e.target)) {
        setAccessPanelOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") setAccessPanelOpen(false);
    }

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function toggleProductList(e) {
    e.preventDefault();
    setShopOpen((s) => !s);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (!productBtnRef.current.contains(e.target) && !submenuRef.current.contains(e.target)) {
        setShopOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="main-header">
      <div className="header-inner">
        <div className="logo-left">
          <Link to="/" className="logo" aria-label="HobArt">
            <img src={logo} alt="HobArt logo" />
          </Link>
        </div>

        <div className="right-area">
          <div className="header-controls">
            <div className={`access-header ${accessPanelOpen ? "open" : ""}`} ref={accessRef}>
              <button className="access-toggle small-btn" aria-expanded={accessPanelOpen} aria-controls="access-panel" onClick={() => setAccessPanelOpen((s) => !s)}>
                Accessibility
                <p style={{ transform: accessPanelOpen ? "rotate(180deg)" : "" }}>▾</p>
              </button>
              <div id="access-panel" className="access-panel" role="region" aria-label="Accessibility options" hidden={!accessPanelOpen}>
                <div className="access-controls">
                  <div className="control-row">
                    <button className="small-btn" onClick={() => setTextSize((s) => Math.min(s + 10, 200))}>
                      A+
                    </button>
                    <button className="small-btn" onClick={() => setTextSize((s) => Math.max(s - 10, 60))}>
                      A-
                    </button>
                    <button className="small-btn" onClick={() => setHighContrast((v) => !v)}>
                      🌓
                    </button>
                    <button className="small-btn" onClick={() => setIsMuted((m) => !m)}>
                      🔊
                    </button>
                  </div>
                  <div className="access-actions">
                    <button
                      className="disable-frame"
                      onClick={() => {
                        disableAccessibility();
                        setAccessPanelOpen(false);
                      }}
                    >
                      Disable accessibility
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="utility-icons">
              <button className="icon-btn" aria-label="Profile">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 21v-1c0-2.761-3.582-5-8-5s-8 2.239-8 5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen((s) => !s)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="icon-btn" aria-label="Cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M6 6h15l-1.5 9h-12L6 6z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="10" cy="20" r="1" fill="currentColor" />
                  <circle cx="18" cy="20" r="1" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav className="primary-nav" role="navigation" aria-label="Main navigation">
        <ul className="nav-list">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

          <li className="has-submenu">
            <button className="submenu-toggle" aria-haspopup="true" aria-expanded={shopOpen} onClick={toggleProductList} ref={productBtnRef}>
              New Product ▾
            </button>
            <ul className={`submenu${shopOpen ? " open" : ""}`} ref={submenuRef}>
              <li>
                <Link to="/products/decoration-candle">Decoration Candle</Link>
              </li>
              <li>
                <Link to="/products/epoxy-decor">Epoxy Decor</Link>
              </li>
              <li>
                <Link to="/products/holiday-decor">Holiday Decor</Link>
              </li>
              <li>
                <Link to="/products/accessories">Accessories</Link>
              </li>
              <li>
                <Link to="/products/plaster-decor">Plaster Decor</Link>
              </li>
              <li>
                <Link to="/products/felt-toys">Felt Toys</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
