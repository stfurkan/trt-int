'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { languages } from '@/config/languages';

interface LanguageSelectorProps {
  currentLang?: string;
}

export function LanguageSelector({ currentLang }: LanguageSelectorProps) {
  const router = useRouter();

  if (currentLang) {
    // Dropdown for language switching in news page
    return (
      <div className='flex items-center gap-2'>
        <select
          className='bg-background border rounded-md px-2 py-1'
          defaultValue={currentLang}
          onChange={(e) => {
            router.push(`/news/${e.target.value}`);
          }}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.native}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Grid of language options for the home page
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {languages.map((lang) => (
        <Link key={lang.code} href={`/news/${lang.code}`} className='block'>
          <Button
            variant='outline'
            className='w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-accent'
          >
            <span className='text-2xl'>{lang.flag}</span>
            <span className='font-medium'>{lang.native}</span>
            <span className='text-sm text-muted-foreground'>{lang.name}</span>
          </Button>
        </Link>
      ))}
    </div>
  );
}
