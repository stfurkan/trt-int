'use client';

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface Author {
  firstname: string;
  lastname: string;
}

interface ArticleCardProps {
  id: string;
  type: 'article' | 'video';
  title: string;
  description: string;
  path: string;
  published_date: string;
  authors: Author[];
  formattedDate: string;
  language: string;
}

const BASE_URLS = {
  fra: 'https://www.trtfrancais.com',
  ara: 'https://www.trtarabi.com',
  bos: 'https://bhsc.trtbalkan.com',
  sqi: 'https://albanian.trtbalkan.com',
  mkd: 'https://macedonian.trtbalkan.com',
  rus: 'https://www.trtrussian.com',
  deu: 'https://www.trtdeutsch.com'
};

export function ArticleCard({
  type,
  title,
  description,
  path,
  authors,
  formattedDate,
  language
}: ArticleCardProps) {
  const baseUrl = BASE_URLS[language as keyof typeof BASE_URLS];
  const articleUrl = path?.startsWith('http') ? path : `${baseUrl}${path}`;
  const isRTL = language === 'ara';

  return (
    <Link href={articleUrl} target='_blank' rel='noopener noreferrer'>
      <Card
        className='flex flex-col justify-between h-full group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50'
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <CardHeader className='flex-grow space-y-4'>
          <div className='flex items-center justify-between gap-4 flex-wrap'>
            <div className='flex gap-2 items-center flex-wrap'>
              {type === 'video' ? (
                <Badge
                  variant='secondary'
                  className='bg-primary/10 text-primary hover:bg-primary/20'
                >
                  <svg
                    className='w-3 h-3 me-1'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  VIDEO
                </Badge>
              ) : (
                <Badge
                  variant='secondary'
                  className='bg-primary/10 text-primary hover:bg-primary/20'
                >
                  {type.toUpperCase()}
                </Badge>
              )}
            </div>
            <time className='text-sm text-muted-foreground font-medium'>
              {formattedDate}
            </time>
          </div>
          <CardTitle className='line-clamp-3 group-hover:text-primary transition-colors'>
            {title}
          </CardTitle>
          <p className='text-sm text-muted-foreground line-clamp-3'>
            {description}
          </p>
        </CardHeader>
        <CardFooter className='pt-6 border-t'>
          {authors.length > 0 && (
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <svg
                className='w-4 h-4 opacity-70'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
              <span className='line-clamp-1 opacity-90'>
                {authors
                  .map((author) => `${author.firstname} ${author.lastname}`)
                  .join(', ')}
              </span>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
