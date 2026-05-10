"use client";

import Image from "next/image";
import { Cast } from "@/interfaces/movie";

interface CastCrewProps {
  cast: Cast[];
}

const CastCrew = ({ cast }: CastCrewProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'actor':
        return 'person';
      case 'director':
        return 'movie_edit';
      case 'composer':
        return 'music_note';
      default:
        return 'person';
    }
  };

  return (
    <section className="w-full mx-auto px-4 md:px-20 lg:px-30 py-12 relative z-20 bg-surface-dark">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-primary pl-4">
          Cast & Crew
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {cast.map((member) => (
            <div key={member.cast_id} className="text-center group cursor-pointer">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#392828] group-hover:border-primary transition-colors mb-3 relative">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <div className="w-full h-full bg-[#392828] flex items-center justify-center text-text-secondary">
                    <span className="material-symbols-outlined text-4xl">
                      {getIcon(member.type)}
                    </span>
                  </div>
                )}
              </div>
              <h4 className="text-white font-bold text-sm group-hover:text-primary transition-colors">
                {member.name}
              </h4>
              <p className="text-text-secondary text-xs">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CastCrew;