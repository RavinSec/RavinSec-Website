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

export function isNavLinkActive(pathname: string, hash: string, href?: string): boolean {
  if (!href) return false;

  const hashIndex = href.indexOf("#");
  if (hashIndex !== -1) {
    const targetPath = href.slice(0, hashIndex) || "/";
    const targetHash = href.slice(hashIndex);
    return pathname === targetPath && hash === targetHash;
  }

  if (href === "/") {
    return pathname === "/" && hash === "";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

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
    label: "کاتالوگ‌ها",
    href: "/catalogs",
  },
  {
    label: "وبلاگ امنیتی",
    href: "/blog",
  },
  { label: "نظرات مشتریان", href: "/#testimonies" },
  { label: "درباره ما", href: "/#about" },
];

export const footerNav = {
  products: [
    { href: "/products", label: "همه محصولات" },
    { href: "/catalogs", label: "کاتالوگ محصولات" },
  ],
  services: [{ href: "/services", label: "همه خدمات" }],
  company: [
    { href: "/about", label: "درباره ما" },
    { href: "/catalogs", label: "کاتالوگ محصولات" },
    { href: "/blog", label: "وبلاگ امنیتی" },
    { href: "/#testimonies", label: "نظرات مشتریان" },
    { href: "/contact", label: "تماس با ما" },
  ],
};
