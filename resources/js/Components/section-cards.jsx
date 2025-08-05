import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function SectionCards({
    outOfStock = 0,
    profitThisMonth = 0,
    orderCount = 0,
}) {
    return (
        <div className="*:data-[slot=card]:shadow-xs mdmain:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Net Profit this month</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {profitThisMonth.toLocaleString("en-US", {
                            style: "currency",
                            currency: "PHP",
                        })}
                    </CardTitle>
                    {/* <div className="absolute right-4 top-4">
                        <Badge
                            variant="outline"
                            className="flex gap-1 rounded-lg text-xs"
                        >
                            <TrendingUpIcon className="size-3" />
                            +12.5%
                        </Badge>
                    </div> */}
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        {"Profit this month"}
                        {/* <TrendingUpIcon className="size-4" /> */}
                    </div>
                    <div className="text-muted-foreground">
                        Based on shipped orders only
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>New Orders</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {orderCount.toString().toLocaleString("en-US", {
                            style: "number",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                    </CardTitle>
                    {/* <div className="absolute right-4 top-4">
                        <Badge
                            variant="outline"
                            className="flex gap-1 rounded-lg text-xs"
                        >
                            <TrendingDownIcon className="size-3" />
                            -20%
                        </Badge>
                    </div> */}
                </CardHeader>
                {/* <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Down 20% this period{" "}
                        <TrendingDownIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Acquisition needs attention
                    </div>
                </CardFooter> */}
            </Card>
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Out of Stock</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {outOfStock}{" "}
                        <span className="text-gray-400 text-sm font-thin">
                            items
                        </span>
                    </CardTitle>
                    {/* <div className="absolute right-4 top-4">
                        <Badge
                            variant="outline"
                            className="flex gap-1 rounded-lg text-xs"
                        >
                            <TrendingUpIcon className="size-3" />
                            +12.5%
                        </Badge>
                    </div> */}
                </CardHeader>
            </Card>
            {/* <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Growth Rate</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        4.5%
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge
                            variant="outline"
                            className="flex gap-1 rounded-lg text-xs"
                        >
                            <TrendingUpIcon className="size-3" />
                            +4.5%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Steady performance <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Meets growth projections
                    </div>
                </CardFooter>
            </Card> */}
        </div>
    );
}
