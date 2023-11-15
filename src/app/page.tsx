import BasicUsage from "@/app/BasicUsage";
import Open from "@/app/Open";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  console.log(1);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Open />

      <Link href="/notice">공지사항</Link>
    </main>
  );
}
