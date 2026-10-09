import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiArrowRightLine, RiCheckLine, RiTimeLine, RiCloseLine, RiGroupLine, RiStarFill, RiMapPin2Line, RiListCheck2 } from 'react-icons/ri';
import AnimSection from '../components/AnimSection';
import SeatsBadge from '../components/SeatsBadge';
import { useTours } from '../hooks/useTours';
import type { Tour, DifficultyKey } from '../data';

const DIFFICULTY_ORDER: DifficultyKey[] = ['easy', 'medium', 'hard'];

export default function ToursPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState('all');
  const [selected, setSelected] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const tours = useTours();
  const selectedTourId = (location.state as { selectedTourId?: number } | null)?.selectedTourId;

  useEffect(() => {
    if (selectedTourId !== undefined && tours.some((tour) => tour.id === selectedTourId)) {
      setSelected(selectedTourId);
      navigate(location.pathname + location.search, { replace: true, state: null });
    }
  }, [selectedTourId, tours, navigate, location.pathname, location.search]);

  const filters = [
    { key: 'all', label: t('tours.filterAll') },
    ...DIFFICULTY_ORDER.filter((k) => tours.some((tr) => tr.difficultyKey === k)).map((k) => ({
      key: k,
      label: tours.find((tr) => tr.difficultyKey === k)!.difficulty,
    })),
  ];

  const filtered = active === 'all' ? tours : tours.filter((tr) => tr.difficultyKey === active);
  const selectedTour = tours.find((tr: Tour) => tr.id === selected);

  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.hash]);

  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        <AnimSection className="mb-10 sm:mb-12">
          <p className="text-[#16A34A] text-xs font-semibold uppercase tracking-widest mb-2">{t('tours.tag')}</p>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-3 text-[#0F172A]">{t('tours.title')}</h1>
          <p className="text-slate-500 max-w-md text-sm">{t('tours.subtitle')}</p>
        </AnimSection>

        <AnimSection className="flex gap-2 flex-wrap mb-8 sm:mb-10 -mx-5 sm:mx-0 px-5 sm:px-0 overflow-x-auto sm:overflow-visible pb-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === f.key ? 'bg-[#16A34A] text-white' : 'border border-slate-200 text-slate-500 hover:border-[#16A34A]/40 hover:text-[#0F172A]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </AnimSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tour, i) => {
            const Icon = tour.icon;
            const soldOut = tour.totalSeats ? (tour.seatsLeft ?? 0) <= 0 : false;
            return (
              <AnimSection key={tour.id} delay={i * 40}>
                <div
                  onClick={() => setSelected(tour.id)}
                  className={`tour-card cursor-pointer border rounded-2xl bg-white overflow-hidden h-full flex flex-col ${
                    soldOut ? 'border-slate-200 opacity-70' : 'border-slate-200 hover:border-[#16A34A]/40'
                  }`}
                >
                  <div className="tour-card-photo relative h-44 overflow-hidden">
                    <img src={tour.photo} alt={tour.title} className={`w-full h-full object-cover ${soldOut ? 'grayscale' : ''}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[11px] font-semibold bg-white/90 backdrop-blur text-[#0F172A] rounded-full px-2.5 py-1">
                      {tour.difficulty}
                    </span>
                    <SeatsBadge seatsLeft={tour.seatsLeft} totalSeats={tour.totalSeats} className="absolute top-3 right-3 !bg-white/95 backdrop-blur" />
                    <div className="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center">
                      <Icon size={15} className="text-[#16A34A]" />
                    </div>
                    <span className="absolute bottom-3 right-3 text-[11px] text-white flex items-center gap-1 bg-black/50 backdrop-blur rounded-full px-2.5 py-1">
                      <RiStarFill className="text-amber-400" size={11} /> {tour.rating}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-slate-400 text-[11px] flex items-center gap-1 mb-1"><RiMapPin2Line size={11} /> {tour.destination}</p>
                    <h3 className="font-display font-semibold text-[#0F172A] mb-1">{tour.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">{tour.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tour.highlights.slice(0, 2).map((h) => (
                        <span key={h} className="flex items-center gap-1 text-xs text-slate-600 bg-blue-50 rounded-full px-3 py-1">
                          <RiCheckLine size={10} className="text-[#16A34A]/70" /> {h}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div>
                        {tour.oldPrice && <span className="text-slate-400 text-xs line-through mr-2">{tour.oldPrice}</span>}
                        <span className="text-[#0F172A] font-semibold">{tour.price}</span>
                      </div>
                      <span className="text-slate-400 text-xs flex items-center gap-1"><RiTimeLine size={11} /> {tour.duration}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => { event.stopPropagation(); setSelected(tour.id); }}
                      className="mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-[#16A34A] hover:text-[#15803D]"
                    >
                      {t('tours.details')} <RiArrowRightLine size={15} />
                    </button>
                  </div>
                </div>
              </AnimSection>
            );
          })}
        </div>
      </div>

      {selected !== null && selectedTour && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div
            className="relative w-full sm:max-w-xl bg-white border border-slate-200 rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl z-10"
            style={{ maxHeight: 'calc(100vh - 2rem)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-40 sm:h-48">
              <img src={selectedTour.photo} alt={selectedTour.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
              <button onClick={() => setSelected(null)} className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center text-slate-500 hover:text-[#0F172A]">
                <RiCloseLine size={16} />
              </button>
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
                <div>
                  <h2 className="font-display text-lg font-bold text-[#0F172A]">{selectedTour.title}</h2>
                  <span className="text-xs text-slate-500 flex items-center gap-1"><RiMapPin2Line size={11} /> {selectedTour.destination}</span>
                </div>
                <SeatsBadge seatsLeft={selectedTour.seatsLeft} totalSeats={selectedTour.totalSeats} className="!bg-white shrink-0" />
              </div>
            </div>

            <div className="p-6 sm:p-7 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 14rem)' }}>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{selectedTour.about}</p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-center">
                  <RiGroupLine size={14} className="text-[#16A34A] mx-auto mb-1.5" />
                  <p className="text-[#0F172A] font-semibold text-sm">{selectedTour.groupSize}</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">{t('tours.groupSize')}</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-center">
                  <RiTimeLine size={14} className="text-[#16A34A] mx-auto mb-1.5" />
                  <p className="text-[#0F172A] font-semibold text-sm">{selectedTour.duration}</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">{t('tours.duration')}</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-center">
                  <RiStarFill size={14} className="text-amber-400 mx-auto mb-1.5" />
                  <p className="text-[#0F172A] font-semibold text-sm">{selectedTour.rating} ({selectedTour.reviewsCount})</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">{t('tours.rating')}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <RiListCheck2 size={13} className="text-[#16A34A]" />
                  <p className="text-slate-400 text-xs uppercase tracking-widest">{t('tours.program')}</p>
                </div>
                <ul className="space-y-2">
                  {selectedTour.itinerary.map((step) => (
                    <li key={step} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <RiCheckLine size={13} className="text-[#16A34A]/70 shrink-0 mt-0.5" /> {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-3">{t('tours.included')}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTour.included.map((inc) => (
                    <span key={inc} className="text-xs text-[#15803D] bg-green-50 border border-green-100 rounded-full px-3 py-1">{inc}</span>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[#0F172A] font-bold text-lg">
                    {selectedTour.oldPrice && <span className="text-slate-400 text-sm line-through mr-2">{selectedTour.oldPrice}</span>}
                    {selectedTour.price}
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">{t('tours.perPerson')}</p>
                </div>
                <Link
                  to="/contact"
                  state={{ tour: selectedTour.title }}
                  onClick={(e) => {
                    if (selectedTour.totalSeats && (selectedTour.seatsLeft ?? 0) <= 0) { e.preventDefault(); return; }
                    setSelected(null);
                  }}
                  className={`btn-primary w-full sm:w-auto justify-center ${
                    selectedTour.totalSeats && (selectedTour.seatsLeft ?? 0) <= 0 ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'accent-glow'
                  }`}
                >
                  {selectedTour.totalSeats && (selectedTour.seatsLeft ?? 0) <= 0 ? t('tours.soldOut') : t('tours.book')}
                  {!(selectedTour.totalSeats && (selectedTour.seatsLeft ?? 0) <= 0) && <RiArrowRightLine size={14} />}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
