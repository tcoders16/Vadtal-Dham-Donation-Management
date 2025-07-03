

interface LogoProps {
  src: string;
  alt?: string;
  size?: number; // size in pixels, optional
}

export default function Logo({ src, alt = "Logo", size = 64 }: LogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="rounded-full object-cover shadow"
      style={{ width: size, height: size }}
    />
  );
}