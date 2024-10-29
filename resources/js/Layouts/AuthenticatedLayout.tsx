import React, { PropsWithChildren } from "react";
import { Check, ChevronsUpDown, GalleryVerticalEnd, Search } from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Head, Link } from "@inertiajs/react";
import useTypedPage from "@/Hooks/useTypedPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import useRoute from "@/Hooks/useRoute";

interface Props {
    title: string;
}

const AuthenticatedLayout = ({ title, children }: PropsWithChildren<Props>) => {
    const props = useTypedPage()
    const route = useRoute()

    return (
        <SidebarProvider>
            <Head title={title} />
            <Sidebar>
                <SidebarHeader>
                    <span className="text-primary font-extrabold text-center text-3xl">
                        <Link href={route('dashboard')}>
                            CODEBRISK
                        </Link>
                    </span>
                </SidebarHeader>
                <SidebarContent className="no-scrollbar">

                </SidebarContent>
                <SidebarRail />
            </Sidebar>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.pn" />
                                <AvatarFallback>{props.props.auth.user?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem><Link href={route('profile.show')}>Settings</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href={route('logout')} method="post">Logout</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default AuthenticatedLayout