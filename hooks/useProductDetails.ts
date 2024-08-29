import axios from "axios";
import { useEffect } from "react";
import useSWR from "swr";
import Router from "next/router";

interface Query {
  id?: any;

}

const fetcher = (url: string) => axios.get(url).then(({ data }: any) => data);

export default function useProductDetails({ id }: Query = {}) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/book/${id}`,
    fetcher
    ,

    {
      dedupingInterval: 3600000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  console.log(data , "HOOKS DETAILS")

  return {
    data,

    isLoading: isLoading,
    error: error,
    mutate: mutate,
  };
}
