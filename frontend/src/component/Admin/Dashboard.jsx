import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Line, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts } from "../../actions/ProductActions";
import { getAllOrders } from "../../actions/OrderActions.jsx";
import { getAllUsers } from "../../actions/UserActions.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  const [outofStock, setOutOfStock] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    let stockCount = 0;
    if (products) {
      products.forEach((item) => {
        if (item.Stock === 0) {
          stockCount += 1;
        }
      });
      setOutOfStock(stockCount);
    }
  }, [products]);

  useEffect(() => {
    // Register required elements for Chart.js
    Chart.register(...(Chart.controllers || []), ...(Chart.elements || []));

    let total = 0;
    orders && orders.forEach((item) => {
      total += parseFloat(item.totalPrice);
    });
    setTotalAmount(total);
  }, [orders]);

  const chartData = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: "tomato",
        hoverBackgroundColor: "rgb(197,72,49)",
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutData = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outofStock, products ? products.length - outofStock : 0],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ${totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={chartData} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
