import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default function CancelledPage() {
    return (
        <div className="w-full min-h-[80vh] flex items-center justify-center">
            <Card className="w-[350px]">
                <div className="p-6">
                    <div className="w-full flex justify-center">
                        <XIcon className="w-12 h-12 rounded-full bg-red-500/30 text-red-500 p-2" />
                    </div>

                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h3 className="text-lg leading-6">Payment failed</h3>
                        <div className="mt-2">
                            <p className="text-sm text-muted-foreground">No worries, you wont be charged. Please try again.</p>
                        </div>
                        <div className="mt-5 sm:mt-6 w-full">
                            <Link href={'/dashboard'}>
                                <Button className="w-full">
                                    Go back to Dashboard
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}