"use client"

import Photography from "@/components/photography/Photography";
import SiteToggle from "@/components/shared/SiteToggle/SiteToggle";
import Technology from "@/components/technology/Technology";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonItems } from "@/components/shared/SiteToggle/config";

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [section, setSection] = useState<string>(pathname.split("/")[1]);

  useEffect(() => {
    if (pathname === '/') {
      const path = ButtonItems.find((item) => item.default)?.name;
      router.replace(path ? path : '/photography');
    }
    setSection(pathname.split("/")[1]);
  }, [pathname, router]);
  return (
    <>
      <SiteToggle router={router} />
      {section === 'photography' ? <Photography /> : ''}
      {section === 'technology' ? <Technology /> : ''}
    </>
  );
}
