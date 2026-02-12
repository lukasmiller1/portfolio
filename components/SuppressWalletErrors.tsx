"use client";

import { useEffect } from "react";

const WALLET_ERROR_MESSAGES = [
  "Proposal expired",
  "Session expired",
  "Connection request expired",
];

function getMessage(reason: unknown): string {
  if (reason instanceof Error) return reason.message;
  if (typeof reason === "object" && reason !== null && "message" in reason) {
    return String((reason as { message?: unknown }).message);
  }
  return String(reason);
}

export function SuppressWalletErrors() {
  useEffect(() => {
    // Suppress known, harmless WalletConnect promise rejections so they
    // don't surface as fatal errors in the Next.js overlay.
    function handleRejection(event: PromiseRejectionEvent) {
      const msg = getMessage(event.reason);
      if (WALLET_ERROR_MESSAGES.some((m) => msg.includes(m))) {
        event.preventDefault();
        console.warn("WalletConnect:", msg);
      }
    }

    window.addEventListener("unhandledrejection", handleRejection);

    // Next.js dev overlay also triggers on console.error calls.
    // WalletConnect sometimes logs an empty object `{}`, which shows up
    // as a noisy "Console Error {}" overlay. We filter out that specific
    // pattern while preserving all other error logs.
    const originalConsoleError = console.error;
    const patchedConsoleError: typeof console.error = (...args: unknown[]) => {
      try {
        if (
          args.length === 1 &&
          typeof args[0] === "object" &&
          args[0] !== null &&
          Object.keys(args[0] as Record<string, unknown>).length === 0
        ) {
          // Ignore empty-object console errors (e.g. WalletConnect logger {})
          return;
        }
      } catch {
        // If anything goes wrong, fall back to original behavior.
      }
      // Forward everything else to the original console.error
      // eslint-disable-next-line no-console
      originalConsoleError(...(args as []));
    };

    // eslint-disable-next-line no-console
    console.error = patchedConsoleError;

    return () => {
      window.removeEventListener("unhandledrejection", handleRejection);
      // Restore original console.error on unmount.
      // eslint-disable-next-line no-console
      console.error = originalConsoleError;
    };
  }, []);

  return null;
}
