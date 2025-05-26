import React from 'react'
import CompanionForm from "@/components/CompanionForm";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {newCompanionPermissions} from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";

const NewCompanion = async () => {
    // do not allow unauthenticated users to access this page
    const { userId } = await auth();
    if (!userId) redirect('/sign-in')

    // do not allow under-subscribed users to create new companions
    const canCreateCompanion = await newCompanionPermissions();

    return (
        <main className={"min-lg:w-1/3 min-md:w-2/3 items-center justify-between"}>
            {canCreateCompanion ? (
                <article className={"w-full gap-4 flex flex-col"}>
                    <h1>Companion Builder</h1>

                    <CompanionForm/>
                </article>
            ) : (
                <article className={"companion-limit"}>
                    <Image src={"/images/limit.svg"} alt="Companion Limit Reached" width={360} height={230} />
                    <div className={"cta-badge"}>
                        Upgrade your plan
                    </div>
                    <h1>You've reached your limit!</h1>
                    <p>
                        You've reached your companion limit. Upgrade to create more companions and unlock premium features.
                    </p>
                    <Link href={"/subscription"} className={"btn-primary w-full justify-center"}>
                        Upgrade My Plan
                    </Link>
                </article>
            )}

        </main>
    )
}
export default NewCompanion
