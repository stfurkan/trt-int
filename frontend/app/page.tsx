import { Metadata } from 'next';
import { LanguageSelector } from '@/components/ui/language-selector';

export const metadata: Metadata = {
  title: 'TRT News - Choose Your Language',
  description:
    "Select your preferred language to access TRT's global news coverage in your native language.",
  openGraph: {
    title: 'TRT News - Choose Your Language',
    description:
      "Select your preferred language to access TRT's global news coverage in your native language."
  },
  twitter: {
    title: 'TRT News - Choose Your Language',
    description:
      "Select your preferred language to access TRT's global news coverage in your native language."
  }
};

export default function Home() {
  return (
    <main className='min-h-screen p-8'>
      <div className='container mx-auto max-w-4xl'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>Welcome to TRT News</h1>
          <p className='text-xl text-muted-foreground'>
            Select your preferred language to read the latest news
          </p>
        </div>
        <LanguageSelector />
      </div>
    </main>
  );
}
