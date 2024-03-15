import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import "./productList.css";
import { Button } from "@material-ui/core";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../actions/UserActions";
import { DELETE_USER_RESET } from "../../constants/UserConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, error } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [error, dispatch, deleteError, isDeleted, navigate, message]);

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 180,
      flex: 0.8,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        const role = params.row.role;
        const textStyle = {
          color: role === "admin" ? "green" : "red",
        };
        return <div style={textStyle}>{role}</div>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      sortable: false,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.row.id}`}>
              {" "}
              {/* Assuming 'id' is the correct property */}
              <EditIcon />
            </Link>
            <Button onClick={() => deleteUserHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = users?.map((item) => ({
    id: item._id,
    role: item.role,
    email: item.email,
    name: item.name,
  }));

  return (
    <Fragment>
      <MetaData title={`ALL USERS - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          <DataGrid
            rows={rows || []} // Provide empty array as fallback if products is undefined
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            className="productListTable"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
