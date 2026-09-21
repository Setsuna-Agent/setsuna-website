import Image from "next/image";
import setsunaIcon from "../../public/images/setsuna.png";

export function Brand({ label }: { label: string }) {
  return (
    <a href="#" className="brand" aria-label={label}>
      <Image
        src={setsunaIcon}
        alt=""
        width={36}
        height={36}
        className="brand-icon"
      />
      <span>
        setsuna<span className="text-accent">.</span>
      </span>
    </a>
  );
}
