import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShopTime = () => {
  let [data, setData] = useState([]);
  const [openHours, setOpenHours] = useState({
    mondayToThursday: "",
    friday: "",
    saturday: "",
  });
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const handleInputChange = (e, field) => {
    setOpenHours({ ...openHours, [field]: e.target.value });
  };

  useEffect(() => {
    async function getDataForValue() {
      const response = await axios.get("http://localhost:8080/shop_time");
      setData(response.data);
      setOpenHours({
        mondayToThursday: response.data.mondayToThursday,
        friday: response.data.friday,
        saturday: response.data.saturday,
      });
      setAddress(response.data.address);
      setPhone(response.data.phone);
      setEmail(response.data.email);
      setId(response.data._id);
    }

    getDataForValue();
  }, []);

  const handleSave = () => {
    if (
      !openHours.mondayToThursday &&
      !openHours.friday &&
      !openHours.saturday &&
      !address &&
      !phone &&
      !email
    ) {
      toast.error("Please fill out all the fields!", {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }

    if (id) {
      axios
        .put("http://localhost:8080/shop_time/" + id, {
          mondayToThursday: openHours.mondayToThursday,
          friday: openHours.friday,
          saturday: openHours.saturday,
          address: address,
          phone: phone,
          email: email,
        })
        .then((res) => {
          toast.success("Data Update Success!", {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Please Check Your Consol" + err, {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        });
    } else {
      axios
        .post("http://localhost:8080/shop_time", {
          mondayToThursday: openHours.mondayToThursday,
          friday: openHours.friday,
          saturday: openHours.saturday,
          address: address,
          phone: phone,
          email: email,
        })
        .then((res) => {
          toast.success("Data Submit Success!", {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Please Check Your Consol" + err, {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        });
    }
  };

  return (
    <div className="bg-gray-800 w-[1000px] mx-auto text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Shop Time Management</h2>

      {/* Time Inputs */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="mondayToThursday" className="mb-2 font-medium">
            Monday - Thursday
          </label>
          <input
            value={openHours.mondayToThursday}
            type="text"
            id="mondayToThursday"
            placeholder="e.g., 9:00 AM - 5:30 PM"
            onChange={(e) => handleInputChange(e, "mondayToThursday")}
            className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="friday" className="mb-2 font-medium">
            Friday
          </label>
          <input
            type="text"
            id="friday"
            placeholder="e.g., 9:00 AM - 6:00 PM"
            value={openHours.friday}
            onChange={(e) => handleInputChange(e, "friday")}
            className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="saturday" className="mb-2 font-medium">
            Saturday
          </label>
          <input
            type="text"
            id="saturday"
            placeholder="e.g., 11:00 AM - 5:00 PM"
            value={openHours.saturday}
            onChange={(e) => handleInputChange(e, "saturday")}
            className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Address Input */}
      <div className="flex flex-col mt-4">
        <label htmlFor="address" className="mb-2 font-medium">
          Address
        </label>
        <input
          type="text"
          id="address"
          placeholder="e.g., 1234 Street Address, City"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {/* Phone Input */}
      <div className="flex flex-col mt-4">
        <label htmlFor="phone" className="mb-2 font-medium">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          placeholder="e.g., (00) 1234 5678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {/* Email Input */}
      <div className="flex flex-col mt-4">
        <label htmlFor="email" className="mb-2 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="e.g., shop@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="btn btn-primary w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Save Changes
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ShopTime;
