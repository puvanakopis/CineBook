'use client';

export function RevenueChart() {
  return (
    <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Analytics</h3>
          <p className="text-sm text-slate-500 dark:text-[#b99d9d]">Weekly performance vs last week</p>
        </div>
        <select className="bg-slate-100 dark:bg-[#120a0a] text-slate-900 dark:text-white text-xs rounded-lg px-3 py-2 border-none focus:ring-1 focus:ring-primary">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="relative h-64 w-full">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 478 150">
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ec1313" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ec1313" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line stroke="#392828" strokeWidth="1" x1="0" x2="478" y1="149" y2="149" />
          <line stroke="#392828" strokeDasharray="4" strokeWidth="1" x1="0" x2="478" y1="100" y2="100" />
          <line stroke="#392828" strokeDasharray="4" strokeWidth="1" x1="0" x2="478" y1="50" y2="50" />
          <path 
            d="M0 109 C36 109 54 41 72 41 C90 41 108 93 127 93 C145 93 163 33 181 33 C199 33 217 101 236 101 C254 101 272 61 290 61 C308 61 326 45 344 45 C363 45 381 121 399 121 C417 121 435 81 453 81 C472 81 478 25 478 149 L0 149 Z" 
            fill="url(#chartGradient)" 
          />
          <path 
            d="M0 109 C36 109 54 41 72 41 C90 41 108 93 127 93 C145 93 163 33 181 33 C199 33 217 101 236 101 C254 101 272 61 290 61 C308 61 326 45 344 45 C363 45 381 121 399 121 C417 121 435 81 453 81 C472 81 478 25 478 25" 
            fill="none" 
            stroke="#ec1313" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="3" 
          />
        </svg>
      </div>

      <div className="flex justify-between text-xs text-slate-500 dark:text-[#b99d9d] mt-4 font-medium uppercase tracking-wider">
        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
      </div>
    </div>
  );
}