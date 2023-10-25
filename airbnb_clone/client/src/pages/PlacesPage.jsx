import {Link, Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Perks from "../Perks.jsx";
import axios from "axios";
import PhotosUploader from "../PhotosUploader.jsx";
import PlacesFormPage from "./PlacesFormPage.jsx";
import AccountNav from "../AccountNav.jsx";
import config from "./config.jsx";
import PlaceImg from "../PlaceImg.jsx";
const backendurl = config.development.backendUrl + '/upload/'
export default function PlacesPage(){
    const [places,setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places',).then(({data}) => {
            setPlaces(data);
        })
    }, []);
    return(
        <div>
            <AccountNav/>
                <div className="text-center">
                    <br/>
                    <Link className="inline-flex gap-1 bg-amber-300 text-black py-2 px-6 rounded-full"
                          to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new Place
                    </Link>
                    <div className="mt-4">
                        {places.length > 0 && places.map(place => (
                            <Link to={"/account/places/" + place._id} className="bg-gray-100 cursor-pointer p-4 gap-4 rounded-2xl flex">
                                <div className="flex w-32 h-32 bg-gray-300">
                                    <PlaceImg place={place}/>
                                </div>
                                <div className="shrink">
                                    <h2 className="text-xl">{place.title}</h2>
                                    <p className="text-sm mt-2">{place.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
        </div>
    )
}