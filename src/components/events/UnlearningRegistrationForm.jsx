'use client';

import { useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle, Loader2, Lock, MessageCircle } from 'lucide-react';
import { registerEvent } from '@/lib/registerEvent'
const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/F1CAQqPgUKW691ohpL0T6G?s=cl&p=i&mlu=2';
const initialFormState = {
  fullName: '',
  email: '',
  phone: '',
  clan: '',
  pledgeAccepted: false
};
export default function UnlearningRegistrationForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = e => {
    const {
      name,
      value,
      type
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      setStatus('error');
      setErrorMessage('Please complete all required fields.');
      return;
    }
    if (!formData.pledgeAccepted) {
      setStatus('error');
      setErrorMessage('Please accept the pledge to continue.');
      return;
    }
    setStatus('submitting');
    setErrorMessage('');
    try {
      await registerEvent('unlearning-conference', formData);
      setStatus('success');
    } catch (error) {
      console.error('Unlearning Conference registration error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    }
  };

  // Success state: the "next step": the WhatsApp group is now unlocked.
  if (status === 'success') {
    return <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-50/40">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mb-3 text-3xl font-bold text-jcc-navy">You&apos;re in.</h3>
        <p className="mx-auto mb-8 max-w-sm text-slate-600 leading-relaxed">
          Your pledge has been received. The conference community is waiting. Join the
          WhatsApp group below to get every sermon and the 8:30&nbsp;PM review, daily.
        </p>

        <a href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer" className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] py-5 text-lg font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#1faa54] hover:shadow-xl active:scale-[0.98]">
          <MessageCircle className="h-6 w-6" />
          Join the WhatsApp Group
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>

        <p className="mt-5 text-xs leading-relaxed text-slate-400">
          If the button doesn&apos;t open, copy this link:
          <br />
          <span className="break-all font-medium text-slate-500">{WHATSAPP_GROUP_LINK}</span>
        </p>
      </div>;
  }
  const inputClasses = 'w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-jcc-navy placeholder-slate-400 outline-none transition-all focus:border-jcc-orange/30 focus:bg-white focus:ring-4 focus:ring-jcc-orange/5';
  return <div id="register" className="scroll-mt-32">
      <div>
        <h3 className="text-3xl font-bold text-jcc-navy">Take the Pledge</h3>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Register once. Unlearn for <span className="font-bold text-jcc-orange">10 days</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
            Full Name
          </label>
          <input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} required placeholder="Your full name" className={inputClasses} />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
            Email Address
          </label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="email@example.com" className={inputClasses} />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
            Phone (WhatsApp)
          </label>
          <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+234..." className={inputClasses} />
        </div>

        <div>
          <label htmlFor="clan" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
            Clan <span className="font-medium normal-case tracking-normal text-slate-400">(optional)</span>
          </label>
          <input id="clan" name="clan" type="text" value={formData.clan} onChange={handleChange} placeholder="Your clan or group" className={inputClasses} />
        </div>

        {/* The Pledge */}
        <div className="rounded-2xl border border-jcc-gold/30 bg-jcc-gold/[0.06] p-5">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-jcc-gold-dark">
            The Pledge
          </p>
          <p className="text-[15px] italic leading-relaxed text-jcc-navy">
            &ldquo;I,{' '}
            <span className="font-bold not-italic underline decoration-jcc-gold decoration-2 underline-offset-4">
              {formData.fullName.trim() || '_______________'}
            </span>
            , hereby declare that I would follow all the principles taught and will uphold them
            wherever I need to.&rdquo;
          </p>

          <label className="mt-4 flex cursor-pointer items-start gap-3">
            <input type="checkbox" name="pledgeAccepted" checked={formData.pledgeAccepted} onChange={handleChange} className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 text-jcc-orange accent-jcc-orange focus:ring-jcc-orange" />
            <span className="text-sm font-medium text-slate-600">
              I have read and I accept this pledge.
            </span>
          </label>
        </div>

        {status === 'error' && <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-600">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span className="text-sm font-semibold leading-none">{errorMessage}</span>
          </div>}

        <button type="submit" disabled={status === 'submitting'} className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-jcc-navy py-5 text-lg font-bold text-white transition-all hover:bg-jcc-navy/90 hover:shadow-xl active:scale-[0.98] disabled:opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-jcc-orange to-jcc-gold opacity-0 transition-opacity group-hover:opacity-10"></div>
          {status === 'submitting' ? <>
              <Loader2 className="h-6 w-6 animate-spin" />
              Submitting...
            </> : <>
              Register &amp; Unlock the Group
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </>}
        </button>

        {/* Locked group preview, unlocks on success */}
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-3.5 text-slate-400">
          <Lock className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-widest">
            WhatsApp group unlocks after you register
          </span>
        </div>
      </form>
    </div>;
}
