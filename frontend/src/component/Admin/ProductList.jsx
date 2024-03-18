import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAdminProducts,
  clearErrors,
  deleteProduct,
} from "../../actions/ProductActions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import "./productList.css";
import { Button } from "@material-ui/core";
import { DELETE_PRODUCT_RESET } from "../../constants/ProductConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, error } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Product Deleted Suuccessfully");
      navigate("/admin/dashboard");
      dispatch({type : DELETE_PRODUCT_RESET})
    }
    dispatch(getAdminProducts());
  }, [error, dispatch, deleteError,isDeleted, navigate]);

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 230,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 335,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/product/${params.row.id}`}>
              {" "}
              {/* Assuming 'id' is the correct property */}
              <EditIcon />
            </Link>
            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = products?.map((item) => ({
    id: item._id,
    stock: item.Stock,
    price: item.price,
    name: item.name,
  }));

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
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

export default ProductList;
