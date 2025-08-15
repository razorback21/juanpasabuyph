"use client";

import { Link, usePage } from "@inertiajs/react";
import { FolderIcon, MoreHorizontalIcon, ShareIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

export function NavDocuments({ items, menuName = "Documents" }) {
    const { isMobile } = useSidebar();
    const page = usePage();
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>{menuName}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                            asChild
                            isActive={item.activeKey === page.component}
                        >
                            <Link href={route(item.route)}>
                                <item.icon />
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction
                                    showOnHover
                                    className="rounded-sm data-[state=open]:bg-accent"
                                >
                                    <MoreHorizontalIcon />
                                    <span className="sr-only">More</span>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-24 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align={isMobile ? "end" : "start"}
                            >
                                <DropdownMenuItem>
                                    <FolderIcon />
                                    <span>Open</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <ShareIcon />
                                    <span>Share</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </SidebarMenuItem>
                ))}
                {/* <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                        <MoreHorizontalIcon className="text-sidebar-foreground/70" />
                        <span>More</span>
                    </SidebarMenuButton>
                </SidebarMenuItem> */}
            </SidebarMenu>
        </SidebarGroup>
    );
}
