import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import agent from "../../../api/agent";
import BookingDetails from "./BookingDetails";
import ColorCode from "../ColorCode";
import Schedule from "../Schedule";

import Navbar2 from "../../Navbar2";
import PageTitle from "../../PageTitle";
import { useBookingContext } from "../../../context/BookingContext";
import "../../../styles/LecHallBooking.scss";
import "../../../styles/LecHomePage.scss";
import BookingForm from "./BookingForm";
import { Grid } from "@mui/material";

function LecHallBooking() {
  const { id } = useParams<{ id: string }>();
  const { selected } = useParams<{ selected: string }>();
  const [loading, setLoading] = useState(false);

  const { bookings } = useBookingContext();
  const { setBookings } = useBookingContext();

  return (
    <>
      <Navbar2 />

      <div className="lechall-container">
        <PageTitle title={"Lecture Hall and Lab Allocation - Booking"} />

        <div className="booking-details">
          <Grid container>
            <Grid item xs={5}>
              <BookingDetails selected={selected as string} id={id as string} />
            </Grid>
            <Grid item xs={7}>
              <BookingForm classId={parseInt(id as string)} />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default LecHallBooking;
