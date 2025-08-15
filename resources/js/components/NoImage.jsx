export default function NoImage({
    text = "No Image",
    height = "300px",
    width = "300px",
    onClick = null,
    hoverText = '',
}) {
    return (
        <div
            style={{ height, width }}
            className="bg-gray-200 rounded-md relative group cursor-pointer"
            onClick={onClick}
        >
            { hoverText !== '' && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white text-2xl font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {hoverText}
                    </p>
                </div>
            )}
            <div className="h-full w-full flex items-center justify-center">
                <p className="text-gray-500 text-2xl font-medium">{text}</p>
            </div>
        </div>
    );
}
