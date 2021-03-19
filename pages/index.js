import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="flex flex-1 justify-start align-center flex-col py-2">
      <Link href="/resume">
        <a>Resume</a>
      </Link>
    </div>
  );
}
