import DashboardNav from "@/components/dashboard-nav";
import React from "react";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

async function getData({ user: { email, id, given_name, family_name } }: { user: KindeUser }) {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            stripeCustomerId: true,
        }
    })

    if (!user) {
        const name = `${given_name ?? ''} ${family_name ?? ''}`

        await prisma.user.create({
            data: {
                id,
                email: email as string,
                name
            }
        })
    }

    if (!user?.stripeCustomerId) {
        const data = await stripe.customers.create({
            email: email as string,
        })

        await prisma.user.update({
            where: {
                id
            },
            data: {
                stripeCustomerId: data.id
            }
        })
    }
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user) {
        return redirect("/");
    }


    await getData({ user })

    return (
        <div className="flex flex-col space-y-6 mt-10">
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashboardNav />
                </aside>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}