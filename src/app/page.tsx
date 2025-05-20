import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full h-dvh justify-center items-center">
      <Link href={ROUTES.LOGIN} className="px-4 py-2 bg-accent">
        Go To Login
      </Link>
    </div>
  );
}
