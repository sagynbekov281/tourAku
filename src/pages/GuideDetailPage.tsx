import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiArrowLeftLine, RiMapPin2Line, RiTranslate2 } from 'react-icons/ri';
import AnimSection from '../components/AnimSection';
import { useGuides } from '../hooks/useGuides';

export default function GuideDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const guide = useGuides().find((person) => String(person.id) === id);

  if (!guide) {
    return (
      <main className="min-h-screen pt-32 px-5 text-center">
        <h1 className="font-display text-2xl font-bold text-[#0F172A]">{t('guides.notFound')}</h1>
        <Link to="/guides" className="mt-5 inline-flex items-center gap-2 text-sm text-[#16A34A]">
          <RiArrowLeftLine size={16} /> {t('guides.backToTeam')}
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <Link to="/guides" className="mb-7 inline-flex items-center gap-2 text-sm text-[#16A34A] hover:text-[#15803D]">
          <RiArrowLeftLine size={16} /> {t('guides.backToTeam')}
        </Link>
        <AnimSection>
          <article className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="overflow-hidden rounded-3xl bg-green-50 aspect-[4/5]">
              {guide.photo
                ? <img src={guide.photo} alt={guide.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-[#16A34A] font-bold text-7xl">{guide.initials}</div>}
            </div>
            <div className="py-2">
              <p className="text-[#16A34A] text-xs font-semibold uppercase tracking-widest mb-3">{t('guides.tag')}</p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] mb-2">{guide.name}</h1>
              <p className="text-[#16A34A] font-semibold mb-1">{guide.role}</p>
              <p className="text-slate-500 text-sm mb-6">{guide.experience}</p>
              <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line">{guide.about || guide.bio}</p>

              {guide.languages.length > 0 && (
                <section className="mt-7">
                  <h2 className="font-display font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
                    <RiTranslate2 className="text-blue-600" /> {t('guides.languages')}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {guide.languages.map((language) => <span key={language} className="text-sm text-blue-700 bg-blue-50 rounded-full px-3 py-1">{language}</span>)}
                  </div>
                </section>
              )}
              {guide.regions.length > 0 && (
                <section className="mt-6">
                  <h2 className="font-display font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
                    <RiMapPin2Line className="text-[#16A34A]" /> {t('guides.regions')}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {guide.regions.map((region) => <span key={region} className="text-sm text-green-700 bg-green-50 rounded-full px-3 py-1">{region}</span>)}
                  </div>
                </section>
              )}
            </div>
          </article>
        </AnimSection>
      </div>
    </main>
  );
}
