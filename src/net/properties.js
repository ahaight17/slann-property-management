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

export function useSingleProperty(address){
  const { data, err } = useSWR(`/property/address/${address}`, fetcher)

  return {
    data: data,
    isLoading: !err && !data,
    isErr: err
  }
}