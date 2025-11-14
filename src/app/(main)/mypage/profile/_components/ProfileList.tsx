'use client';

import Image from 'next/image';
import ProfileCard from './ProfileCard';
import { useState } from 'react';

const ProfileList = () => {
  const [profiles, setProfiles] = useState<number[]>([1]);
  const [nextId, setNextId] = useState(2);

  const handleAddProfile = () => {
    if (profiles.length < 3) {
      setProfiles((prev) => [...prev, nextId]);
      setNextId((prev) => prev + 1);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center pb-14">
      <div className="flex w-full flex-col gap-4">
        {profiles.map((id) => (
          <ProfileCard key={id} />
        ))}
      </div>
      {profiles.length < 3 && (
        <Image
          src="/icons/profile-add.svg"
          alt="add"
          width={24}
          height={24}
          className="mt-4 cursor-pointer"
          onClick={handleAddProfile}
        />
      )}
    </main>
  );
};

export default ProfileList;
