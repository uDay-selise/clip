import { useQuery } from "@tanstack/react-query";
import { photoLink } from "./productPhoto";

/** Reads a stored product photo's link once per file id. */
export function usePhotoLink(fileId: string | undefined) {
  return useQuery({
    enabled: Boolean(fileId),
    queryFn: () => photoLink(String(fileId)),
    queryKey: ["photo", fileId],
    staleTime: 10 * 60_000
  });
}
