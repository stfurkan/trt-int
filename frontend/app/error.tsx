'use client';

import { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Error - TRT News',
  description: 'An error occurred while loading the page.',
  robots: 'noindex'
};

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className='min-h-screen flex items-center justify-center p-8'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold mb-4'>Something went wrong!</h2>
        <p className='text-muted-foreground mb-6'>{error.message}</p>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </main>
  );
}
