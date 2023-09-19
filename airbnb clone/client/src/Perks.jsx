export default function Perks({selected,onChange}){
    return (
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox"/>
                <span>Wifi</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox"/>
                <span>Free Parking</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox"/>
                <span>Pets</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox"/>
                <span>Gym</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox"/>
                <span>Bathtub</span>
            </label>
        </>
    )
}