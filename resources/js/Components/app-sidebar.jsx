import * as React from "react";
import { usePage, Link } from "@inertiajs/react";
import {
    ArrowBigDownIcon,
    ArrowUpCircleIcon,
    BarChartIcon,
    Box,
    Boxes,
    BoxSelect,
    CameraIcon,
    Check,
    ClipboardListIcon,
    CodesandboxIcon,
    CodeSquare,
    DatabaseIcon,
    FileCodeIcon,
    FileIcon,
    FileTextIcon,
    FolderIcon,
    FoldersIcon,
    Gauge,
    HelpCircleIcon,
    HomeIcon,
    LayoutDashboardIcon,
    ListIcon,
    LockKeyholeIcon,
    Package2Icon,
    PhoneCallIcon,
    Rows2Icon,
    SearchIcon,
    SettingsIcon,
    UsersIcon,
} from "lucide-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            route: "dashboard",
            icon: Gauge,
            activeKey: "Dashboard/Index",
        },
        // {
        //   title: "Customers",
        //   url: "#",
        //   icon: UsersIcon,
        // },
    ],
    navClouds: [
        {
            title: "Capture",
            icon: CameraIcon,
            isActive: true,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Proposal",
            icon: FileTextIcon,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Prompts",
            icon: FileCodeIcon,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
    ],
    navPages: [
        {
            name: "Home",
            url: "#",
            route: "home-assets.index",
            icon: HomeIcon,
            activeKey: "HomeAsset/Index",
        },
        {
            name: "About",
            url: "#",
            icon: HelpCircleIcon,
            route: "about-assets.index",
            activeKey: "AboutAsset/Index",
        },
    ],
    inventory: [
        {
            name: "Products",
            url: "#",
            route: "products.index",
            icon: Boxes,
            activeKey: "Products/Index",
        },
        {
            name: "Categories",
            url: "#",
            route: "product-categories.index",
            icon: FoldersIcon,
            activeKey: "ProductCategory/Index",
        },
        {
            name: "Featured Products",
            url: "#",
            route: "featured-products.index",
            icon: Check,
            activeKey: "FeaturedProduct/Index",
        },
        {
            name: "Out of Stock",
            url: "#",
            route: "out-of-stock.index",
            icon: ArrowBigDownIcon,
            activeKey: "OutofStock/Index",
        },
        {
            name: "Disabled Products",
            url: "#",
            route: "disabled-products.index",
            icon: LockKeyholeIcon,
            activeKey: "DisabledProduct/Index",
        },
        // {
        //     name: "Data Library",
        //     url: "#",
        //     icon: DatabaseIcon,
        // },
        // {
        //     name: "Reports",
        //     url: "#",
        //     icon: ClipboardListIcon,
        // },
        // {
        //     name: "Word Assistant",
        //     url: "#",
        //     icon: FileIcon,
        // },
    ],
    reports: [
        {
            name: "Orders",
            url: "#",
            route: "orders.index",
            icon: Box,
            activeKey: "Order/Index",
        },
    ],
};

export function AppSidebar({ ...props }) {
    const page = usePage();
    console.log(page);
    const inertiaProps = usePage().props;
    console.log(inertiaProps);
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link href="/">
                                <ArrowUpCircleIcon className="h-5 w-5" />
                                <span className="text-base font-semibold">
                                    JUANPSABUYPH
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavDocuments
                    items={data.inventory}
                    menuName="Inventory & Products"
                />
                <NavDocuments items={data.reports} menuName="Orders" />
                <NavDocuments items={data.navPages} menuName="Pages" />
                {/* <NavSecondary
                    items={data.navSecondary}
                    menuName="Pages"
                    className="mt-auto"
                /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={inertiaProps.auth.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
