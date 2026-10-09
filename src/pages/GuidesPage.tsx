import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AnimSection from '../components/AnimSection';
import { useGuides } from '../hooks/useGuides';
import { RiTranslate2, RiMapPin2Line, RiArrowRightLine } from 'react-icons/ri';

export default function GuidesPage() {
  const { t } = useTranslation();
  const guides = useGuides();

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        <AnimSection className="mb-10 sm:mb-12">
          <p className="text-[#16A34A] text-xs font-semibold uppercase tracking-widest mb-2">{t('guides.tag')}</p>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-3 text-[#0F172A]">{t('guides.title')}</h1>
          <p className="text-slate-500 max-w-md text-sm">{t('guides.subtitle')}</p>
        </AnimSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {guides.map((g, i) => (
            <AnimSection key={g.id} delay={i * 50}>
              <Link to={`/guides/${g.id}`} aria-label={`${t('guides.details')}: ${g.name}`} className="tour-card block border border-slate-200 rounded-2xl bg-white overflow-hidden h-full flex flex-col">
                <div className="relative h-64 overflow-hidden bg-green-50">
                  {g.photo
                    ? <img src={g.photo} alt={g.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-[#16A34A] font-bold text-5xl">{g.initials}</div>}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-display font-semibold text-[#0F172A] text-lg mb-1">{g.name}</h2>
                  <p className="text-[#16A34A] text-sm font-medium mb-1">{g.role}</p>
                  <p className="text-slate-400 text-xs mb-3">{g.experience}</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">{g.bio}</p>
                  {g.languages.length > 0 && (
                    <div className="flex items-start gap-2 mb-2">
                      <RiTranslate2 size={13} className="text-[#2563EB] mt-0.5 shrink-0" />
                      <div className="flex flex-wrap gap-1.5">
                        {g.languages.map((l) => (
                          <span key={l} className="text-xs text-blue-700 bg-blue-50 rounded-full px-2.5 py-1">{l}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {g.regions.length > 0 && (
                    <div className="flex items-start gap-2 mb-4">
                      <RiMapPin2Line size={13} className="text-[#16A34A] mt-0.5 shrink-0" />
                      <div className="flex flex-wrap gap-1.5">
                        {g.regions.map((r) => (
                          <span key={r} className="text-xs text-green-700 bg-green-50 rounded-full px-2.5 py-1">{r}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#16A34A]">
                    {t('guides.details')} <RiArrowRightLine size={15} />
                  </span>
                </div>
              </Link>
            </AnimSection>
          ))}
        </div>
      </div>
    </main>
  );
}
