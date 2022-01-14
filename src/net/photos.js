import useSWR from "swr";
import { fetcher } from "./fetcher";

export function usePropertyPhotos(id){
  const { data, err } = useSWR(`/photos/all/${id}`, fetcher)

  return {
    data: data,
    isLoading: !err && !data,
    isErr: err
  }
}