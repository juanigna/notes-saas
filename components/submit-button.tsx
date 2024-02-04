"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

export default function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <>
            {
                pending ? (
                    <Button disabled={pending} type="submit" className="w-fit">
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Submitting...
                    </Button>
                ) : (
                    <Button className="w-fit" type="submit">
                        Save now
                    </Button>
                )
            }
        </>


    )
}