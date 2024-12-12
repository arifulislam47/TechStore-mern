import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BannerUploadForm = () => {
  const [bannerData, setBannerData] = useState({
    bannerImage: null,
    link: "",
  });

  const [id, setId] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBannerData({ ...bannerData, [name]: value });
  };

  // Handle file upload
  const handleImageUpload = (e) => {
    setBannerData({ ...bannerData, bannerImage: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("link", bannerData.link);
    // formData.append("image", bannerData.bannerImage);

    if (id) {
      axios
        .put("http://localhost:8080/banner" + id, formData, {})
        .then((response) => {
          toast.success("Banner Update Success!", {
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
        .post("http://localhost:8080/banner", FormData, {})
        .then((response) => {
          toast.success("Upload New Banner!", {
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
    <div className="bg-gray-800 w-[600px] mx-auto text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Banner Upload Form</h2>

      <form>
        {/* Banner Image Upload */}
        <div className="flex flex-col mb-4">
          <label htmlFor="bannerImage" className="mb-2 font-medium">
            Upload Banner Image
          </label>
          <input
            type="file"
            id="bannerImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Link Input */}
        <div className="flex flex-col mb-4">
          <label htmlFor="link" className="mb-2 font-medium">
            Banner Link (URL)
          </label>
          <input
            type="text"
            id="link"
            name="link"
            placeholder="Enter URL for banner"
            value={bannerData.link}
            onChange={handleChange}
            className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn font-semibold font-nunito btn-primary w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Upload Banner
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BannerUploadForm;
