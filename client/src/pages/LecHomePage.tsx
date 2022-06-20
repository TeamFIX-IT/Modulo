import { useState } from "react";
import "../styles/LecHomePage.scss";
import TableDetails from "../components/LecHallAllocation/HomePage/TableDetails";
import PageTitle from "../components/PageTitle";

import Filter from "../components/LecHallAllocation/HomePage/Filter";
import Navbar2 from "../components/Navbar2";
import ViewBookings from "../components/LecHallAllocation/HomePage/ViewBookings";
import { isConstructorDeclaration } from "typescript";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function LecHomePage() {
  let options = [
    { value: 0, label: "Lecture Halls" },
    { value: 1, label: "Labs" },
  ];

  const [selected, setSelected] = useState(options[0]);

  return (
    <>
      <Navbar2 />
      <div className="lechall-container">
        <PageTitle title="Lecture Hall and Lab Allocation" />

        <div className="table-container">
          <Filter
            options={options}
            setSelected={setSelected}
            selected={selected}
          />
          <Link to="/lec-hall-allocation/view-bookings">
            <button>View My Bookings</button>
          </Link>

          <table className="details">
            <thead>
              <tr>
                <th className="hidden"></th>
                <th className="hide">Hall ID</th>
                <th>Hall Name</th>
                <th hidden={selected.value == 0}>Lab Type</th>
                <th className="hide">Hall capacity</th>
                <th className="hide">Hall Location</th>
                <th>Resources</th>
                <th>Availabiliy</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TableDetails selected={selected.value} />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
