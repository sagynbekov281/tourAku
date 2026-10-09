import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { setLanguage } from '../i18n';
import { BRAND } from '../brand';

const Logo = () => (
  <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none" stroke="#fff" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
    <path d="M6 50 26 18l9 13 6-9 17 28H6Z" />
  </svg>
);

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const LINKS = [
    { to: '/', label: t('nav.home') },
    { to: '/tours', label: t('nav.tours') },
    { to: '/guides', label: t('nav.guides') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-[#4ADE80]' : 'text-white/80 hover:text-white'}`;

  const Lang = () => (
    <div className="inline-flex rounded-full bg-white/10 p-0.5">
      {(['ru', 'en'] as const).map((lng) => (
        <button key={lng} onClick={() => setLanguage(lng)}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase transition-colors ${i18n.language === lng ? 'bg-white text-[#0B2A20]' : 'text-white/70 hover:text-white'}`}>
          {lng}
        </button>
      ))}
    </div>
  );

  return (
    <nav className="fixed top-3 inset-x-3 sm:inset-x-6 z-40">
      <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between rounded-2xl bg-[#0B2A20]/70 backdrop-blur-md border border-white/10">
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2 text-white font-display font-bold text-sm sm:text-lg tracking-wide whitespace-nowrap">
          <Logo /> {BRAND}
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkCls}>{l.label}</NavLink>)}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Lang />
          <Link to="/contact" className="rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-[#052E16] font-semibold text-sm px-5 py-2.5 transition-colors">{t('nav.book')}</Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Lang />
          <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/20 text-white" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <RiCloseLine size={18} /> : <RiMenuLine size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden mt-2 rounded-2xl border border-white/10 bg-[#0B2A20]/95 backdrop-blur-md px-5 py-5 flex flex-col gap-4">
          {LINKS.map((l) => <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkCls} onClick={() => setOpen(false)}>{l.label}</NavLink>)}
          <Link to="/contact" onClick={() => setOpen(false)} className="rounded-full bg-[#22C55E] text-[#052E16] font-semibold text-sm px-5 py-3 text-center">{t('nav.book')}</Link>
        </div>
      )}
    </nav>
  );
}