"use client";

import { WireframeNav } from "@oss/ui/components/wireframe";
import { isRouteActive } from "@oss/ui/hooks/use-nav-routes";
import { cn } from "@oss/ui/lib/utils";
import {
	BookOpenIcon,
	CarIcon,
	HomeIcon,
	HouseIcon,
	MailIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContactDropdown } from "./contact-dropdown";

export function AppBottomNav() {
	const pathname = usePathname();
	const inBlog = isRouteActive(pathname, ["/blog", "/blog/*"]);
	const inHousing = isRouteActive(pathname, ["/housing", "/housing/*"]);
	const inCar = isRouteActive(pathname, ["/car", "/car/*"]);

	return (
		<WireframeNav
			className="flex items-center justify-around border-t bg-background"
			hideOn="desktop"
			position="bottom"
		>
			<Link
				className={cn(
					"flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors",
					pathname === "/"
						? "text-foreground"
						: "text-muted-foreground hover:text-foreground"
				)}
				href="/"
			>
				<HomeIcon className="size-5" />
				<span>Home</span>
			</Link>
			<Link
				className={cn(
					"flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors",
					inBlog
						? "text-foreground"
						: "text-muted-foreground hover:text-foreground"
				)}
				href="/blog"
			>
				<BookOpenIcon className="size-5" />
				<span>Blog</span>
			</Link>
			<Link
				className={cn(
					"flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors",
					inCar
						? "text-foreground"
						: "text-muted-foreground hover:text-foreground"
				)}
				href="/car"
			>
				<CarIcon className="size-5" />
				<span>Buy a car</span>
			</Link>
			<Link
				className={cn(
					"flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors",
					inHousing
						? "text-foreground"
						: "text-muted-foreground hover:text-foreground"
				)}
				href="/housing"
			>
				<HouseIcon className="size-5" />
				<span>Housing</span>
			</Link>
			<ContactDropdown
				trigger={
					<button
						className="flex flex-1 flex-col items-center justify-center gap-1 py-2 text-muted-foreground text-xs transition-colors hover:text-foreground"
						type="button"
					>
						<MailIcon className="size-5" />
						<span>Contact</span>
					</button>
				}
			/>
		</WireframeNav>
	);
}
