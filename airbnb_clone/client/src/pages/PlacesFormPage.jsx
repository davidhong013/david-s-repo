import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
import {Navigate, useParams} from "react-router-dom";

export default function PlacesFormPage(){
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const[address,setAddress] = useState('');
    const[addedPhotos,setAddedPhotos] = useState([]);
    const[description, setDescription] = useState('');
    const[perks,setPerks] = useState([]);
    const[checkIn,setcheckIn] = useState('');
    const[checkOut,setcheckOut] = useState('');
    const[maxGuests,setmaxGuests] = useState(1);
    const[price,setPrice] = useState(100);
    const[redirect,setRedirect] = useState(false);
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(
            response => {
                const {data} = response;
                setTitle(data.title);
                setAddress(data.address);
                setAddedPhotos(data.photos);
                setDescription(data.description);
                setPerks(data.perks);
                setcheckIn(data.checkIn);
                setcheckOut(data.checkOut);
                setmaxGuests(data.maxGuests);
                setPrice(data.price);
            }
        )
    }, [id]);

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
    async function savePlace(event){
        event.preventDefault();
        const placeData = {
            title,address,addedPhotos,description,
            perks,checkIn,checkOut,maxGuests,price
        };
        if(id){
            await axios.put('/places', {id,...placeData});
            setRedirect(true);
        } else{
            await axios.post('/places', placeData);
            setRedirect(true);
        }

    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }
    return (
        <div>
            <AccountNav/>
            <form onSubmit={savePlace}>
                {preInput('Title')}
                <input type="text" value={title} onChange={(event) =>{
                    setTitle(event.target.value);
                }} placeholder="Title for your Property"/>
                {preInput('Address')}
                <input type="text" value={address} onChange={(event) =>{
                    setAddress(event.target.value);
                }} placeholder="Address"/>
                {preInput('Photos')}
                <PhotosUploader addedPhotos={addedPhotos} myonChange={setAddedPhotos}/>
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
                    <input className="mt-2 -mb-1" type="number" value={price} onChange={(event) =>{
                        setPrice(event.target.value);
                    }} placeholder="Price per Night"/>
                </div>
                <div>
                    <button className="primary my-4">Save</button>
                </div>
            </form>
        </div>
    )
}