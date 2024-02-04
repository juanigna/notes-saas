import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";

interface EditPageProps {
    params: {
        id: string
    }
}

async function getData(userId: string, noteId: string) {
    const data = await prisma.note.findUnique({
        where: {
            userId,
            id: noteId
        },
        select: {
            title: true,
            description: true,
            id: true
        }
    })

    return data
}



export default async function EditPage({ params: { id } }: EditPageProps) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const data = await getData(user?.id as string, id)

    async function updateNote(formData: FormData) {
        "use server"

        if (!user) throw new Error("You are not allowed!")

        const values = Object.fromEntries(formData.entries())
        const { title, description } = values

        await prisma.note.update({
            where: {
                id,
                userId: user.id as string
            },
            data: {
                title: title as string,
                description: description as string
            }
        })

        return redirect("/dashboard")

    }

    return (
        <Card>
            <form action={updateNote}>
                <CardHeader>
                    <CardTitle>Edit note</CardTitle>
                    <CardDescription>
                        Right here you can now edit your note
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
                            defaultValue={data?.title}
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
                            defaultValue={data?.description}
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