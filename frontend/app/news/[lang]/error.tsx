'use client';

import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Error - TRT News',
  description: 'An error occurred while loading the news.',
  robots: 'noindex'
};

export default function NewsError({
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
        <div className='flex gap-4 justify-center'>
          <Button onClick={() => reset()}>Try again</Button>
          <Link href='/'>
            <Button variant='outline'>Back to language selection</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
