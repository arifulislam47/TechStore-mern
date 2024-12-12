import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../layer/Navbar";

const Root = () => {
  return (
    <div>
      <div className=" grid grid-cols-10">
        <div className=" col-span-2">
          <Navbar />
        </div>{" "}
        <div className=" px-10 py-11 bg-gray-700 col-span-8 overflow-scroll h-dvh">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Root;
