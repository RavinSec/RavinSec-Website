export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  industry?: string;
  featured?: boolean;
};

export const fallbackTestimonies: Testimonial[] = [
  {
    id: "fallback-1",
    quote:
      "RavinSec وضعیت امنیتی ما را به‌طور کامل متحول کرد. رویکرد عملی و تخصص عمیق آن‌ها به ما امکان داد با اطمینان مقیاس بگیریم.",
    author: "مدیر ارشد امنیت",
    role: "CISO، شرکت fintech",
    industry: "fintech",
    featured: true,
  },
  {
    id: "fallback-2",
    quote:
      "بهترین تیم امنیت تهاجمی که تا به حال با آن کار کرده‌ایم. آن‌ها آسیب‌پذیری‌هایی را یافتند که سه فروشنده دیگر از دست داده بودند.",
    author: "معاون مهندسی",
    role: "سازمان خدمات مالی",
    industry: "خدمات مالی",
  },
  {
    id: "fallback-3",
    quote:
      "قابل‌اعتماد، سریع و فوق‌العاده آگاه. شبکه هوشمند ابزارهای آن‌ها فقط با درخشش تیم‌شان قابل مقایسه است.",
    author: "مدیر امنیت",
    role: "شرکت cloud-native",
    industry: "cloud",
  },
];

export type PartnerLogo = {
  id: string;
  name: string;
  logoUrl: string | null;
  url?: string;
};

export const fallbackPartnerLogos: PartnerLogo[] = [
  { id: "fallback-splunk", name: "Splunk", logoUrl: null },
  { id: "fallback-crowdstrike", name: "CrowdStrike", logoUrl: null },
  { id: "fallback-microsoft", name: "Microsoft", logoUrl: null },
  { id: "fallback-aws", name: "AWS", logoUrl: null },
  { id: "fallback-palo-alto", name: "Palo Alto Networks", logoUrl: null },
  { id: "fallback-elastic", name: "Elastic", logoUrl: null },
];
