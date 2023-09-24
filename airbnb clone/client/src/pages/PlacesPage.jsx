import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import Perks from "../Perks.jsx";
import axios from "axios";

export default function PlacesPage(){
    const {action} = useParams();
    const [title,setTitle] = useState('');
    const[address,setAddress] = useState('');
    const[addedPhotos,setAddedPhotos] = useState([]);
    const[photoLink,setphotoLink] = useState('');
    const[description, setDescription] = useState('');
    const[perks,setPerks] = useState([]);
    const[checkIn,setcheckIn] = useState('');
    const[checkOut,setcheckOut] = useState('');
    const[maxGuests,setmaxGuests] = useState(1);
    function inputHeader(text){
        return (
            <h2 className="text-xl mt-4">{text}</h2>
        )
    }
    function preInput(header){
        return (
            <>
                {inputHeader(header)}
            </>
        )
    }


    async function addPhotoByLink(event){
        event.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link',{link:photoLink})
        setAddedPhotos(prev => {
            return [...prev,filename];
        })
        setphotoLink('');
    }

    function uploadPhoto(event){
        const files = event.target.files;
        const data = new FormData();
        for(let i =0;i<files.length;++i){
            data.append('photos',files[i]);
        }

        axios.post('/upload-user-photo',data,{
            headers:{'Content-type':'multipart/form-data'}
        }).then(response => {
            const{data: filenames} = response;
            setAddedPhotos(prev => {
                return [...prev,...filenames];
            })
        })
    }
    return(
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-amber-300 text-black py-2 px-6 rounded-full"
                          to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new Place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title')}
                        <input type="text" value={title} onChange={(event) =>{
                            setTitle(event.target.value);
                        }} placeholder="Title for your Property"/>
                        {preInput('Address')}
                        <input type="text" value={address} onChange={(event) =>{
                            setAddress(event.target.value);
                        }} placeholder="Address"/>
                        {preInput('Photos')}
                        <div className="flex gap-2">
                            <input type="text" value={photoLink} onChange={(event) =>{
                                setphotoLink(event.target.value);
                            }} placeholder="Add using a link"/>
                            <button onClick={addPhotoByLink} className="bg-gray-200 grow px-4 rounded-2xl">Add&nbsp; Photo</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(mypic => {
                                return (
                                    <div>
                                        <img className="rounded-2xl"
                                            src={"http://localhost:4000/upload/"+mypic}
                                            alt = ""/>
                                    </div>
                                )
                            })}
                            <label className="cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-gray-500">
                                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                                </svg>
                                Upload From Your device
                            </label>
                        </div>
                        {preInput('Description')}
                        <textarea value={description} onChange={(event) =>{
                            setDescription(event.target.value);
                        }}/>
                        {preInput('Perks')}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks}/>
                        </div>
                        {preInput('Check in and checkout time & max guests')}
                        <div>
                            <input className="mt-2 -mb-1" value={checkIn} onChange={(event) =>{
                                setcheckIn(event.target.value);
                            }} type="text" placeholder="Check in time"/>
                            <input className="mt-2 -mb-1" value={checkOut} onChange={(event) =>{
                                setcheckOut(event.target.value);
                            }} type="text" placeholder="Check out time"/>
                            <input className="mt-2 -mb-1" type="number" value={maxGuests} onChange={(event) =>{
                                setmaxGuests(event.target.value);
                            }} placeholder="max guests number"/>
                        </div>
                        <div>
                            <button className="primary my-4">Save</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}