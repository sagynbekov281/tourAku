import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiMenuLine, RiCloseLine, RiMapPin2Line } from 'react-icons/ri';
import { setLanguage } from '../i18n';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const LINKS = [
    { to: '/', label: t('nav.home') },
    { to: '/tours', label: t('nav.tours') },
    { to: '/guides', label: t('nav.guides') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-emerald-100/70 hover:text-white'}`;

  const LangSwitch = ({ compact = false }: { compact?: boolean }) => (
    <div className={`inline-flex rounded-full bg-white/10 p-0.5 ${compact ? '' : 'ml-1'}`}>
      {(['ru', 'en'] as const).map((lng) => (
        <button
          key={lng}
          onClick={() => setLanguage(lng)}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase transition-colors ${
            i18n.language === lng ? 'bg-white text-[#0F3D2E]' : 'text-emerald-100/70 hover:text-white'
          }`}
        >
          {lng}
        </button>
      ))}
    </div>
  );

  return (
    <nav className="fixed top-0 inset-x-0 z-40 bg-[#0F3D2E]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-display font-bold text-base sm:text-lg shrink-0">
          <span className="w-8 h-8 rounded-full border-2 border-[#22C55E] flex items-center justify-center">
            <RiMapPin2Line className="text-[#22C55E]" size={15} />
          </span>
          TourCo
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkCls} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
          <LangSwitch />
          <Link to="/contact" className="btn-primary accent-glow !py-2.5 !px-4 !text-xs sm:!text-sm">
            {t('nav.book')}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitch compact />
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/20 text-white shrink-0"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <RiCloseLine size={18} /> : <RiMenuLine size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0F3D2E] px-4 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkCls} end={l.to === '/'} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-primary justify-center" onClick={() => setOpen(false)}>
            {t('nav.book')}
          </Link>
        </div>
      )}
    </nav>
  );
}
