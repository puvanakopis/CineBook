'use client';

import Image from 'next/image';
import { MdEdit, MdDelete, MdMovie } from 'react-icons/md';
import { Theater } from '@/interfaces/theaterInterface';
import getImage from '@/utils/imageUrl';

interface TheaterTableProps {
  theaters: Theater[];
  onEdit: (theater: Theater) => void;
  onDelete: (theater: Theater) => void;
}

export function TheaterTable({ theaters, onEdit, onDelete }: TheaterTableProps) {
  return (
    <section className="rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#392828] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-[#1a0f0f]">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Image</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Theater</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Location</th>
              {/* Movies column removed per request */}
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-[#392828]">
            {theaters.length > 0 ? (
              theaters.map((theater) => {
                const imageSrc = getImage(theater.image, 'theaters');

                return (
                  <tr key={theater._id} className="hover:bg-slate-50 dark:hover:bg-[#1f1212] transition-colors">
                    <td className="px-6 py-4 align-top">
                      <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-gray-200 dark:border-[#392828] bg-[#0f0b0b]">
                        <Image src={imageSrc} alt={theater.name} fill className="object-cover" sizes="96px" />
                      </div>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{theater.name}</h4>
                      <p className="mt-1 text-sm text-slate-500 dark:text-[#b99d9d]">{theater.email}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-[#8f7676]">
                        {theater.phone}
                      </p>
                    </td>

                    <td className="px-6 py-4 align-top text-sm text-slate-500 dark:text-[#b99d9d]">
                      <p>{theater.address}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-[#8f7676]">{theater.city}</p>
                    </td>

                    {/* Movies column removed - assigned movies hidden */}

                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEdit(theater)}
                          className="p-1.5 text-slate-500 hover:text-primary dark:text-[#b99d9d] dark:hover:text-primary transition-colors"
                        >
                          <MdEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => onDelete(theater)}
                          className="p-1.5 text-slate-500 hover:text-red-500 dark:text-[#b99d9d] dark:hover:text-red-500 transition-colors"
                        >
                          <MdDelete className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                  No theaters match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}