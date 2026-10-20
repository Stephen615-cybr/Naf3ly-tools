import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Compass } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { useLanguage } from '../context/LanguageContext';

export const Header = () => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  const navLinkStyle = ({ isActive }) => ({
    padding: '0.5rem 0.85rem',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.9375rem',
    fontWeight: isActive ? 700 : 500,
    color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
    backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
    transition: 'all var(--transition-fast)',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem'
  });

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
      }}
    >
      <div 
        className="container"
        style={{
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        {/* Brand Logo */}
        <Logo size="medium" />

        {/* Desktop Navigation */}
        <nav 
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          className="desktop-nav"
        >
          <NavLink to="/" style={navLinkStyle}>
            {t('navHome')}
          </NavLink>
          <NavLink to="/tools" style={navLinkStyle}>
            <Compass size={16} />
            {t('navTools')}
          </NavLink>
          <NavLink to="/about" style={navLinkStyle}>
            {t('navAbout')}
          </NavLink>
          <NavLink to="/contact" style={navLinkStyle}>
            {t('navContact')}
          </NavLink>
        </nav>

        {/* Action Controls & Mobile Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-btn btn btn-ghost"
            style={{
              padding: '0.5rem',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px'
            }}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          style={{
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-surface)',
            padding: '1rem 1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <NavLink to="/" style={navLinkStyle} onClick={closeMenu}>
            {t('navHome')}
          </NavLink>
          <NavLink to="/tools" style={navLinkStyle} onClick={closeMenu}>
            <Compass size={16} />
            {t('navTools')}
          </NavLink>
          <NavLink to="/about" style={navLinkStyle} onClick={closeMenu}>
            {t('navAbout')}
          </NavLink>
          <NavLink to="/contact" style={navLinkStyle} onClick={closeMenu}>
            {t('navContact')}
          </NavLink>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .mobile-menu-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
};
