import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiArrowRightLine, RiMapPin2Line, RiShieldCheckLine, RiUserSmileLine, RiStarFill, RiTimeLine } from 'react-icons/ri';
import AnimSection from '../components/AnimSection';
import MountainScene from '../components/MountainScene';
import { useTours } from '../hooks/useTours';
import { useGuides } from '../hooks/useGuides';

export default function HomePage() {
  const { t } = useTranslation();
  const tours = useTours().slice(0, 3);
  const guides = useGuides().slice(0, 3);

  const STATS = [
    { value: '2 500+', label: t('stats.tourists') },
    { value: '40+', label: t('stats.routes') },
    { value: '4.8', label: t('stats.rating') },
    { value: '8', label: t('stats.years') },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero — остаётся тёмным, с анимацией гор */}
      <section className="relative overflow-hidden min-h-[560px] flex items-center pt-28 pb-20 bg-[#0B1220] text-white">
        <MountainScene />
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 w-full">
          <AnimSection className="max-w-2xl">
            <p className="text-[#4ADE80] text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2">
              <RiMapPin2Line size={14} /> {t('hero.tag')}
            </p>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-5">
              {t('hero.title1')} <span className="text-[#4ADE80]">{t('hero.titleAccent')}</span> {t('hero.title2')}
            </h1>
            <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-lg">{t('hero.subtitle')}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/tours" className="btn-primary accent-glow">
                {t('hero.cta1')} <RiArrowRightLine size={16} />
              </Link>
              <Link to="/contact" className="px-5 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-sm font-medium hover:bg-white/10 transition-colors">
                {t('hero.cta2')}
              </Link>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <AnimSection key={s.label}>
              <p className="text-[#0F172A] font-bold text-2xl sm:text-3xl">{s.value}</p>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">{s.label}</p>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* Popular tours */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <AnimSection className="flex items-end justify-between mb-8 sm:mb-10 flex-wrap gap-4">
          <div>
            <p className="text-[#16A34A] text-xs font-semibold uppercase tracking-widest mb-2">{t('home.popularTag')}</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">{t('home.popularTitle')}</h2>
          </div>
          <Link to="/tours" className="text-sm text-slate-500 hover:text-[#0F172A] flex items-center gap-1">
            {t('home.allTours')} <RiArrowRightLine size={14} />
          </Link>
        </AnimSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tours.map((tour, i) => {
            const Icon = tour.icon;
            return (
              <AnimSection key={tour.id} delay={i * 60}>
                <Link to="/tours" className="tour-card group block border border-slate-200 rounded-2xl bg-white overflow-hidden h-full">
                  <div className="tour-card-photo relative h-44 overflow-hidden">
                    <img src={tour.photo} alt={tour.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[11px] font-semibold bg-white/90 backdrop-blur text-[#0F172A] rounded-full px-2.5 py-1">
                      {tour.difficulty}
                    </span>
                    <span className="absolute top-3 right-3 text-[11px] font-semibold bg-black/55 backdrop-blur text-white rounded-full px-2.5 py-1 flex items-center gap-1">
                      <RiTimeLine size={11} /> {tour.duration}
                    </span>
                    <div className="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center">
                      <Icon size={15} className="text-[#16A34A]" />
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-slate-400 text-[11px] flex items-center gap-1 mb-1"><RiMapPin2Line size={11} /> {tour.destination}</p>
                    <h3 className="font-display font-semibold text-[#0F172A] mb-1">{tour.title}</h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">{tour.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-slate-600"><RiStarFill className="text-amber-400" size={13} /> {tour.rating}</span>
                      <span className="text-[#0F172A] font-semibold">{tour.price}</span>
                    </div>
                  </div>
                </Link>
              </AnimSection>
            );
          })}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { icon: RiShieldCheckLine, title: t('home.why1Title'), text: t('home.why1Text'), color: '#16A34A', bg: 'bg-green-50' },
            { icon: RiUserSmileLine, title: t('home.why2Title'), text: t('home.why2Text'), color: '#2563EB', bg: 'bg-blue-50' },
            { icon: RiMapPin2Line, title: t('home.why3Title'), text: t('home.why3Text'), color: '#16A34A', bg: 'bg-green-50' },
          ].map((f) => (
            <AnimSection key={f.title}>
              <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                <f.icon size={20} style={{ color: f.color }} />
              </div>
              <h3 className="font-display font-semibold text-[#0F172A] mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.text}</p>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* Guides preview */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <AnimSection className="flex items-end justify-between mb-8 sm:mb-10 flex-wrap gap-4">
          <div>
            <p className="text-[#16A34A] text-xs font-semibold uppercase tracking-widest mb-2">{t('home.guidesTag')}</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">{t('home.guidesTitle')}</h2>
          </div>
          <Link to="/guides" className="text-sm text-slate-500 hover:text-[#0F172A] flex items-center gap-1">
            {t('home.allGuides')} <RiArrowRightLine size={14} />
          </Link>
        </AnimSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {guides.map((g, i) => (
            <AnimSection key={g.id} delay={i * 60}>
              <div className="border border-slate-200 rounded-2xl bg-white p-5 h-full">
                <div className="w-11 h-11 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-[#16A34A] font-semibold mb-4">
                  {g.initials}
                </div>
                <h3 className="font-display font-semibold text-[#0F172A] mb-1">{g.name}</h3>
                <p className="text-slate-400 text-xs mb-3">{g.role} · {g.experience}</p>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{g.bio}</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-20">
        <AnimSection className="border border-slate-200 rounded-3xl bg-gradient-to-br from-[#0F3D2E] to-[#16A34A] p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-white">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-2">{t('home.ctaTitle')}</h2>
            <p className="text-emerald-50/90 text-sm max-w-md">{t('home.ctaText')}</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#0F3D2E] font-semibold text-sm px-5 py-3 rounded-xl hover:bg-emerald-50 transition-colors whitespace-nowrap">
            {t('home.ctaBtn')} <RiArrowRightLine size={16} />
          </Link>
        </AnimSection>
      </section>
    </main>
  );
}
