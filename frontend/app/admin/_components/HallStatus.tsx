'use client';

export function HallStatus() {
  const seatRows = [
    [0, 0, 1, 1, 1, 0, 0, 0],
    [1, 1, 0, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Hall 1 Live</h3>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-xs text-red-500 font-bold uppercase">Showing Now</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-white font-medium">Dune: Part Two</p>
        <p className="text-xs text-[#b99d9d]">Ends in 45m</p>
      </div>

      {/* Simplified Seat Grid */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#1a0f0f] rounded-lg p-4 border border-[#392828] relative">
        {/* Screen */}
        <div className="w-2/3 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8 shadow-[0_0_15px_rgba(236,19,19,0.5)]" />
        
        <div className="grid grid-cols-8 gap-1.5 w-full max-w-[240px]">
          {seatRows.map((row, rowIndex) => (
            row.map((seat, seatIndex) => (
              <div
                key={`${rowIndex}-${seatIndex}`}
                className={`aspect-square rounded-sm ${
                  seat === 1 
                    ? 'bg-primary shadow-[0_0_5px_rgba(236,19,19,0.5)]' 
                    : 'bg-[#392828]'
                }`}
              />
            ))
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-sm bg-primary shadow-[0_0_5px_rgba(236,19,19,0.5)]" />
          <span className="text-[#b99d9d]">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-sm bg-[#392828]" />
          <span className="text-[#b99d9d]">Available</span>
        </div>
      </div>

      <button className="mt-6 w-full py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all text-sm font-medium">
        Manage Seat Map
      </button>
    </div>
  );
}