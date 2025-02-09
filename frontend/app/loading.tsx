import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
  return (
    <main className='min-h-screen p-8'>
      <div className='container mx-auto'>
        <div className='h-8 w-48 bg-muted rounded animate-pulse mb-8' />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: 6 }, (_, i) => (
            <Card key={i} className='flex flex-col'>
              <div className='relative w-full h-48 bg-muted animate-pulse rounded-t-lg' />
              <CardHeader>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='h-4 w-24 bg-muted animate-pulse rounded' />
                  <div className='h-4 w-16 bg-muted animate-pulse rounded' />
                </div>
                <div className='h-6 w-full bg-muted animate-pulse rounded mb-2' />
                <div className='space-y-2'>
                  <div className='h-4 w-full bg-muted animate-pulse rounded' />
                  <div className='h-4 w-4/5 bg-muted animate-pulse rounded' />
                  <div className='h-4 w-2/3 bg-muted animate-pulse rounded' />
                </div>
              </CardHeader>
              <CardContent className='mt-auto'>
                <div className='h-9 w-full bg-muted animate-pulse rounded' />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
