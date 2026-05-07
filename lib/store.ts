"use client";

import { useEffect, useState } from "react";

export type Session = {
  name: string;
  role: "Founder" | "Company" | "Government";
  company: string;
  email: string;
  loggedInAt: string;
};

const SESSION_KEY = "asc.session";

const isBrowser = () => typeof window !== "undefined";

export function getSession(): Session | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function setSession(session: Session) {
  if (!isBrowser()) return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function useSession() {
  const [session, setLocalSession] = useState<Session | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage post-mount. Required pattern for SSR safety;
  // ignore the set-state-in-effect lint here.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalSession(getSession());
    setHydrated(true);
  }, []);

  return { session, hydrated, setSession: setLocalSession };
}

export function useLocalState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!isBrowser()) return;
    try {
      const raw = window.localStorage.getItem(key);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      // ignore corrupt JSON
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated || !isBrowser()) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota errors in demo
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}
