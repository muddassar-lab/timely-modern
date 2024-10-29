import { PropsWithChildren } from "react";

interface Props {
    title: string;
}

const AuthenticatedLayout = ({ title, children }: PropsWithChildren<Props>) => {
    return <>{children}</>
}