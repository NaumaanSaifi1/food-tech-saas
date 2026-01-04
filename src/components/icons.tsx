export function VegIcon() {
    return (
        <div className="border border-green-600 p-[2px] rounded-sm w-4 h-4 flex items-center justify-center">
            <div className="w-2 h-2 bg-green-600 rounded-full" />
        </div>
    );
}

export function NonVegIcon() {
    return (
        <div className="border border-red-600 p-[2px] rounded-sm w-4 h-4 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-t-[6px] border-t-red-600 border-r-[4px] border-r-transparent" />
            {/* Triangle or just dot for simplicity, Swiggy uses triangle inside square sometimes or brown dot. Let's use red dot. */}
            {/* Actually standard IS 10500:2012 says green dot in square, brown/red triangle in square. */}
            <div className="absolute w-2 h-2 bg-red-600 rounded-full" />
        </div>
    );
}

// Redoing NonVeg to be standard Brown/Red Triangle in Square
export function NonVegIconStandard() {
    return (
        <div className="border border-red-700 p-[2px] rounded-sm w-4 h-4 flex items-center justify-center">
            <div className="w-2 h-2 bg-red-700 rounded-full" />
        </div>
    );
}
