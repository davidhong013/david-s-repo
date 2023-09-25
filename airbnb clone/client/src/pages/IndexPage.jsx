import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
export default function IndexPage(){
    const [places,setPlaces]=useState([]);
    useEffect(() => {
        axios.get('/places').then(
            response => {
                setPlaces(response.data);
            }
        );
    }, []);
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-x-6 gap-y-8 ">
            {places.length > 0 && places.map(place => {
                return(
                    <Link to={'/place/' + place._id}>
                        <div>
                            <div className="bg-gray-500 mb-2 rounded-2xl flex">
                                {place.photos?.[0] && (
                                    <img className="rounded-2xl object-cover aspect-square" src={"http://localhost:4000/upload/"+place.photos[0]} alt=""/>
                                )}
                            </div>
                            <h3 className="font-bold text-left">{place.address}</h3>
                            <h2 className="text-sm text-left truncate gra-500">{place.title}</h2>
                            <div className="font-bold text-left mt-1">${place.price} per night</div>
                        </div>
                    </Link>
                )
            })}
      </div>
    );
}