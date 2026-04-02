'use client';

export function BookingOccupancy() {
  const occupancyData = [
    { name: 'Morning', value: 45, color: '#10b981' },
    { name: 'Afternoon', value: 68, color: '#3b82f6' },
    { name: 'Evening', value: 92, color: '#ec1313' },
    { name: 'Night', value: 74, color: '#8b5cf6' },
  ];

  return (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Booking Occupancy</h3>
        <p className="text-sm text-slate-500 dark:text-[#b99d9d]">Average seat occupancy per showtime slot</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Radial Progress Visualization */}
        <div className="relative flex items-center justify-center h-48 w-48 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle 
              className="text-slate-100 dark:text-[#1a1111]" 
              strokeWidth="12" 
              stroke="currentColor" 
              fill="transparent" 
              r="70" 
              cx="96" 
              cy="96" 
            />
            <circle 
              className="text-primary transition-all duration-1000 ease-out" 
              strokeWidth="12" 
              strokeDasharray={440} 
              strokeDashoffset={440 - (440 * 78) / 100} 
              strokeLinecap="round" 
              stroke="currentColor" 
              fill="transparent" 
              r="70" 
              cx="96" 
              cy="96" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-slate-900 dark:text-white">78%</span>
            <span className="text-xs uppercase font-bold text-slate-500 dark:text-[#b99d9d]">Weighted Avg.</span>
          </div>
        </div>

        {/* Breakdown List */}
        <div className="space-y-4">
          {occupancyData.map((slot, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="size-3 rounded-full shrink-0" style={{ backgroundColor: slot.color }} />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-700 dark:text-white">{slot.name}</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{slot.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-[#1a1111] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${slot.value}%`,
                      backgroundColor: slot.color,
                      opacity: 0.8
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
        <p className="text-xs text-primary font-medium leading-relaxed italic text-center">
          "Evening shows consistently outperform other slots by an average of 42% revenue."
        </p>
      </div>
    </div>
  );
}
