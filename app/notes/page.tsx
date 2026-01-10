import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function NotesPage() {
  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''], // сторінка 1, без пошуку
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
