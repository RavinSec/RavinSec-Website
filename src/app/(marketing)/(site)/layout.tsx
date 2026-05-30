import { PageTransition } from "@/components/layout/page-transition";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
