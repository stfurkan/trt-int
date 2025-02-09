import { getLanguageByCode } from '@/config/languages';
import { LanguageSelector } from '@/components/ui/language-selector';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/article-card';
import { cn } from '@/lib/utils';

interface PageProps {
  params: {
    lang: string;
  };
  searchParams: {
    page?: string;
  };
}

interface Article {
  id: string;
  type: 'article' | 'video';
  title: string;
  description: string;
  path: string;
  mainImageUrl?: string;
  published_date: string;
  authors: {
    firstname: string;
    lastname: string;
    image: string;
  }[];
}

interface ContentResponse {
  success: boolean;
  items: Article[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

async function getContent(lang: string, page = 1) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not configured');
  }

  const res = await fetch(
    `${apiUrl}/content?language=${lang}&page=${page}&limit=9`,
    {
      cache: 'no-store'
    }
  );
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to fetch content');
  }
  return res.json() as Promise<ContentResponse>;
}

export async function generateMetadata({
  params
}: {
  params: { lang: string };
}) {
  const { lang } = await params;
  const currentLanguage = getLanguageByCode(lang);
  if (!currentLanguage) {
    return {
      title: 'Not Found',
      description: 'The requested language is not available'
    };
  }

  const title = `${currentLanguage.latestNews} - TRT News`;
  const description = `Latest news and updates in ${currentLanguage.name} from TRT's global news network. Stay informed with breaking news, analysis, and in-depth coverage.`;

  return {
    title,
    description,
    keywords: [
      'news',
      currentLanguage.name,
      'TRT News',
      'breaking news',
      'global news',
      'international news',
      currentLanguage.native
    ],
    alternates: {
      canonical: `/news/${currentLanguage.code}`
    },
    openGraph: {
      title,
      description,
      locale: currentLanguage.locale || 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}

export default async function NewsPage({ params, searchParams }: PageProps) {
  const { lang } = await params;
  const { page } = await searchParams;

  const currentLanguage = getLanguageByCode(lang);
  if (!currentLanguage) {
    notFound();
  }

  const currentPage = Number(page) || 1;
  const content = await getContent(lang, currentPage);
  const uniqueArticles = content.items.filter(
    (article, index, self) =>
      index === self.findIndex((a) => a.id === article.id)
  );

  // Map ISO 639-2 codes to proper locale codes
  const localeMap: { [key: string]: string } = {
    fra: 'fr-FR',
    ara: 'ar-SA',
    bos: 'bs-BA',
    sqi: 'sq-AL',
    mkd: 'mk-MK',
    rus: 'ru-RU',
    deu: 'de-DE'
  };

  const dateFormatter = new Intl.DateTimeFormat(localeMap[lang] || 'en-US', {
    dateStyle: 'long',
    numberingSystem: lang === 'ara' ? 'arab' : 'latn'
  });

  const isRTL = lang === 'ara';

  return (
    <main className='container mx-auto py-8 px-4' dir={isRTL ? 'rtl' : 'ltr'}>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>{currentLanguage.latestNews}</h1>
        <LanguageSelector currentLang={currentLanguage.code} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        {uniqueArticles.slice(0, 9).map((article) => (
          <ArticleCard
            key={article.id}
            {...article}
            language={lang}
            formattedDate={dateFormatter.format(
              new Date(article.published_date)
            )}
          />
        ))}
      </div>

      {/* Pagination */}
      {content.total_pages > 1 && (
        <nav
          className='flex justify-center items-center mt-8 mb-4'
          aria-label='Pagination'
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className='flex items-center gap-2 bg-card rounded-lg shadow-sm p-2'>
            {/* Previous/Next buttons - reversed for RTL */}
            {isRTL ? (
              <>
                {currentPage < content.total_pages && (
                  <a
                    href={`/news/${currentLanguage.code}?page=${
                      currentPage + 1
                    }`}
                    className='relative inline-flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors'
                    aria-label='Next page'
                  >
                    <svg
                      className='h-5 w-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 19l-7-7 7-7'
                      />
                    </svg>
                  </a>
                )}

                {/* Page numbers */}
                <div className='flex items-center gap-1'>
                  {Array.from({ length: content.total_pages }, (_, i) => {
                    const pageNumber = i + 1;
                    const isCurrentPage = currentPage === pageNumber;
                    const isNearCurrent =
                      Math.abs(currentPage - pageNumber) <= 1;
                    const isEndPage =
                      pageNumber === 1 || pageNumber === content.total_pages;
                    const showPage = isNearCurrent || isEndPage;

                    if (!showPage) {
                      if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return (
                          <span
                            key={`ellipsis-${pageNumber}`}
                            className='px-3 py-2 text-sm text-muted-foreground'
                          >
                            •••
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <a
                        key={pageNumber}
                        href={`/news/${currentLanguage.code}?page=${pageNumber}`}
                        className={cn(
                          'relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
                          {
                            'bg-primary text-primary-foreground hover:bg-primary/90':
                              isCurrentPage,
                            'hover:bg-accent': !isCurrentPage
                          }
                        )}
                        aria-current={isCurrentPage ? 'page' : undefined}
                      >
                        {pageNumber}
                      </a>
                    );
                  })}
                </div>

                {currentPage > 1 && (
                  <a
                    href={`/news/${currentLanguage.code}?page=${
                      currentPage - 1
                    }`}
                    className='relative inline-flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors'
                    aria-label='Previous page'
                  >
                    <svg
                      className='h-5 w-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </a>
                )}
              </>
            ) : (
              <>
                {currentPage > 1 && (
                  <a
                    href={`/news/${currentLanguage.code}?page=${
                      currentPage - 1
                    }`}
                    className='relative inline-flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors'
                    aria-label='Previous page'
                  >
                    <svg
                      className='h-5 w-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 19l-7-7 7-7'
                      />
                    </svg>
                  </a>
                )}

                {/* Page numbers */}
                <div className='flex items-center gap-1'>
                  {Array.from({ length: content.total_pages }, (_, i) => {
                    const pageNumber = i + 1;
                    const isCurrentPage = currentPage === pageNumber;
                    const isNearCurrent =
                      Math.abs(currentPage - pageNumber) <= 1;
                    const isEndPage =
                      pageNumber === 1 || pageNumber === content.total_pages;
                    const showPage = isNearCurrent || isEndPage;

                    if (!showPage) {
                      if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return (
                          <span
                            key={`ellipsis-${pageNumber}`}
                            className='px-3 py-2 text-sm text-muted-foreground'
                          >
                            •••
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <a
                        key={pageNumber}
                        href={`/news/${currentLanguage.code}?page=${pageNumber}`}
                        className={cn(
                          'relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
                          {
                            'bg-primary text-primary-foreground hover:bg-primary/90':
                              isCurrentPage,
                            'hover:bg-accent': !isCurrentPage
                          }
                        )}
                        aria-current={isCurrentPage ? 'page' : undefined}
                      >
                        {pageNumber}
                      </a>
                    );
                  })}
                </div>

                {currentPage < content.total_pages && (
                  <a
                    href={`/news/${currentLanguage.code}?page=${
                      currentPage + 1
                    }`}
                    className='relative inline-flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors'
                    aria-label='Next page'
                  >
                    <svg
                      className='h-5 w-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </a>
                )}
              </>
            )}
          </div>
        </nav>
      )}

      {uniqueArticles.length === 0 && (
        <div className='text-center py-12'>
          <p className='text-lg text-muted-foreground'>
            No news articles available at the moment.
          </p>
        </div>
      )}
    </main>
  );
}
