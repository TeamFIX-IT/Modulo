import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../../api/agent";
import { useBookingContext } from "../../../context/BookingContext";
import { isAuth } from "../../../helpers/auth";
import Navbar2 from "../../Navbar2";
import PageTitle from "../../PageTitle";
import { Item } from "../Models";
import { deleteBooking } from "./DeleteBooking";

type ClassTypeProps = {
  id: number;
};

function ViewBookings() {
  // const [open, setOpen] = useState(false);

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const [classRooms, setClassRooms] = useState<Item[]>([]);

  useEffect(() => {
    agent.ClassRoomDetails.list()
      .then((c) => setClassRooms(c))
      .catch((e) => console.log(e));
  }, [classRooms]);

  if (!classRooms) {
    return (
      <tr>
        <td>No More Bookings.</td>
      </tr>
    );
  }

  const list = classRooms.map((c) =>
    c.bookings.map((i) => {
      if (i.userId !== isAuth().id) return <></>;
      return (
        <tr className="view-bookings-row">
          <td>{i.id}</td>
          <td>
            {c.classRoomType === 0 ? `Lecture Hall ${c.id}` : `Lab ${c.id}`}
          </td>
          <td>{new Date(i.date).toDateString()}</td>
          <td>{`${new Date(i.startTime).getHours()}.00 - ${new Date(
            i.endTime
          ).getHours()}.00`}</td>

          <td>
            <button
              style={{ color: "#db2525" }}
              onClick={() => {
                deleteBooking(i.id as number);
              }}
            >
              <i className="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    })
  );

  return (
    <>
      <Navbar2 />
      <div className="lechall-container">
        <PageTitle title="My Bookings" />

        <div className="table-container">
          <table className="details">
            <thead>
              <tr>
                <th>Id</th>
                <th>Class Room</th>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        </div>

        <Link to={"/lec-hall-allocation"}>
          <button
            className="OK-button"
            style={{ margin: "50px 200px 0px", float: "right" }}
          >
            Done
          </button>
        </Link>
      </div>
    </>
  );
}

export default ViewBookings;
