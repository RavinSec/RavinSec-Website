"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

const subscribers = new Set<() => void>();
let historyPatched = false;

function readHash() {
  return typeof window === "undefined" ? "" : window.location.hash;
}

function notifyHashSubscribers() {
  queueMicrotask(() => {
    subscribers.forEach((subscriber) => subscriber());
  });
}

function patchHistory() {
  if (historyPatched || typeof window === "undefined") return;
  historyPatched = true;

  window.addEventListener("hashchange", notifyHashSubscribers);
  window.addEventListener("popstate", notifyHashSubscribers);

  const originalPushState = history.pushState.bind(history);
  const originalReplaceState = history.replaceState.bind(history);

  history.pushState = (...args) => {
    originalPushState(...args);
    notifyHashSubscribers();
  };

  history.replaceState = (...args) => {
    originalReplaceState(...args);
    notifyHashSubscribers();
  };
}

function subscribe(onStoreChange: () => void) {
  patchHistory();
  subscribers.add(onStoreChange);
  return () => {
    subscribers.delete(onStoreChange);
  };
}

export function useHash() {
  const pathname = usePathname();

  return useSyncExternalStore(
    subscribe,
    () => {
      void pathname;
      return readHash();
    },
    () => "",
  );
}
