import Link from "next/link";
import Image from "next/image";
import LogoPath from "@/public/images/Logo.png";

export default function Logo() {
  return (
    // <Link href='/' className='block' aria-label='Cruip'>
    <Image
      className='rounded-md'
      src={LogoPath}
      width={128}
      // height={20}
      alt={"Logo"}
    />
    // </Link>
  );
}
