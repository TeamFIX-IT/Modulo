import { DataGrid} from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../../styles/UserListAP.scss";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import {isAuth} from '../../../helpers/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LecHallList() {

  const [data, setData] = useState([]);

  //Get data from Backend
  useEffect(() => {
    function getLecHalls(){
        axios.get(`https://localhost:5000/api/ClassRoom/institute/${isAuth().institutes[0].id}`).then((res) => {
            setData(res.data);
        }).catch((err) => {
            
        })
    }
    getLecHalls();
  }, [])  

  const handleDelete = (id:number) => {
    axios.delete(`https://localhost:5000/api/ClassRoom/${id}`).then((res) => {
            toast.error("Lec Hall deleted!")
            window.location.reload();
          }).catch((err) => {
            
            toast.error(err.response.data);
          })
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 50},
    {
        field: "hallNo",
        headerName: "Hall No (Name)",
        width: 220,
    },
    {
      field: "floorNumber",
      headerName: "Floor Number",
      width: 150,
    },
    { field: "buildingNumber", headerName: "Building Number", width: 200 },
    {
      field: "capacity",
      headerName: "Capacity",
      width: 150,
    },
    {
      field: "labType",
      headerName: "Hall Type",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params:any) => {
        return (
          <>
            <Link to={"/admin-panel/lechallslabs/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
    <ToastContainer/>
    <Link to="/admin-panel/addlechallslabs">
      <div className="APAddBtn-wrapper">
        <div className="APAddBtn text" id="APaddbtn-text">Add New Lecture Halls/ Labs</div><AddCircleIcon fontSize="large" className="APAddBtn"/>
      </div>
    </Link>
    <div className="userList">
      
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={9}
        checkboxSelection
      />
    </div>
    </>
  );
}