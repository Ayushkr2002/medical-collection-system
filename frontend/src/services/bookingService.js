import axios from "axios";

const API =
axios.create({

baseURL:
"http://localhost:5000/api/bookings"

});

export const createBooking=
(data)=>API.post("/",data);

export default createBooking;