import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./user-nav";

export async function Navbar() {
    const { isAuthenticated, getUser } = getKindeServerSession()

    const user = await getUser()

    return (
        <nav className="border-b bg-background h-[10vh] flex items-center">
            <div className="container flex items-center justify-between">
                <Link href={'/'}>
                    <h1 className="font-bold text-3xl">Notes<span className="text-primary">Saas</span></h1>
                </Link>

                <div className="flex items-center gap-x-5">
                    <ThemeToggle />

                    {
                        (await isAuthenticated() && user !== null) ? (
                            <UserNav user={user} />
                        ) : (
                            <div className="flex items-center gap-x-5">
                                <LoginLink>
                                    <Button>
                                        Sign In
                                    </Button>
                                </LoginLink>
                                <RegisterLink>
                                    <Button variant={'secondary'}>
                                        Sign Up
                                    </Button>
                                </RegisterLink>
                            </div>
                        )
                    }

                </div>
            </div>
        </nav>
    )
}