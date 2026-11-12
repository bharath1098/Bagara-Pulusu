import Image, { type ImageProps } from "next/image";
import { hasImage } from "@/lib/media";

/** Renders nothing when imagery is disabled / src is empty. */
export function SafeImage({ src, alt = "", ...rest }: ImageProps) {
  if (!hasImage(typeof src === "string" ? src : undefined)) return null;
  return <Image src={src} alt={alt} {...rest} />;
}
