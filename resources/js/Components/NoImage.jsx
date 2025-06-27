export default function NoImage({ text ='No Image', size = 300 }) {
    return (
        <div className={`bg-gray-200 h-[${size}px] w-[${size}px] rounded-md flex items-center justify-center`}>
            <p className="text-gray-500 text-2xl font-medium">{ text }</p>
        </div>
    );
}
