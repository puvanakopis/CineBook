'use client';

const bookings = [
  {
    id: '#BK-9021',
    movie: 'Dune: Part Two',
    dateTime: 'Oct 24, 18:30',
    seats: 'F12, F13',
    status: 'Confirmed',
    statusColor: 'green',
    poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeW6VfhpatRIJUymWYpduBnZDCI2dUeK_K0TTlDbgoiEdIHJNGYGkod1Zbnko8qWRV-xDJClYfT6WwOhNQd3sOGgyp-g2wrnG8WYIwU862Qt8pcR2fY6nIC8gIYWzl6KU4uB0LH7mj0E3ThKjhIqB9OJjjR-ZfHVD27rc3DpzGytLM5s8LohF8zHelkzxNgK_isfi_1PDugDMJraHxkmN714F4OlAObgjrxprr4RVNHlR1vjtxvr4zN_M0D_wEjUre14z5666FgwnW',
  },
  {
    id: '#BK-9020',
    movie: 'Oppenheimer',
    dateTime: 'Oct 24, 19:00',
    seats: 'H5',
    status: 'Pending',
    statusColor: 'yellow',
    poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg6mTfy3Df2IeDZToEqUEsTy1gXxFRpKtjbvfDrZnqQ3gIa79AqnRvmxKMmSWiHvlDevjOxuG3pSdtPW8HsU-BRaEm_p-FObU2YXZJi28izpCB5xo-vjPHnCOHcq2YdDkRss4W7Q35RcWX_8Zckk1xJr7C9-NgQmLAx_Tb6GBlTWX-gjFtrXm6VYIsKxsVTDB64q0gG94G2-p-EMFJpLuNQ0rmb_1BMnXLFZWKJ5piuDvTKfSJ-Ui-9x2hVOKOReHbT_bTG-0inRAD',
  },
  {
    id: '#BK-9019',
    movie: 'Interstellar',
    dateTime: 'Oct 24, 20:15',
    seats: 'A1, A2, A3',
    status: 'Confirmed',
    statusColor: 'green',
    poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgBrjNXXFlcXvFTv25VNui4C2TskehGOr20VYOEEoOT98oNk_VomHkC7taYwJ1XB7iJdeo5nSAKUsU_Rjdk3sjcrgp7hJeu3caHUHpr0sCPBe8XaoS2BOM3u95Onb-xCKwaZ9dA_hWChQr5qaz1uvDQukXY5rK9H9-FimzWMGTxSpBpLuSZR_Q6yjaXwwS0AJjHfCE6GSM2ESlI-MAxSGfYqfNIk0qyplyooNk4Va_Ht_9zLyQEftz2ulLxx78KQ0eg3ComyZa6lqY',
  },
  {
    id: '#BK-9018',
    movie: 'Transformers 7',
    dateTime: 'Oct 24, 16:00',
    seats: 'C8, C9',
    status: 'Cancelled',
    statusColor: 'red',
    poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkyQXYqF8dB2lI8PxpEvqaZ-hB6oyQu7nc2vTeOlB6TqRE0jEw334mAeoabZJQpAjnJ2F-Vez0HaUs9xLH_T8Yv70l_fUcrIScrYUQL_uhG4WPbXxWDqBOdeeL2Z3MOxT1c3dKvMxIwLrzvhdhC7lU4AS3ebv908RMmW27S37MTvQ7yw_RUMOab4LmovjVvbRICUMmRJi4CdD408tuMz2bTfQO_UvkOwGHjLsM8oirnxI_IGM7UlMfLso_tzaQ8zKeFXeQjwdnmAs6',
  },
];

const statusStyles = {
  green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

export function RecentBookings() {
  return (
    <div className="xl:col-span-2 bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-[#392828] flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Bookings</h3>
        <button className="text-sm text-primary font-medium hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-[#1a0f0f]">
            <tr>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">ID</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Movie</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Date &amp; Time</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Seats</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#392828]">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-[#1f1212] transition-colors">
                <td className="p-4 text-sm text-slate-900 dark:text-white font-mono">{booking.id}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-10 w-7 rounded bg-cover bg-center" 
                      style={{ backgroundImage: `url("${booking.poster}")` }}
                    />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{booking.movie}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-500 dark:text-[#b99d9d]">{booking.dateTime}</td>
                <td className="p-4 text-sm text-slate-500 dark:text-[#b99d9d]">{booking.seats}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[booking.statusColor as keyof typeof statusStyles]}`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}