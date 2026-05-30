import { Activity, Radar, ShieldPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ManagedService = {
  id: string;
  abbr: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const managedServices: ManagedService[] = [
  {
    id: "mss",
    abbr: "MSS",
    title: "خدمات امنیت مدیریت‌شده",
    description:
      "پایش مستمر، اولویت‌بندی هشدار و عملیات امنیتی متناسب با محیط و نیازهای انطباق شما.",
    icon: ShieldPlus,
  },
  {
    id: "mdr",
    abbr: "MDR",
    title: "کشف و پاسخ مدیریت‌شده",
    description:
      "مهندسی کشف ۲۴/۷، تحقیق و پاسخ هماهنگ هنگام تشدید حوادث.",
    icon: Radar,
  },
  {
    id: "amss",
    abbr: "AMSS",
    title: "امنیت پیشرفته مدیریت‌شده",
    description:
      "پشتیبانی برنامه ممتاز — شکار تهدید، گزارش‌دهی مدیریتی و رهبری امنیتی بین‌تیمی.",
    icon: Activity,
  },
];
