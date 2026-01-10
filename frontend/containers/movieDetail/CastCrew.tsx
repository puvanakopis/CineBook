"use client";

import Image from "next/image";

interface CastMember {
  id: string;
  name: string;
  role: string;
  type: 'actor' | 'director' | 'composer';
  imageUrl?: string;
}

interface CastCrewProps {
  cast: CastMember[];
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
    <section className="w-full mx-auto px-20 md:px-20 bg-surface-dark lg:px-30 py-12 relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-primary pl-4">
          Cast & Crew
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {cast.map((member) => (
            <div key={member.id} className="text-center group cursor-pointer">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#392828] group-hover:border-primary transition-colors mb-3 relative">
                {member.imageUrl ? (
                 <div>
                  
                 </div>
                 // <Image
                  //   src={member.imageUrl}
                  //   alt={member.name}
                  //   fill
                  //   className="object-cover"
                  // />
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