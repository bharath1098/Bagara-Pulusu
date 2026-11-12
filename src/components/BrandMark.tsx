import clsx from "clsx";
import { SafeImage as Image } from "@/components/SafeImage";
import { CAFE_MEDIA } from "@/lib/media";

type BrandMarkProps = {
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function BrandMark({
  className,
  sizes = "48px",
  priority = false,
}: BrandMarkProps) {
  return (
    <span className={clsx("brand-mark", className)} aria-hidden>
      <Image
        src={CAFE_MEDIA.logo}
        alt=""
        fill
        className="cover"
        sizes={sizes}
        priority={priority}
      />
    </span>
  );
}
