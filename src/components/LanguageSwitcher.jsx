'use client';

import { useEffect, useRef, useState } from 'react';
import { LANGUAGE_OPTIONS } from '@/lib/i18n';
import { useLanguage } from '@/components/providers/LanguageProvider';
export default function LanguageSwitcher({
  variant = 'light',
  className = '',
  showLabelOnMobile = false
}) {
  const {
    language,
    setLanguage,
    messages
  } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const labelClass = variant === 'dark' ? 'text-white/80' : 'text-jcc-navy';
  const pillClass = variant === 'dark' ? 'bg-white/10 border border-white/30 text-white hover:border-white/60' : 'bg-white border border-jcc-cream text-jcc-navy shadow-sm';
  const optionClass = variant === 'dark' ? 'text-white hover:bg-white/10' : 'text-jcc-navy hover:bg-jcc-cream/60';
  return <div ref={containerRef} className={`relative flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold ${labelClass} ${className}`}>
      <span className={showLabelOnMobile ? 'inline' : 'hidden sm:inline'}>{messages.general.languageLabel}</span>
      <button type="button" aria-label={messages.general.languageLabel} aria-expanded={isOpen} onClick={() => setIsOpen(open => !open)} className={`relative flex items-center gap-2 rounded-full px-4 py-1.5 transition-colors ${pillClass}`}>
        <span className="text-[11px] tracking-[0.2em]">{language.toUpperCase()}</span>
        <span className="h-2 w-2 border-b border-r border-current transition-transform duration-200" style={{
        transform: `rotate(${isOpen ? 225 : 45}deg)`
      }} />
      </button>
      {isOpen && <ul className={`absolute right-0 top-full mt-2 w-40 rounded-2xl border p-2 shadow-xl text-[11px] tracking-[0.2em] ${variant === 'dark' ? 'border-white/20 bg-black/70 backdrop-blur' : 'border-jcc-cream bg-white'}`}>
          {LANGUAGE_OPTIONS.map(option => <li key={option.value}>
              <button type="button" onClick={() => {
          setLanguage(option.value);
          setIsOpen(false);
        }} className={`flex w-full items-center justify-between rounded-xl px-3 py-2 transition-colors ${optionClass} ${option.value === language ? 'font-bold' : 'font-medium'}`}>
                <span>{option.label}</span>
                {option.value === language && <span className="text-[9px]">•</span>}
              </button>
            </li>)}
        </ul>}
    </div>;
}
