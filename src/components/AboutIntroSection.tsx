import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiArrowRightLine, RiCompass3Line, RiHeartLine, RiLandscapeLine, RiTentLine, RiWaterFlashLine } from 'react-icons/ri';
import AnimSection from './AnimSection';

type AboutIntroSectionProps = {
  compact?: boolean;
};

export default function AboutIntroSection({ compact = false }: AboutIntroSectionProps) {
  const { t } = useTranslation();
  const highlights = [
    { icon: RiWaterFlashLine, label: t('about.highlightLake') },
    { icon: RiLandscapeLine, label: t('about.highlightMountains') },
    { icon: RiTentLine, label: t('about.highlightAdventure') },
    { icon: RiCompass3Line, label: t('about.highlightRoutes') },
    { icon: RiHeartLine, label: t('about.highlightMemories') },
  ];
  const stats = [
    { value: t('about.statExperienceValue'), label: t('about.statExperienceLabel') },
    { value: t('about.statRoutesValue'), label: t('about.statRoutesLabel') },
    { value: t('about.statGroupValue'), label: t('about.statGroupLabel') },
  ];

  return (
    <section className="relative overflow-hidden bg-[#174C3B] text-white">
      <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-12 -top-20 h-72 w-72 rounded-full border border-white/10" />
      <div className={`relative mx-auto max-w-6xl px-5 sm:px-8 ${compact ? 'py-10 sm:py-12' : 'py-16 sm:py-20'}`}>
        <AnimSection>
          <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            <span className="h-px w-7 bg-amber-300" />
            {t('about.tag')}
          </div>
          <h2 className={`max-w-5xl font-display font-bold leading-tight ${compact ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-3xl sm:text-4xl lg:text-5xl'}`}>
            {t(compact ? 'about.homeTitle' : 'about.storyTitle')}
          </h2>
          {compact
            ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-emerald-50/85 sm:text-base">{t('about.homeIntro')}</p>
            : (
              <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-emerald-50/85 sm:text-base">
                <p>{t('about.storyFirst')}</p>
                <p>{t('about.storySecond')}</p>
                <p>{t('about.storyThird')}</p>
              </div>
            )}
        </AnimSection>

        {!compact && (
          <div className="mt-8 flex flex-wrap gap-2.5">
            {highlights.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-emerald-50/90">
                <Icon aria-hidden="true" size={16} className="text-amber-300" />
                {label}
              </span>
            ))}
          </div>
        )}

        {!compact && (
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
            {stats.map(({ value, label }) => (
              <AnimSection key={label}>
                <div className="h-full rounded-3xl border border-white/5 bg-white/[0.08] px-6 py-5 sm:px-7 sm:py-6">
                  <p className="font-display text-4xl font-bold leading-none text-amber-300 sm:text-5xl">{value}</p>
                  <p className="mt-3 text-sm leading-relaxed text-emerald-50/85">{label}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        )}

        <div className={`flex flex-col items-start justify-between gap-5 ${compact ? 'mt-6' : 'mt-9 border-t border-white/15 pt-7 sm:flex-row sm:items-center'}`}>
          {!compact && <p className="max-w-2xl font-display text-lg font-semibold text-white sm:text-xl">{t('about.storyClosing')}</p>}
          <div className="flex flex-wrap gap-3">
            <Link to="/tours" className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-[#173F33] transition-colors hover:bg-amber-200">
              {t(compact ? 'about.homeCta' : 'about.exploreCta')} <RiArrowRightLine size={16} />
            </Link>
            {!compact && (
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                {t('about.contactCta')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
