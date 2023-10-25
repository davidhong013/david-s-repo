import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../AddressLink.jsx";
import PlaceGallery from "../PlaceGallery.jsx";
import BookingDates from "../BookingDates.jsx";

export default function BookingPage(){
    const {id} = useParams();
    const[booking,setBooking] = useState(null)
    const[redirect,setRedirect] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        if(id) {
            axios.get('/bookings').then( response => {
                const foundBooking = response.data.find(({_id}) => _id === id);
                if(foundBooking){
                    setBooking(foundBooking);
                }else{
                    alert('no booking availabel');
                    setRedirect(true);
                }
            })
        }else{
            alert("no id available");
        }
    }, [id]);

    useEffect(() => {
        if(redirect){
            navigate('../')
        }
    }, [redirect]);

    function DeleteBooking(){
        if(id){
            axios.delete(`/bookings/${id}`).then(response => {
                alert("Cancelled successfully");
                setRedirect(true);
            }).catch((err) => {
                console.log(err);
                alert("cancellation failed");
                setRedirect(true);
            })
        }else{
            alert('no booking availabel');
            setRedirect(true);
        }
    }
    if(!booking){
        return '';
    }
    return (
        <div className="my-8 ">
            <h1 className="text-3xl text-left">
                {booking.place.title}
            </h1>
            <AddressLink myClassName="my-2 block" children={booking.place.address}/>
            <div className="bg-gray-200 p-6 mb-6 rounded-2xl text-left my-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl mb-4"> Your booking information</h2>
                    <BookingDates booking={booking}/>
                </div>
                <div className="bg-amber-300 rounded-2xl p-6">
                    <div>Total Price</div>
                    <div className="text-2xl">${booking.price}</div>
                </div>

            </div>
            <PlaceGallery place={booking.place}/>
            <button className="bg-amber-300 p-6 mt-4" onClick={DeleteBooking}>Cancel this Booking</button>
        </div>

    )
}