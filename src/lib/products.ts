import { BrainCircuit, MonitorSmartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  tag: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  tags: string[];
  features: string[];
};

export const products: Product[] = [
  {
    id: "afrasi-vdi",
    name: "AfraSI (VDI)",
    tag: "محصول",
    description:
      "پلتفرم VDI برای دسترسی امن به اینترنت آزاد با خط لوله چندمرحله‌ای آنتی‌ویروس.",
    longDescription:
      "AfraSI محیط دسکتاپ مجازی (VDI) را برای کاربرانی فراهم می‌کند که به اینترنت آزاد نیاز دارند، بدون به خط افتادن امنیت سازمان. ترافیک و فایل‌ها از چند موتور آنتی‌ویروس عبور می‌کنند تا نشست‌ها پیش از رسیدن به endpoint بررسی شوند.",
    icon: MonitorSmartphone,
    tags: ["VDI", "Multi-AV", "Secure Access"],
    features: [
      "دسکتاپ مجازی ایزوله برای مرور و کار امن",
      "خط لوله چند AV برای اسکن فایل و ترافیک",
      "دسترسی کنترل‌شده به اینترنت آزاد",
      "مدیریت متمرکز نشست، سیاست و audit",
    ],
  },
  {
    id: "pentest-ml-llm",
    name: "تست نفوذ با Machine Learning و LLMs",
    tag: "محصول",
    description:
      "خودکارسازی کشف آسیب‌پذیری و اولویت‌بندی یافته‌ها با مدل‌های Machine Learning و LLM.",
    longDescription:
      "این محصول فرآیند تست نفوذ را با ترکیب مدل‌های Machine Learning و LLMها تقویت می‌کند — از کشف سطح حمله تا تولید گزارش قابل‌اجرا. تیم‌ها سریع‌تر به یافته‌های باکیفیت می‌رسند و کار تکراری manual کاهش می‌یابد.",
    icon: BrainCircuit,
    tags: ["ML", "LLM", "Pentest"],
    features: [
      "کشف خودکار attack surface و مسیرهای حمله",
      "اولویت‌بندی هوشمند یافته‌ها بر اساس ریسک واقعی",
      "تولید PoC و گزارش با LLM برای تیم‌های فنی و مدیریتی",
      "یکپارچگی با workflow تیم امنیت و CI/CD",
    ],
  },
];
