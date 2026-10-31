'use client';

import { useEffect, useMemo, useState } from 'react';
const calculateTimeLeft = target => {
  const total = target.getTime() - Date.now();
  if (total <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      completed: true
    };
  }
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor(total / (1000 * 60 * 60) % 24);
  const minutes = Math.floor(total / (1000 * 60) % 60);
  const seconds = Math.floor(total / 1000 % 60);
  return {
    days,
    hours,
    minutes,
    seconds,
    completed: false
  };
};
const pad = value => value.toString().padStart(2, '0');
const getVariantClasses = variant => {
  if (variant === 'light') {
    return {
      container: 'bg-white border-tlcc-cream text-tlcc-navy',
      label: 'text-tlcc-navy/60',
      value: 'text-tlcc-navy'
    };
  }
  return {
    container: 'bg-black/60 border-white/25 text-white',
    label: 'text-white/70',
    value: 'text-white'
  };
};
export default function CountdownTimer({
  targetDate,
  className,
  variant = 'dark'
}) {
  const FALLBACK_TARGET = '2026-03-07T10:00:00+01:00';
  const target = useMemo(() => {
    const parsed = new Date(targetDate);
    if (Number.isNaN(parsed.getTime())) return new Date(FALLBACK_TARGET);
    return parsed;
  }, [targetDate]);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(target));
  const styles = getVariantClasses(variant);
  useEffect(() => {
    if (Number.isNaN(target.getTime())) {
      return undefined;
    }
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);
  if (Number.isNaN(target.getTime())) {
    return null;
  }
  if (timeLeft?.completed) {
    return <div className={`inline-flex flex-col gap-2 rounded-3xl px-6 py-4 backdrop-blur border ${styles.container} ${className ?? ''}`}>
        <p className={`text-xs uppercase tracking-wide ${styles.label}`}>Countdown</p>
        <p className="font-semibold">It&apos;s The Manual day — doors are open!</p>
      </div>;
  }
  const segments = timeLeft ? [{
    label: 'D',
    value: pad(timeLeft.days)
  }, {
    label: 'H',
    value: pad(timeLeft.hours)
  }, {
    label: 'M',
    value: pad(timeLeft.minutes)
  }, {
    label: 'S',
    value: pad(timeLeft.seconds)
  }] : [{
    label: 'D',
    value: '--'
  }, {
    label: 'H',
    value: '--'
  }, {
    label: 'M',
    value: '--'
  }, {
    label: 'S',
    value: '--'
  }];
  return <div className={`rounded-3xl px-6 py-4 backdrop-blur flex flex-col gap-3 border ${styles.container} ${className ?? ''}`}>
      <div className={`text-xs uppercase tracking-[0.3em] ${styles.label}`}>Countdown to The Manual</div>
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {segments.map(({
        label,
        value
      }) => <div key={label} className="text-center">
            <div className={`text-3xl md:text-4xl font-bold font-anton ${styles.value}`}>{value}</div>
            <p className={`text-xs uppercase tracking-wide ${styles.label}`}>{label}</p>
          </div>)}
      </div>
    </div>;
}
