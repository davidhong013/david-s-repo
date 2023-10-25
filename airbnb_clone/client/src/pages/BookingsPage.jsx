import AccountNav from "../AccountNav.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg.jsx";
import {differenceInCalendarDays, format} from "date-fns";
import {Link} from "react-router-dom";
import BookingDates from "../BookingDates.jsx";
export default function BookingsPage(){
    const [bookings,setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        })
    }, []);
    return (
        <div>
            <AccountNav />
            <div>
                {bookings?.length > 0 && bookings.map(
                    booking => (
                        <Link to={`/account/bookings/${booking._id}`}
                              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4">
                            <div className="w-48">
                                <PlaceImg place={booking.place}/>
                            </div>
                            <div className="py-3 text-left grow pr-3">
                                <h2 className="text-xl">{booking.place.title}</h2>
                                <BookingDates booking={booking}/>
                                <div className="text-xl">
                                    Number of Nights: {differenceInCalendarDays(new Date(booking.checkout),new Date(booking.checkin))} <br/>
                                    Total Price: ${booking.price}
                                </div>
                            </div>
                        </Link>
                    )
                )}
            </div>
        </div>
    )
}