import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiArrowRightLine, RiMapPin2Line, RiShieldCheckLine, RiUserSmileLine, RiStarFill, RiTimeLine, RiLeafLine, RiTeamLine, RiHeartLine, RiPlayFill } from 'react-icons/ri';
import AnimSection from '../components/AnimSection';
import AboutIntroSection from '../components/AboutIntroSection';
import { useTours } from '../hooks/useTours';
import { useGuides } from '../hooks/useGuides';
import { tourPhoto, HERO_PHOTO } from '../lib/photos';

export default function HomePage() {
  const { t } = useTranslation();
  const tours = useTours().slice(0, 3);
  const guides = useGuides().slice(0, 3);

  const FEATURES = [
    { icon: RiShieldCheckLine, title: t('home.f1Title', 'Проверенные маршруты'), text: t('home.f1Text', 'Только лучшие локации') },
    { icon: RiLeafLine, title: t('home.f2Title', 'Экологичный туризм'), text: t('home.f2Text', 'Заботимся о природе') },
    { icon: RiTeamLine, title: t('home.f3Title', 'Дружелюбная команда'), text: t('home.f3Text', 'Всегда рядом') },
    { icon: RiHeartLine, title: t('home.f4Title', 'Гибкие условия'), text: t('home.f4Text', 'Индивидуальный подход') },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B2A20] text-white">
        <img src={HERO_PHOTO} alt="" onError={(e) => (e.currentTarget.style.display = 'none')} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2A20] via-[#0B2A20]/75 to-[#0B2A20]/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B2A20] to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-36 pb-28 sm:pt-44 sm:pb-36">
          <AnimSection className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#22C55E]/40 bg-[#22C55E]/10 px-3.5 py-1.5 text-xs text-[#86EFAC] mb-6">
              <RiMapPin2Line size={13} /> {t('hero.tag')}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] mb-5">
              {t('hero.title1')} <span className="text-[#4ADE80]">{t('hero.titleAccent')}</span> {t('hero.title2')}
            </h1>
            <p className="text-white/75 text-base leading-relaxed mb-9 max-w-md">{t('hero.subtitle')}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/tours" className="inline-flex items-center gap-2 rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-[#052E16] font-semibold text-sm px-7 py-3.5 transition-colors accent-glow">
                {t('hero.cta1')} <RiArrowRightLine size={16} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-3 text-sm font-medium text-white/90 hover:text-white">
                <span className="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur flex items-center justify-center"><RiPlayFill size={16} /></span>
                {t('hero.cta2')}
              </Link>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* Features strip */}
      <section className="relative z-10 -mt-14 sm:-mt-16 max-w-6xl mx-auto px-5 sm:px-8">
        <div className="rounded-2xl bg-[#0F3D2E]/95 backdrop-blur border border-white/10 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <f.icon size={26} className="text-[#4ADE80] shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm leading-tight">{f.title}</p>
                <p className="text-emerald-100/60 text-xs mt-1">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tours */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-16 sm:pb-20">
        <AnimSection className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-[#16A34A] text-xs font-semibold uppercase tracking-widest mb-2">{t('home.popularTag')}</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">{t('home.popularTitle')}</h2>
          </div>
          <Link to="/tours" className="text-sm text-[#16A34A] font-medium hover:underline flex items-center gap-1">{t('home.allTours')} <RiArrowRightLine size={14} /></Link>
        </AnimSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tours.map((tour, i) => {
            const Icon = tour.icon;
            return (
              <AnimSection key={tour.id} delay={i * 60}>
                <Link to="/tours" state={{ selectedTourId: tour.id }} className="tour-card group block border border-slate-200 rounded-2xl bg-white overflow-hidden h-full">
                  <div className="tour-card-photo relative h-48 overflow-hidden bg-[#0F3D2E]">
                    <img src={tourPhoto(tour)} alt={tour.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[11px] font-semibold bg-white/90 backdrop-blur text-[#0F172A] rounded-full px-2.5 py-1">{tour.difficulty}</span>
                    <span className="absolute top-3 right-3 text-[11px] font-semibold bg-black/55 backdrop-blur text-white rounded-full px-2.5 py-1 flex items-center gap-1"><RiTimeLine size={11} /> {tour.duration}</span>
                    <div className="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center"><Icon size={15} className="text-[#16A34A]" /></div>
                  </div>
                  <div className="p-5">
                    <p className="text-slate-400 text-[11px] flex items-center gap-1 mb-1"><RiMapPin2Line size={11} /> {tour.destination}</p>
                    <h3 className="font-display font-semibold text-[#0F172A] mb-1">{tour.title}</h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">{tour.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-slate-600"><RiStarFill className="text-amber-400" size={13} /> {tour.rating}</span>
                      <span className="text-[#0F172A] font-semibold">{tour.price}</span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#16A34A]">
                      {t('tours.details')} <RiArrowRightLine size={15} />
                    </span>
                  </div>
                </Link>
              </AnimSection>
            );
          })}
        </div>
      </section>

      <AboutIntroSection compact />

      {/* Why us */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { icon: RiShieldCheckLine, title: t('home.why1Title'), text: t('home.why1Text') },
            { icon: RiUserSmileLine, title: t('home.why2Title'), text: t('home.why2Text') },
            { icon: RiMapPin2Line, title: t('home.why3Title'), text: t('home.why3Text') },
          ].map((f) => (
            <AnimSection key={f.title}>
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center mb-4"><f.icon size={20} className="text-[#16A34A]" /></div>
              <h3 className="font-display font-semibold text-[#0F172A] mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.text}</p>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <AnimSection className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-[#16A34A] text-xs font-semibold uppercase tracking-widest mb-2">{t('home.guidesTag')}</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">{t('home.guidesTitle')}</h2>
          </div>
          <Link to="/guides" className="text-sm text-[#16A34A] font-medium hover:underline flex items-center gap-1">{t('home.allGuides')} <RiArrowRightLine size={14} /></Link>
        </AnimSection>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {guides.map((g, i) => (
            <AnimSection key={g.id} delay={i * 60}>
              <Link to={`/guides/${g.id}`} aria-label={`${t('guides.details')}: ${g.name}`} className="tour-card block border border-slate-200 rounded-2xl bg-white overflow-hidden h-full flex flex-col">
                <div className="h-48 overflow-hidden bg-green-50">
                  {g.photo
                    ? <img src={g.photo} alt={g.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-[#16A34A] font-bold text-4xl">{g.initials}</div>}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-semibold text-[#0F172A] mb-1">{g.name}</h3>
                  <p className="text-[#16A34A] text-sm font-medium">{g.role}</p>
                  <p className="text-slate-400 text-xs mt-1 mb-3">{g.experience}</p>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1">{g.bio}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#16A34A]">
                    {t('guides.details')} <RiArrowRightLine size={15} />
                  </span>
                </div>
              </Link>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-20">
        <AnimSection className="rounded-3xl bg-gradient-to-br from-[#0B2A20] to-[#16A34A] p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-white">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-2">{t('home.ctaTitle')}</h2>
            <p className="text-emerald-50/90 text-sm max-w-md">{t('home.ctaText')}</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#0B2A20] font-semibold text-sm px-6 py-3 rounded-full hover:bg-emerald-50 transition-colors whitespace-nowrap">
            {t('home.ctaBtn')} <RiArrowRightLine size={16} />
          </Link>
        </AnimSection>
      </section>
    </main>
  );
}