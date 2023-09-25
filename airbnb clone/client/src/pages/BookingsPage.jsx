import AccountNav from "../AccountNav.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
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
                        <div>

                            {booking.checkin} to {booking.checkout}
                        </div>
                    )
                )}
            </div>
        </div>
    )
}