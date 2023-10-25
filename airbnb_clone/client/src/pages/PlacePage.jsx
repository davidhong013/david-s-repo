import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "./config.jsx"
import BookingComponent from "../BookingComponent.jsx";
import PlaceGallery from "../PlaceGallery.jsx";
import AddressLink from "../AddressLink.jsx";

export default function placePage(){
    const backendurl = config.development.backendUrl + "/upload/";
    console.log(backendurl);
    const{id} = useParams();
    const[place,setPlace] = useState(null);

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get(`/places/${id}`).then(
            response => {
                setPlace(response.data);
            }
        )
    }, [id]);

    if(!place) return ;

    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-3xl text-left">
                {place.title}
            </h1>
            <AddressLink children={place.address}/>
            <PlaceGallery place={place} />

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] text-left mt-8 gap-8">
                <div>
                    <div className="my-4 text-left">
                        <h2 className="font-semibold text-2xl text-left">Description</h2>
                        {place.description}
                    </div>
                    Check-in : {place.checkIn}<br/>
                    Check-out : {place.checkOut}<br/>
                    Max number of Guests: {place.maxGuests}
                </div>
                <div>
                    <BookingComponent myplace = {place}/>
                </div>
            </div>

        </div>
    )
}