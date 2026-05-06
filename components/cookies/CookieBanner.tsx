"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CookieChoice = "accepted" | "rejected";

const STORAGE_KEY = "electrotech_cookie_consent";
const COOKIE_NAME = "electrotech_cookie_consent";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 jours

function setConsentCookie(value: CookieChoice) {
  document.cookie = `${COOKIE_NAME}=${value}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setIsVisible(!stored);
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleChoice = (value: CookieChoice) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // no-op: fallback cookie est tout de même posé
    }
    setConsentCookie(value);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] p-4">
      <div className="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white p-4 shadow-2xl">
        <p className="text-sm text-dark-700">
          Nous utilisons des cookies pour améliorer votre expérience de navigation.
          Vous pouvez accepter ou refuser les cookies non essentiels.{" "}
          <Link
            href="/confidentialite"
            className="font-semibold text-primary-600 hover:text-primary-700"
          >
            Politique de confidentialité
          </Link>
          .
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleChoice("accepted")}
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Accepter
          </button>
          <button
            type="button"
            onClick={() => handleChoice("rejected")}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-dark-700 transition-colors hover:bg-gray-50"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
}
