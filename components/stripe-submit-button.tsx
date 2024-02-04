"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

export default function StripeSubmitButton() {
    const { pending } = useFormStatus()

    return (
        <>
            {
                pending ? (
                    <Button disabled={pending} type="submit" className="w-full">
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Redirecting...
                    </Button>
                ) : (
                    <Button className="w-full" type="submit">
                        Buy now
                    </Button>
                )
            }
        </>
    )
}