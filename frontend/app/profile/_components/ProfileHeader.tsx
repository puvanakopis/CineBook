'use client';

import { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";

export function ProfileHeader() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-[#392828]">
      <div className="flex items-center gap-6">
        <div
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 md:size-32 ring-4 ring-[#392828]"
            style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBtLVHRuSfBjd2mcg9wuEI_gTfwCJRim11sLijh4Zz4eLKNL_YmzkffvNm2j_iNer5JLJM0o3U4pQDjzjYVF1jbbqhD-nMJjia33G72LPBciwlTkSHlw7ddZvTQYnaQd14xHJgmMwNuWZHU46fgfgH-OcF-FStDxz-qAndtmJkKJTru9o0dRgzbNka-sJ7oFsJOX-CbzEezYAdbNMv1yILiBJCqJ2tO8abP9CCxLrZ1Lalxutp1U-hM-W9cyu_L0qyUd47ZQS3VLZ-h")` }}
            role="img"
            aria-label="User profile avatar"
          />
          {isHovering && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity">
              <IoCameraOutline className="text-2xl text-white" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-white text-3xl font-bold tracking-tight">Alex Doe</h1>
          <p className="text-text-secondary">Movie Enthusiast</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">MEMBER</span>
            <span className="text-text-secondary text-xs">Since September 2021</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full md:w-auto">
        <button className="flex-1 md:flex-none items-center justify-center rounded-lg bg-[#291e1e] border border-[#392828] hover:border-primary/50 hover:text-white px-4 py-2 text-text-secondary text-sm font-bold transition-all">
          View Public Profile
        </button>
      </div>
    </section>
  );
}