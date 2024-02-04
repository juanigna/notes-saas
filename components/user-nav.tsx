import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreditCard, DoorClosed, Home, Settings } from "lucide-react";
import Link from "next/link";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

export const navItems = [
    {
        name: "Home",
        href: "/dashboard",
        icon: Home,
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
    {
        name: "Billing",
        href: "/dashboard/billing",
        icon: CreditCard,
    },
];

interface UserNavProps {
    user: KindeUser;
}

export default function UserNav({ user: { email, given_name, picture } }: UserNavProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="relative h-10 w-10 rounded-full">
                    <Avatar className="relative h-10 w-10 rounded-full">
                        <AvatarImage src={picture as string} alt="User image" />
                        <AvatarFallback>Jan</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{given_name}</p>
                        <p className=" text-xs leading-none">{email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {navItems.map((item, index) => (
                        <DropdownMenuItem asChild key={index}>
                            <Link
                                href={item.href}
                                className="w-full flex justify-between items-center"
                            >
                                {item.name}
                                <span>
                                    <item.icon className="w-4 h-4" />
                                </span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="w-full flex justify-between items-center">
                    <LogoutLink>
                        Logout <span><DoorClosed className="w-4 h-4" /></span>
                    </LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
