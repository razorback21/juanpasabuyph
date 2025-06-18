import { Link } from '@inertiajs/react';

export default ({links}) => {
    return <div className="flex items-center justify-center space-x-2 mt-4">
        {Object.entries(links).map(([key, value]) => (
            <Link 
                href={value.url??'#'} 
                key={key}
                className={`px-4 py-2 rounded-md ${value.active 
                    ? 'bg-gray-600 text-white font-medium' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
            >
                {value.label.replace('&laquo; Previous', '«').replace('Next &raquo;', '»')}
            </Link>
        ))}
    </div>
}