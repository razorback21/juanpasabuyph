import { Link } from '@inertiajs/react';

export default (links) => {
    return <>
        {Object.entries(links).map(([key, value]) => (
            <Link href={value.url??'#'} key={key}>
                {value.label}
            </Link>
        ))}
    </>
}