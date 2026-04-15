"use client";

import { useEffect } from "react";
import { sunTimes, isNight } from "@/lib/sun";

type Coords = { lat: number; lng: number; at: number };

const COORDS_KEY = "coords";
const COORDS_TTL = 7 * 24 * 60 * 60 * 1000;

async function fetchCoords(): Promise<Coords | null> {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (typeof data.latitude !== "number" || typeof data.longitude !== "number") return null;
    return { lat: data.latitude, lng: data.longitude, at: Date.now() };
  } catch {
    return null;
  }
}

function readCached(): Coords | null {
  try {
    const raw = localStorage.getItem(COORDS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Coords;
    if (Date.now() - parsed.at > COORDS_TTL) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function AutoTheme() {
  useEffect(() => {
    if (localStorage.getItem("theme")) return;

    let timeout: number | undefined;
    let cancelled = false;

    const apply = (lat: number, lng: number) => {
      if (cancelled || localStorage.getItem("theme")) return;
      const now = new Date();
      const times = sunTimes(now, lat, lng);
      if (!times) return;
      const night = isNight(now, times);
      document.documentElement.classList.toggle("dark", night);

      let nextTransition: Date;
      if (night) {
        nextTransition =
          now < times.sunrise
            ? times.sunrise
            : sunTimes(new Date(now.getTime() + 86400000), lat, lng)?.sunrise ?? new Date(now.getTime() + 3600000);
      } else {
        nextTransition = times.sunset;
      }
      const delay = Math.min(Math.max(60_000, nextTransition.getTime() - now.getTime() + 1000), 2_000_000_000);
      timeout = window.setTimeout(() => apply(lat, lng), delay);
    };

    (async () => {
      let coords = readCached();
      if (!coords) {
        coords = await fetchCoords();
        if (coords) localStorage.setItem(COORDS_KEY, JSON.stringify(coords));
      }
      if (coords) apply(coords.lat, coords.lng);
    })();

    return () => {
      cancelled = true;
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return null;
}
