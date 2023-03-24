import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Homepage from "../pages/Homepage";
import Discovery from "../pages/Discovery";
import FormPage from "../pages/FormPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import FavoriteMovie from "../pages/FavoriteMovie";
import NotPage from "../pages/NoMatch";
import { useAuth } from "../contexts/AuthContext";
import Search from "../pages/Search";

function Router() {
  let location = useLocation();
  let state = location.state;
  function RequireAuth({ children }) {
    let auth = useAuth();
    console.log("user status:", auth.user);
    if (!auth.user) {
      

      return <Navigate to="/form" state={{ from: location }} replace />;
    }
    return children;
  }
  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="discovery/:pageId" element={<Discovery />} />
          <Route path="/movie/:movieId" element={<MovieDetailPage />} />
          <Route path="/form" element={<FormPage />} />
         
          <Route path="/search" element={<Search/>}/>
       
          <Route path="*" element={<NotPage />} />
          <Route
            path="/favorite"
            element={
              <RequireAuth>
                <FavoriteMovie/>
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/form" element={<FormPage />} />
        </Routes>
      )}
    </>
  );
}

export default Router;