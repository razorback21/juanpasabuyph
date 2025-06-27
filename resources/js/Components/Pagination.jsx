import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

export default ({ links }) => {
    return (
        <div className="flex items-center justify-center space-x-2 mt-4">
            {Object.entries(links).map(([key, value]) => (
                <Link href={value.url ?? "#"} key={key}>
                    <Button variant={value.active ? "outline" : "solid"}>
                        {value.label
                            .replace("&laquo; Previous", "«")
                            .replace("Next &raquo;", "»")}
                    </Button>
                </Link>
            ))}
        </div>
    );
};
