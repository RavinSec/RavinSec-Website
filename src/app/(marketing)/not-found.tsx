import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-sm text-primary">۴۰۴</p>
      <h1 className="mt-4 font-display text-3xl font-semibold">صفحه یافت نشد</h1>
      <p className="mt-3 text-muted-foreground">
        صفحه‌ای که به دنبال آن هستید وجود ندارد یا جابه‌جا شده است.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">بازگشت به خانه</Link>
      </Button>
    </div>
  );
}
