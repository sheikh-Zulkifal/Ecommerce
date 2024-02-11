  import React, { Fragment } from "react";
  import { useSelector } from "react-redux";
  import { Routes, Route, useNavigate } from "react-router-dom";

  const ProtectedRoute = ({ Component: Component, ...rest }) => {
    const navigate = useNavigate()
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    return (
      <Fragment>
        {!loading && (
          <Routes>
            <Route
            {...rest}
            render={(props) => {
              if (!isAuthenticated) {
                return navigate('/login')
              }
              return <Component {...props} />;
            }}
          />
          </Routes>
        )}
      </Fragment>
    );
  };

  export default ProtectedRoute;
