'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6 text-center">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">{timeLeft.days}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Days</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6 text-center">
        <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-1">{timeLeft.hours}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Hours</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6 text-center">
        <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">{timeLeft.minutes}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Minutes</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6 text-center">
        <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-1">{timeLeft.seconds}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Seconds</div>
      </div>
    </div>
  );
}
