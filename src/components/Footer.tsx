import { useTranslation } from 'react-i18next';
import { RiMapPin2Line, RiPhoneLine, RiMailLine, RiTimeLine, RiTelegramLine, RiInstagramLine } from 'react-icons/ri';
import { BRAND } from '../brand';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0F3D2E] text-white mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 font-display font-bold mb-3">
            <span className="w-8 h-8 rounded-full border-2 border-[#22C55E] flex items-center justify-center">
              <RiMapPin2Line className="text-[#22C55E]" size={15} />
            </span>
            {BRAND}
          </div>
          <p className="text-emerald-100/60 text-sm leading-relaxed mb-4 max-w-[220px]">
            {t('hero.subtitle')}
          </p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Telegram" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <RiTelegramLine size={14} />
            </a>
            <a href="https://www.instagram.com/khantengri.travel.kg/" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <RiInstagramLine size={14} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-emerald-100/50 text-xs font-semibold uppercase tracking-widest mb-4">{t('contact.infoTitle')}</p>
          <div className="space-y-3 text-sm">
            <a href="tel:+996700469989" className="flex items-center gap-2 hover:text-white">
              <RiPhoneLine className="text-[#22C55E]" size={14} /> +996 700 46 99 89
            </a>
            <a href="mailto:khantengri.travel@gmail.com" className="flex items-center gap-2 hover:text-white">
              <RiMailLine className="text-[#22C55E]" size={14} /> khantengri.travel@gmail.com
            </a>
            <p className="flex items-center gap-2"><RiTimeLine className="text-[#22C55E]" size={14} /> {t('footer.hours')}</p>
          </div>
        </div>

        <div>
          <p className="text-emerald-100/50 text-xs font-semibold uppercase tracking-widest mb-4">{t('contact.address')}</p>
          <p className="text-sm text-emerald-100/80">Бишкек, ул. Чуй 123</p>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-emerald-100/40 text-xs py-5">
        © {new Date().getFullYear()} {BRAND}. {t('footer.rights')}
      </div>
    </footer>
  );
}
