import useSWR from 'swr';
import { fetcher } from '../utils';

export const usePeople = (pageNumber = 1) => {
  const { data, error, isLoading } = useSWR(
    `https://swapi.dev/api/people/${
      pageNumber > 1 ? `?page=${pageNumber}` : ''
    }`,
    fetcher
  );

  return {
    people: data?.results,
    nextPage: data?.next,
    previousPage: data?.previous,
    isLoading,
    error,
  };
};
