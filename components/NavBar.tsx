"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Dialog, DialogClose } from "@radix-ui/react-dialog"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { ModeToggle } from "./ModeToggle"
import { Profile } from "./Profile"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Blog",
        href: "/resources/blog",
        description:
            "Deepen your knowledge.",
    },
]

export function NavBar() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();


    return (
        <div className="flex min-w-full justify-between p-2 z-10">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref className="cursor-pointer">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    {/* <NavigationMenuItem>
                        <Link href="/pricing" legacyBehavior passHref className="cursor-pointer">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Pricing
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem> */}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-3">
                {userId ? <Profile /> : <div className="flex gap-2">
                    <Link href="sign-in"><Button variant="outline">Login</Button></Link>
                    <Link href="sign-up"><Button>Sign Up</Button></Link>
                </div>
                }
                <ModeToggle />
            </div>
        </div>

    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
