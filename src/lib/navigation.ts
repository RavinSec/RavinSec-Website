export type NavLink = {
  href: string;
  label: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  items?: NavLink[];
  columns?: { title: string; items: NavLink[] }[];
};

export const siteContact = {
  email: "contact@ravinsec.com",
  phone: "09120241686",
};

export const mainNav: NavGroup[] = [
  { label: "خانه", href: "/" },
  {
    label: "خدمات",
    href: "/services",
  },
  {
    label: "محصولات",
    href: "/products",
  },
  {
    label: "وبلاگ امنیتی",
    href: "/blog",
  },
  { label: "نظرات مشتریان", href: "/#testimonies" },
  { label: "درباره ما", href: "/#about" },
  { label: "تماس با ما", href: "/contact" },
];

export const footerNav = {
  products: [{ href: "/products", label: "همه محصولات" }],
  services: [{ href: "/services", label: "همه خدمات" }],
  company: [
    { href: "/about", label: "درباره ما" },
    { href: "/blog", label: "وبلاگ امنیتی" },
    { href: "/#testimonies", label: "نظرات مشتریان" },
    { href: "/contact", label: "تماس با ما" },
  ],
};
