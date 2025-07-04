export default function NoImage({ text = 'No Image', height = '300px', width ='300px', onClick = null }) {
    return (
        <div style={{ height, width }} className="bg-gray-200 rounded-md flex items-center justify-center" onClick={onClick}>
            <p className="text-gray-500 text-2xl font-medium">{ text }</p>
        </div>
    );
}
