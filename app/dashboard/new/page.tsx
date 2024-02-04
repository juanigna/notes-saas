import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function NewNotePage() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    async function postNote(userId: string | undefined, formData: FormData) {
        "use server"

        if (!userId) throw new Error("User not allowed")

        const values = Object.fromEntries(formData.entries())
        const { title, description } = values

        await prisma.note.create({
            data: {
                userId: userId,
                description: description as string,
                title: title as string
            }
        })

        return redirect("/dashboard")
    }

    const updateUserWithId = postNote.bind(null, user?.id)


    return (
        <Card>
            <form action={updateUserWithId}>
                <CardHeader>
                    <CardTitle>New Note</CardTitle>
                    <CardDescription>
                        Right here you can now create your new notes
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-5">
                    <div className="gap-y-2 flex flex-col">
                        <Label>
                            Title
                        </Label>
                        <Input
                            required
                            type="text"
                            name="title"
                            placeholder="Title for your note"
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>
                            Description
                        </Label>
                        <Textarea
                            name="description"
                            placeholder="Describe your note as you want"
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Link href={'/dashboard'}>
                        <Button variant={"destructive"}>
                            Cancel
                        </Button>
                    </Link>
                    <SubmitButton />
                </CardFooter>
            </form>
        </Card>
    )
}