import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllReviews,
  clearErrors,
  deleteReviews,
} from "../../actions/ProductActions";
import StarIcon from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import "./productReviews.css";
import { Button } from "@material-ui/core";
import { DELETE_REVIEW_RESET } from "../../constants/ProductConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const { reviews, error, loading } = useSelector(
    (state) => state.productReviews
  );

  const deleteReviewHandler = (reviewId, ) => {
    dispatch(deleteReviews(reviewId, productId));
  };
  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
        dispatch(getAllReviews(productId));
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Review Deleted Suuccessfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [error, dispatch, deleteError, isDeleted,productId, navigate]);

  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 230,
      flex: 0.5,
    },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 335,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      renderCell: (params) => {
        const rating = params.row.rating;
        const textStyle = {
          color: rating >= 3 ? "green" : "red",
        };
        return <div style={textStyle}>{rating}</div>;
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
            <Button onClick={() => deleteReviewHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = reviews?.map((item) => ({
    id: item._id,
    rating: item.rating,
    comment: item.comment,
    user: item.name,
  }));

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
            <div>
              <StarIcon />
              <input
                type="text"
                placeholder=" Product ID"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows || []} // Provide empty array as fallback if products is undefined
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              className="productListTable"
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
