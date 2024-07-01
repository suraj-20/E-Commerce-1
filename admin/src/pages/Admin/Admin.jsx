import React from "react";
import "./Admin.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../components/AddProduct/AddProduct";
import ListProduct from "../../components/ListProduct/ListProduct";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addProduct" element={<AddProduct />}></Route>
        <Route path="/listProduct" element={<ListProduct />}></Route>
      </Routes>
    </div>
  );
};

export default Admin;
