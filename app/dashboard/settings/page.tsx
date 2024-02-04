import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { type User } from "@prisma/client";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

async function getData(userId: string): Promise<User> {
    noStore();
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            name: true,
            email: true,
            colorScheme: true,
        },
    });

    return data;
}

export default async function SettingsPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData(user?.id as string);

    async function postData(formData: FormData) {
        "use server"

        const values = Object.fromEntries(formData.entries())
        const { name, email, color } = values

        await prisma.user.update({
            where: {
                id: user?.id as string,
            },
            data: {
                name: name as string,
                email: email as string,
                colorScheme: color as string
            }
        })

        revalidatePath('/dashboard/settings');

    }

    return (
        <div className="grid items-start gap-8">
            <div className="flex items-center justify-between px-2">
                <div className="grid gap-1">
                    <h1 className="text-3xl md:text-4xl">Settings</h1>
                    <p className="text-lg text-muted-foreground">Your profile settings</p>
                </div>
            </div>

            <Card>
                <form action={postData}>
                    <CardHeader>
                        <CardTitle>General Data</CardTitle>
                        <CardDescription>
                            Please provide general information about yourself. Please dont forget to save
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="space-y-1">
                                <Label>Your Name</Label>
                                <Input defaultValue={data?.name ?? undefined} type="text" placeholder="Your name" name="name" id="name" />
                            </div>
                            <div className="space-y-1">
                                <Label>Your Email</Label>
                                <Input defaultValue={data?.email as string} type="email" placeholder="Your email" name="email" id="email" />
                            </div>
                            <div className="space-y-1">
                                <Label>Color Scheme</Label>
                                <Select name="color" defaultValue={data?.colorScheme as string}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a color scheme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Color</SelectLabel>
                                            <SelectItem value="theme-green">Green</SelectItem>
                                            <SelectItem value="theme-blue">Blue</SelectItem>
                                            <SelectItem value="theme-violet">Violet</SelectItem>
                                            <SelectItem value="theme-yellow">Yellow</SelectItem>
                                            <SelectItem value="theme-orange">Orange</SelectItem>
                                            <SelectItem value="theme-red">Red</SelectItem>
                                            <SelectItem value="theme-rose">Rose</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <SubmitButton />
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}