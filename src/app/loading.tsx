'use client';
import { Spinner } from '@nextui-org/react';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex items-center min-h-[400px]">
      <Spinner size="lg" color="primary" className='mr-2'/>
      <span>...</span>
    </div>
  );
}
