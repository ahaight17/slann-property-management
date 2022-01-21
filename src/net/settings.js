import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useSettings(){
  const { data, err } = useSWR(`/settings/getSettings`, fetcher)

  return {
    data: data,
    isLoading: !err && !data,
    isErr: err
  }
}