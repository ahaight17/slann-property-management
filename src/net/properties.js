import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useAllProperties(){
  const { data, err } = useSWR(`/property/all`, fetcher)

  return {
    data: data,
    isLoading: !err && !data,
    isErr: err
  }
}

export function useSingleProperty(id){
  const { data, err } = useSWR(`/property/address/${id}`, fetcher)

  return {
    data: data,
    isLoading: !err && !data,
    isErr: err
  }
}