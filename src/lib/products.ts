import { BrainCircuit, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProductVisualKey = "afrasi" | "pentest-ai";

export type Product = {
  id: string;
  name: string;
  /** Latin label shown as an eyebrow, e.g. "AFRASI". */
  label: string;
  category: string;
  status: string;
  tag: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  visual: ProductVisualKey;
  tags: string[];
  /** Three short selling points for compact cards. */
  highlights: string[];
  features: string[];
  specs: { label: string; value: string }[];
  /** Slug of the interactive catalog under /catalogs, if one exists. */
  catalogSlug?: string;
};

export const products: Product[] = [
  {
    id: "afrasi",
    name: "افراسی (AfraSI)",
    label: "AFRASI",
    category: "پلتفرم سازمانی",
    status: "قابل استقرار",
    tag: "محصول",
    description:
      "سامانه کنترل امن ورود و خروج فایل؛ اسکن چندموتوره، کیوسک فیزیکی و مرورگر ایزوله برای اینترنت آزاد.",
    longDescription:
      "افراسی مسیر ورود و خروج فایل سازمان را یک‌جا کنترل می‌کند. فایل از فلش USB در کیوسک یا از پنل وب وارد می‌شود، چند موتور آنتی‌ویروس آن را بررسی می‌کنند و فقط فایل امن برای دانلود یا اشتراک در اختیار کاربر قرار می‌گیرد. مرورگر ایزوله هم دسترسی امن به اینترنت آزاد را بدون ریسک برای شبکه داخلی فراهم می‌کند.",
    icon: ShieldCheck,
    visual: "afrasi",
    tags: ["Kiosk", "Multi-AV", "Isolated Browser", "RTL Admin Panel"],
    highlights: ["اسکن چندموتوره فایل", "کیوسک ویندوزی برای ایستگاه‌های فیزیکی", "مرورگر ایزوله برای اینترنت آزاد"],
    features: [
      "کنترل ورود و خروج فایل از طریق فلش و پنل وب",
      "اسکن چندگانه با موتورهای آنتی‌ویروس مختلف",
      "کیوسک ویندوزی با ورود کاربری و ثبت دستگاه با MAC",
      "مرورگر ایزوله برای دسترسی امن به اینترنت",
      "گروه‌های اشتراک، نقش‌ها و سهمیه‌ها",
      "گزارش‌گیری، لاگ ممیزی و سیاست‌های امنیتی منعطف",
    ],
    specs: [
      { label: "اجزا", value: "پنل وب (Afraav-UI)، بک‌اند اسکن (AfraAV)، کیوسک (AfraKiosk)" },
      { label: "استقرار", value: "داخل سازمان (On-Premise)" },
      { label: "کاربران هدف", value: "سازمان‌های با شبکه ایزوله یا حساس" },
      { label: "رابط کاربری", value: "فارسی و راست‌به‌چپ" },
    ],
    catalogSlug: "afrasi",
  },
  {
    id: "pentest-ml-llm",
    name: "تست نفوذ با Machine Learning و LLM",
    label: "AI PENTEST",
    category: "اتوماسیون امنیت تهاجمی",
    status: "پیش‌نمایش محدود",
    tag: "محصول",
    description:
      "خودکارسازی کشف آسیب‌پذیری و اولویت‌بندی یافته‌ها با مدل‌های Machine Learning و LLM.",
    longDescription:
      "این محصول فرآیند تست نفوذ را با ترکیب مدل‌های Machine Learning و LLMها تقویت می‌کند — از کشف سطح حمله تا تولید گزارش قابل‌اجرا. تیم‌ها سریع‌تر به یافته‌های باکیفیت می‌رسند و کار تکراری دستی کاهش می‌یابد.",
    icon: BrainCircuit,
    visual: "pentest-ai",
    tags: ["ML", "LLM", "Pentest", "CI/CD"],
    highlights: ["کشف خودکار سطح حمله", "اولویت‌بندی بر اساس ریسک واقعی", "گزارش و PoC تولیدشده با LLM"],
    features: [
      "کشف خودکار attack surface و مسیرهای حمله",
      "اولویت‌بندی هوشمند یافته‌ها بر اساس ریسک واقعی",
      "تولید PoC و گزارش با LLM برای تیم‌های فنی و مدیریتی",
      "یکپارچگی با workflow تیم امنیت و CI/CD",
      "کاهش کار تکراری و زمان رسیدن به یافته‌های معتبر",
      "بازبینی انسانی روی خروجی مدل پیش از انتشار گزارش",
    ],
    specs: [
      { label: "ورودی", value: "دامنه‌ها، API ها، اپلیکیشن‌های وب و موبایل" },
      { label: "خروجی", value: "یافته‌های رتبه‌بندی‌شده، PoC، گزارش فنی و مدیریتی" },
      { label: "یکپارچه‌سازی", value: "CI/CD، تیکتینگ و workflow تیم امنیت" },
      { label: "مدل اجرا", value: "همراه با تیم تست نفوذ راوین‌سک" },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
