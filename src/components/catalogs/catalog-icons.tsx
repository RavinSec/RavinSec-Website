import {
  AppWindow,
  Download,
  FileInput,
  FolderLock,
  Globe,
  KeyRound,
  LayoutDashboard,
  Lock,
  Monitor,
  MonitorCog,
  Network,
  ScanSearch,
  ScrollText,
  Server,
  Settings2,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Usb,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { CatalogIconName } from "@/lib/catalogs";

const registry: Record<CatalogIconName, LucideIcon> = {
  users: Users,
  "file-input": FileInput,
  "scan-search": ScanSearch,
  share: Share2,
  "scroll-text": ScrollText,
  "monitor-cog": MonitorCog,
  lock: Lock,
  sliders: SlidersHorizontal,
  globe: Globe,
  usb: Usb,
  server: Server,
  "shield-check": ShieldCheck,
  "layout-dashboard": LayoutDashboard,
  settings: Settings2,
  monitor: Monitor,
  download: Download,
  "key-round": KeyRound,
  network: Network,
  "app-window": AppWindow,
  "folder-lock": FolderLock,
};

type CatalogIconProps = React.SVGProps<SVGSVGElement> & {
  name: CatalogIconName;
};

/** Resolves a serializable icon name from catalog data to its lucide component. */
export function CatalogIcon({ name, ...props }: CatalogIconProps) {
  const Icon = registry[name];
  return <Icon aria-hidden {...props} />;
}
