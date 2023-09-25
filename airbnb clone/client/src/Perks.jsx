export default function Perks({selected,onChange}){

    function handleCbClick(event){
        const {name,checked} = event.target;
        if(checked){
            onChange([...selected,name]);
        }else{
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }

    }
    return (
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes("Wifi")} name="Wifi" onChange={handleCbClick}/>
                <span>Wifi</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes("Parking")} name="Parking" onChange={handleCbClick}/>
                <span>Free Parking</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes("Pets")} name="Pets" onChange={handleCbClick}/>
                <span>Pets</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes("Gym")} name="Gym" onChange={handleCbClick}/>
                <span>Gym</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes("Bathtub")} name="Bathtub" onChange={handleCbClick}/>
                <span>Bathtub</span>
            </label>
        </>
    )
}