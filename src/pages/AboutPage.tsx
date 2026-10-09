import { useTranslation } from 'react-i18next';
import { RiHeartLine, RiMapPin2Line, RiShieldCheckLine } from 'react-icons/ri';
import AnimSection from '../components/AnimSection';
import AboutIntroSection from '../components/AboutIntroSection';

export default function AboutPage() {
  const { t } = useTranslation();
  const values = [
    { icon: RiMapPin2Line, title: t('about.localTitle'), text: t('about.localText') },
    { icon: RiShieldCheckLine, title: t('about.careTitle'), text: t('about.careText') },
    { icon: RiHeartLine, title: t('about.impressionsTitle'), text: t('about.impressionsText') },
  ];

  return (
    <main className="min-h-screen pt-24">
      <AboutIntroSection />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <AnimSection className="max-w-3xl mb-10">
          <p className="text-[#16A34A] text-xs font-semibold uppercase tracking-widest mb-2">{t('about.tag')}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">{t('about.title')}</h1>
          <p className="text-slate-600 text-base leading-relaxed">{t('about.intro')}</p>
        </AnimSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {values.map(({ icon: Icon, title, text }, index) => (
            <AnimSection key={title} delay={index * 60}>
              <article className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#16A34A]" />
                </div>
                <h2 className="font-display font-semibold text-[#0F172A] mb-2">{title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
              </article>
            </AnimSection>
          ))}
        </div>
        <AnimSection className="mt-12 rounded-3xl bg-[#0B2A20] p-7 sm:p-10 text-white">
          <h2 className="font-display text-2xl font-bold mb-3">{t('about.teamTitle')}</h2>
          <p className="text-emerald-50/80 leading-relaxed max-w-3xl">{t('about.teamText')}</p>
        </AnimSection>
      </div>
    </main>
  );
}
