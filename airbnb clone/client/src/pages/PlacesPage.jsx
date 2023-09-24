import {Link, Navigate, useParams} from "react-router-dom";
import {useState} from "react";
import Perks from "../Perks.jsx";
import axios from "axios";
import PhotosUploader from "../PhotosUploader.jsx";
import PlacesFormPage from "./PlacesFormPage.jsx";
import AccountNav from "../AccountNav.jsx";

export default function PlacesPage(){
    
    return(
        <div>
            <AccountNav/>
                <div className="text-center">
                    list of all added place
                    <br/>
                    <Link className="inline-flex gap-1 bg-amber-300 text-black py-2 px-6 rounded-full"
                          to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new Place
                    </Link>
                </div>
        </div>
    )
}