import Image from "next/image";

type Ratio = "4-3" | "3-2" | "1-1" | "16-9" | "16-10" | "16-7" | "4-5";

type Props = {
  src: string;
  alt: string;
  ratio?: Ratio;
  sizes?: string;
  priority?: boolean;
  caption?: string;
  className?: string;
};

/**
 * Single entry point for photography so every <Image> shares one aspect-ratio
 * and focus treatment. `loading` is deliberately never passed: Next throws if
 * `priority` and `loading="lazy"` are both present.
 */
export default function Photo({
  src,
  alt,
  ratio = "3-2",
  sizes = "(max-width: 900px) 100vw, 45vw",
  priority,
  caption,
  className,
}: Props) {
  return (
    <figure className={`photo photo-${ratio}${className ? ` ${className}` : ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="photo-img"
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}