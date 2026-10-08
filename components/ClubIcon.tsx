import Image from "next/image";
import Icon from "./Icon";
import type { Club } from "@/lib/data";

export default function ClubIcon({
  club,
  size = 20,
}: {
  club: Club;
  size?: number;
}) {
  if (!club.iconImg) return <Icon name={club.icon} size={size} />;
  return (
    <Image
      src={club.iconImg}
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      className="club-icon-img"
    />
  );
}