import axios from "axios";
import { useEffect } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import Router from "next/router";



interface Query {
  category?: any;

}

const fetcher = (url: string) => axios.get(url).then(({ data }: any) => data);

export default function useSliers({ category }: Query = {}) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/slider/handler?category=${category}`,
    fetcher,
    {
      dedupingInterval: 3600000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,

    isLoading: isLoading,
    error: error,
    mutate: mutate,
  };
}
