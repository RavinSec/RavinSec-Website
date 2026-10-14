"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Linkedin, Send } from "lucide-react";

import { cn } from "@/lib/utils";

type PostShareProps = {
  title: string;
  /** Absolute URL of the post. */
  url: string;
  className?: string;
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2H21.5l-7.5 8.57L22.75 22h-6.9l-5.4-7.06L4.27 22H1l8.02-9.17L1.25 2h7.08l4.88 6.45L18.24 2Zm-1.21 18h1.9L7.05 3.9H5.01L17.03 20Z" />
    </svg>
  );
}

export function PostShare({ title, url, className }: PostShareProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const targets = [
    {
      label: "اشتراک در تلگرام",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Send,
    },
    {
      label: "اشتراک در لینکدین",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      label: "اشتراک در X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: XIcon,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("لینک مطلب را کپی کنید:", url);
    }
  }

  const buttonClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-muted-foreground shadow-soft transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {targets.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={buttonClass}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "لینک کپی شد" : "کپی لینک مطلب"}
        title="کپی لینک"
        className={cn(buttonClass, copied && "border-emerald-500/40 text-emerald-600")}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "لینک کپی شد" : ""}
      </span>
    </div>
  );
}
