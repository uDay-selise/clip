import { usePhotoLink } from "./usePhotoLink";

type ProductPhotoProps = {
  fileId?: string;
  alt: string;
  className?: string;
};

/** A product photo from Blocks Storage, or the design's picture mark while there is none. */
export function ProductPhoto({ fileId, alt, className }: ProductPhotoProps) {
  const { data: url } = usePhotoLink(fileId);

  if (url) {
    return <img className={className ?? "pr-photo-img"} src={url} alt={alt} loading="lazy" />;
  }

  return (
    <svg className={className ?? "pr-photo-mark"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="m3 16 5-4 4 3 3-2 6 4" />
      <circle cx="9" cy="9" r="1.5" />
    </svg>
  );
}
