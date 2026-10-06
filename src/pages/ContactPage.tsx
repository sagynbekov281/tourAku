import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiSendPlaneLine, RiTelegramLine, RiWhatsappLine, RiInstagramLine, RiMapPinLine, RiPhoneLine, RiMailLine, RiTimeLine, RiArrowDownSLine } from 'react-icons/ri';
import AnimSection from '../components/AnimSection';
import { useTours } from '../hooks/useTours';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

type Stage = 'form' | 'otp' | 'done';

export default function ContactPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const incomingTour = (location.state as { tour?: string } | null)?.tour || '';

  const tours = useTours();
  const tourNames = tours.map((tr) => tr.title);

  const [form, setForm] = useState({ name: '', phone: '', tour: incomingTour, peopleCount: '2', message: '' });
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [stage, setStage] = useState<Stage>('form');
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [otpValue, setOtpValue] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const FAQS = [
    { q: t('contact.faq1q'), a: t('contact.faq1a') },
    { q: t('contact.faq2q'), a: t('contact.faq2a') },
    { q: t('contact.faq3q'), a: t('contact.faq3a') },
    { q: t('contact.faq4q'), a: t('contact.faq4a') },
  ];

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((c) => {
        if (c <= 1) { clearInterval(interval); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, phone: form.phone, tour: form.tour,
          peopleCount: form.peopleCount, message: form.message,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(Array.isArray(data.errors) ? data.errors.join(', ') : data.error || t('contact.errGeneric'));
        return;
      }

      if (data.needsVerification) {
        setBookingId(data.booking.id);
        setOtpValue('');
        setStage('otp');
        startResendCooldown();
      } else {
        setStage('done');
        setForm({ name: '', phone: '', tour: '', peopleCount: '2', message: '' });
      }
    } catch {
      setError(t('contact.errNetwork'));
    } finally {
      setSubmitting(false);
    }
  };

  const submitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId) return;
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/bookings/${bookingId}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: otpValue }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || t('contact.errOtp'));
        return;
      }
      setStage('done');
      setForm({ name: '', phone: '', tour: '', peopleCount: '2', message: '' });
    } catch {
      setError(t('contact.errNetwork'));
    } finally {
      setSubmitting(false);
    }
  };

  const resendCode = async () => {
    if (!bookingId || resendCooldown > 0) return;
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/bookings/${bookingId}/resend-otp`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || t('contact.errGeneric'));
        return;
      }
      startResendCooldown();
    } catch {
      setError(t('contact.errNetwork'));
    }
  };

  const inputCls = 'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#0F172A] text-sm placeholder-slate-400 focus:outline-none focus:border-[#16A34A] transition-colors';

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        <AnimSection className="max-w-xl mb-10 sm:mb-12">
          <p className="text-[#16A34A] text-xs font-semibold uppercase tracking-widest mb-2">{t('contact.tag')}</p>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#0F172A] mb-3">{t('contact.title')}</h1>
          <p className="text-slate-500 text-sm leading-relaxed">{t('contact.subtitle')}</p>
        </AnimSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16 items-stretch">
          <AnimSection className="lg:col-span-3 flex flex-col">
            <div className="border border-slate-200 rounded-2xl p-5 sm:p-8 bg-white shadow-sm flex flex-col flex-1">

              {stage === 'done' && (
                <div className="flex flex-col items-center justify-center flex-1 text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-4">
                    <RiSendPlaneLine size={22} className="text-[#16A34A]" />
                  </div>
                  <h2 className="font-display text-lg font-semibold text-[#0F172A] mb-2">{t('contact.doneTitle')}</h2>
                  <p className="text-slate-500 text-sm max-w-sm">{t('contact.doneText')}</p>
                  <button onClick={() => setStage('form')} className="mt-6 text-sm text-[#16A34A] hover:text-[#15803D] transition-colors">
                    {t('contact.again')}
                  </button>
                </div>
              )}

              {stage === 'form' && (
                <>
                  <h2 className="font-display text-lg font-semibold text-[#0F172A] mb-6">{t('contact.formTitle')}</h2>
                  {error && <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}
                  <form onSubmit={submit} className="flex flex-col flex-1 gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 mb-1.5 block">{t('contact.labelName')} *</label>
                        <input name="name" value={form.name} onChange={handle} required placeholder={t('contact.placeholderName')} className={inputCls} />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1.5 block">{t('contact.labelPhone')} *</label>
                        <input name="phone" value={form.phone} onChange={handle} required placeholder="+996 700 123 456" className={inputCls} />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-xs text-slate-500 mb-1.5 block">{t('contact.labelTour')}</label>
                      <button
                        type="button"
                        onClick={() => setOpen((p) => !p)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#16A34A] transition-colors flex items-center justify-between"
                      >
                        <span className={form.tour ? 'text-[#0F172A]' : 'text-slate-400'}>{form.tour || t('contact.placeholderTour')}</span>
                        <RiArrowDownSLine className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} size={18} />
                      </button>
                      {open && (
                        <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl max-h-64 overflow-y-auto">
                          {tourNames.map((name) => (
                            <div
                              key={name}
                              onClick={() => { setForm((p) => ({ ...p, tour: name })); setOpen(false); }}
                              className={`px-5 py-3 text-sm cursor-pointer transition-colors hover:bg-green-50 ${form.tour === name ? 'text-[#16A34A] bg-green-50' : 'text-slate-600'}`}
                            >
                              {name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-xs text-slate-500 mb-1.5 block">{t('contact.labelPeople')}</label>
                      <input type="number" min={1} name="peopleCount" value={form.peopleCount} onChange={handle} className={inputCls} />
                    </div>

                    <div className="flex flex-col flex-1">
                      <label className="text-xs text-slate-500 mb-1.5 block">{t('contact.labelMessage')}</label>
                      <textarea
                        name="message" value={form.message} onChange={handle}
                        rows={4} placeholder={t('contact.placeholderMessage')}
                        className={`${inputCls} resize-none flex-1`}
                        style={{ minHeight: '100px' }}
                      />
                    </div>

                    <button type="submit" disabled={submitting} className="btn-primary accent-glow w-full justify-center mt-auto disabled:opacity-60 disabled:cursor-not-allowed">
                      <RiSendPlaneLine size={16} />
                      {submitting ? t('contact.submitting') : t('contact.submit')}
                    </button>
                  </form>
                </>
              )}

              {stage === 'otp' && (
                <div className="flex flex-col flex-1">
                  <h2 className="font-display text-lg font-semibold text-[#0F172A] mb-2">{t('contact.otpTitle')}</h2>
                  <p className="text-slate-500 text-sm mb-6">{t('contact.otpText')} <span className="text-[#0F172A]">{form.phone}</span></p>
                  {error && <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}
                  <form onSubmit={submitOtp} className="flex flex-col gap-5">
                    <input
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      inputMode="numeric" placeholder="000000" maxLength={6} required
                      className={`${inputCls} text-center text-2xl tracking-[0.5em] font-semibold`}
                    />
                    <button type="submit" disabled={submitting || otpValue.length < 4} className="btn-primary accent-glow w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                      {submitting ? t('contact.otpChecking') : t('contact.otpSubmit')}
                    </button>
                    <button type="button" onClick={resendCode} disabled={resendCooldown > 0} className="text-sm text-[#16A34A] hover:text-[#15803D] transition-colors disabled:text-slate-400 disabled:cursor-not-allowed">
                      {resendCooldown > 0 ? t('contact.resendIn', { s: resendCooldown }) : t('contact.resend')}
                    </button>
                    <button type="button" onClick={() => { setStage('form'); setError(''); setOtpValue(''); }} className="text-xs text-slate-400 hover:text-[#0F172A] transition-colors">
                      ← {t('contact.back')}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </AnimSection>

          <AnimSection className="lg:col-span-2 flex flex-col gap-4">
            <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm">
              <h3 className="text-[#0F172A] font-semibold text-sm mb-4">{t('contact.infoTitle')}</h3>
              <div className="space-y-3.5">
                {[
                  { icon: RiMapPinLine, label: t('contact.address'), value: 'Бишкек, ул. Чуй 123' },
                  { icon: RiPhoneLine, label: t('contact.phone'), value: '+996 700 123 456' },
                  { icon: RiMailLine, label: t('contact.email'), value: 'info@tourco.kg' },
                  { icon: RiTimeLine, label: t('contact.hours'), value: t('contact.hoursValue') },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="text-[#16A34A]" size={14} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs mb-0.5">{label}</p>
                      <p className="text-[#0F172A] text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm">
              <h3 className="text-[#0F172A] font-semibold text-sm mb-4">{t('contact.socialTitle')}</h3>
              <div className="space-y-2.5">
                {[
                  { icon: RiTelegramLine, label: 'Telegram', val: '@tourco_kg' },
                  { icon: RiInstagramLine, label: 'Instagram', val: '@tourco.kg' },
                  { icon: RiWhatsappLine, label: 'WhatsApp', val: '+996 700 123 456' },
                ].map(({ icon: Icon, label, val }) => (
                  <a key={label} href="#" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all group">
                    <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                      <Icon className="text-[#16A34A]" size={14} />
                    </div>
                    <div>
                      <p className="text-[#0F172A] text-xs font-medium">{label}</p>
                      <p className="text-slate-400 text-xs">{val}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimSection>
        </div>

        <AnimSection className="mb-2">
          <p className="text-[#16A34A] text-xs font-semibold uppercase tracking-widest mb-2">{t('contact.faqTag')}</p>
          <h2 className="font-display text-2xl font-bold text-[#0F172A] mb-8">{t('contact.faqTitle')}</h2>
        </AnimSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map(({ q, a }, i) => (
            <AnimSection key={q} delay={i * 60}>
              <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm">
                <p className="text-[#0F172A] text-sm font-semibold mb-2">{q}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </main>
  );
}
