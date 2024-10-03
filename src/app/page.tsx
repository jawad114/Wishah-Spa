"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); 

  useEffect(() => {
    setMounted(true);

    if (mounted) {
      const hasVisited = localStorage.getItem("hasVisited");

      if (!hasVisited) {
        router.push("/onBoarding");
        localStorage.setItem("hasVisited", "true");
      } else if (loggedIn) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [mounted, loggedIn, router]);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      
    </div>
  );
}
