import {useContext, useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "./UserContext.jsx";

export default function BookingComponent({myplace}){
    const [checkin,setCheckin] = useState('');
    const [checkout,setCheckout] = useState('');
    const [numofGuests,setNumOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [redirect,setRedirect] = useState('');
    const {user}= useContext(UserContext);

    useEffect(() => {
        if(user){
            setName(user.name);
        }
    }, [user]);

    let numberofNights = 0;
    if(checkin && checkout){
        numberofNights = differenceInCalendarDays(new Date(checkout),new Date(checkin));
    }
    function bookThisPlace(){
        const data = {
            checkin,checkout,numofGuests,name,phone,
            place:myplace._id,price:numberofNights * myplace.price};
        axios.post('/booking',data)
            .then(response => {
                const bookingId = response.data._id;
                setRedirect(`/account/bookings/${bookingId}`);
            })
            .catch((err) => {
                console.log(err);
                alert('please provide everything needed');
            });


    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return (
        <div className="shadow p-4 rounded-2xl bg-white">
            <div className="text-2xl text-center">
                Price: $ {myplace.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className=" py-3 px-4 ">
                        <label>Check in:</label>
                        <input type="date"
                               value={checkin}
                               onChange={event => setCheckin(event.target.value)}/>
                    </div>
                    <div className=" py-3 px-4 border-l">
                        <label>Check out:</label>
                        <input type="date"
                               value={checkout}
                               onChange={event => setCheckout(event.target.value)}/>
                    </div>
                </div>
                <div className=" py-3 px-4 border-t">
                    <label>Number of Guests:</label>
                    <input type="number"
                           value={numofGuests}
                           onChange={event => setNumOfGuests(event.target.value)}/>
                </div>
                {numberofNights > 0 && (
                    <div className=" py-3 px-4 border-t">
                        <label>Name</label>
                        <input type="text"
                               placeholder="first name and last name"
                               value={name}
                               onChange={event => setName(event.target.value)}/>
                        <label>Your Number</label>
                        <input type="tel"
                               placeholder="Your Phone number"
                               value={phone}
                               onChange={event => setPhone(event.target.value)}/>
                    </div>
                )}
            </div>

            <button onClick={bookThisPlace} className="primary mt-4">
                Book this house
                {numberofNights > 0 && (
                    <span> ${numberofNights * myplace.price}</span>
                )}
            </button>
        </div>
    );
}