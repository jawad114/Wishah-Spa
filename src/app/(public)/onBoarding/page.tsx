"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MoveRight } from 'lucide-react';

const OnBoarding = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };
  return (
    <div className="relative h-screen flex justify-center items-center overflow-hidden">
      <Image
        src= '/wishahmain.png'
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="relative z-10 text-center text-white">
        <img src="/wishahLogo.png" alt="Logo" className="max-w-xs mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">About Wishah Appointment Booking & Schedules</h1>
        <p className="text-lg mb-6">Wishah SPA booking is one of the best spa, salon and any kinds of Therapist's appointment and schedules booking application <br /> with integrated CMS website. Using this system admin can Customize Service time slot, Daily/Weekly/Monthly Booking <br /> & cancelation limitation, Employee wise service and service price.</p>
        <button onClick={handleGetStarted} className="flex flex-col-2 px-6 gap-3 py-1 ml-96 mt-14 text-lg font-semibold text-white bg-green-600 rounded hover:bg-pinkCustom transition">
          Get Started  <MoveRight className='mt-1' />
        </button>
        <div className='text-sm text-white text-left bottom-0 mt-80 -ml-72'>
        © All Rights Reserved 2023
      </div>
      </div>
    
    </div>
  );
};

export default OnBoarding;
