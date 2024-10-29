import React, { PropsWithChildren } from "react";
import { Head, Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/Components/ui/button";
import { Method } from "@inertiajs/core";

interface Props {
    title: string;
    header: string;
    description: string;
    linkTitle?: string;
    linkHref?: string;
    linkMethod?: Method;
}

const GuestLayout = ({
    children,
    title = "",
    header = "",
    description = "",
    linkHref,
    linkMethod,
    linkTitle
}: PropsWithChildren<Props>) => {
    return (
        <>
            <Head title={title} />
            <div className="container relative flex h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                {
                    linkHref && linkTitle && (
                        <Link
                            method={linkMethod}
                            href={linkHref}
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                "absolute right-4 top-4 md:right-8 md:top-8"
                            )}
                        >
                            {linkTitle}
                        </Link>
                    )
                }

                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-primary font-bold text-4xl">
                        CODEBRISK
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {header}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default GuestLayout;
