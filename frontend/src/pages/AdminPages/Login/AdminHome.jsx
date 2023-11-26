import React from "react";
import Footer from "../../../components/AdminComponents/Footer/Footer";
import Home from "../../../components/AdminComponents/Home/Home";

function AdminHome() {
  return (
    <div>
      <Home/>
      <div className="mt-48 sm:mt-0">
      <Footer />
      </div>
    </div>
  );
}

export default AdminHome;
