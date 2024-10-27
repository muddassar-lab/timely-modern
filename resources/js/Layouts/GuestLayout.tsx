import React, { PropsWithChildren } from "react";
import { Head } from "@inertiajs/react";

interface Props {
    title: string
}

const GuestLayout = ({ children, title }: PropsWithChildren<Props>) => {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
            <Head title={title} />
            <div className="text-5xl text-primary font-extrabold text-shadow-lg">
                CODEBRISK
            </div>
            <div
                className="w-full flex flex-col gap-[24px] sm:max-w-md mt-6 border-2 border-primary px-6 py-4 shadow-md overflow-hidden sm:rounded-lg">
                <span className="text-4xl font-extrabold text-primary">{title}</span>
                {children}
            </div>
        </div>
    )
}

export default GuestLayout
