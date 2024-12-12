import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductUploadForm = () => {
  const [ProcutItemsDB, setProcutItemsDB] = useState([]);

  const [productData, setProductData] = useState({
    name: "",
    fixedPrice: "",
    discountPrice: "",
    description: "",
    stockStatus: "in stock",
    rating: "",
    image: null,
  });
  let [id, setId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };
  console.log(productData.image);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", productData.name);
    formData.append("fixedPrice", productData.fixedPrice);
    formData.append("discountPrice", productData.discountPrice);
    formData.append("description", productData.description);
    formData.append("stockStatus", productData.stockStatus);
    formData.append("rating", productData.rating);
    formData.append("image", productData.image);
    

    if (id) {
      axios
        .put("http://localhost:8080/product/" + id, formData, {})
        .then(() => {
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
          async function getProductData() {
            const response = await axios.get("http://localhost:8080/product");
            const reversedData = [...response.data].reverse(); // Reverse the data
            setProcutItemsDB(reversedData);
          }
          getProductData();
        });
    } else {
      axios.post("http://localhost:8080/all_product", formData, {});
      axios.post("http://localhost:8080/product", formData, {}).then(() => {
        toast.success("Add New Product!", {
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
        async function getProductData() {
          const response = await axios.get("http://localhost:8080/product");
          const reversedData = [...response.data].reverse(); // Reverse the data
          setProcutItemsDB(reversedData);
        }
        getProductData();
      });
    }
  };

  useEffect(() => {
    async function getProductData() {
      const response = await axios.get("http://localhost:8080/product");
      const reversedData = [...response.data].reverse(); // Reverse the data
      setProcutItemsDB(reversedData);
    }
    getProductData();
  }, []);

  let updateProductData = (product) => {
    setId(product._id);
    setProductData({
      ...productData,
      name: product.title,
      fixedPrice: product.fixedPrice,
      discountPrice: product.discountPrice,
      description: product.description,
      rating: product.rating,
      stockStatus: product.stockStatus,
    });
  };

  let deleteProduct = (product) => {
    axios.delete("http://localhost:8080/product/" + product._id).then(() => {
      toast.error("Product Delete Success!", {
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
      axios.get("http://localhost:8080/product").then((response) => {
        const reversedData = [...response.data].reverse(); // Reverse the data
        setProcutItemsDB(reversedData);
      });
    });
  };

  return (
    <div className="bg-gray-800 w-[1000px] mx-auto text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">New Product Upload Form</h2>

      {/* Product Name */}
      <div className="flex flex-col mb-4">
        <label htmlFor="name" className="mb-2 font-medium">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter product name"
          value={productData.name}
          onChange={handleChange}
          className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {/* Fixed Price */}
      <div className="flex flex-col mb-4">
        <label htmlFor="fixedPrice" className="mb-2 font-medium">
          Fixed Price ($)
        </label>
        <input
          type="number"
          id="fixedPrice"
          name="fixedPrice"
          placeholder="Enter fixed price"
          value={productData.fixedPrice}
          onChange={handleChange}
          className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {/* Discount Price */}
      <div className="flex flex-col mb-4">
        <label htmlFor="discountPrice" className="mb-2 font-medium">
          Discount Price ($)
        </label>
        <input
          type="number"
          id="discountPrice"
          name="discountPrice"
          placeholder="Enter discount price"
          value={productData.discountPrice}
          onChange={handleChange}
          className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col mb-4">
        <label htmlFor="description" className="mb-2 font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter product description"
          value={productData.description}
          onChange={handleChange}
          className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {/* Stock Status */}
      <div className="flex flex-col mb-4">
        <label htmlFor="stockStatus" className="mb-2 font-medium">
          Stock Status
        </label>
        <select
          id="stockStatus"
          name="stockStatus"
          value={productData.stockStatus}
          onChange={handleChange}
          className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="in stock">In Stock</option>
          <option value="out of stock">Out of Stock</option>
        </select>
      </div>

      {/* Rating */}
      <div className="flex flex-col mb-4">
        <label htmlFor="rating" className="mb-2 font-medium">
          Rating (1-5)
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          placeholder="Enter rating"
          value={productData.rating}
          onChange={handleChange}
          min="1"
          max="5"
          className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {/* Image Upload */}
      <div className="flex flex-col mb-4">
        <label htmlFor="image" className="mb-2 font-medium">
          Product Image
        </label>
        <input
          type="file"
          id="image"
          onChange={handleImageUpload}
          className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="btn btn-primary font-nunito font-semibold w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          {id ? "Updated Product" : "Upload Product"}
        </button>
      </div>

      {/*  */}
      <h2 className="text-xl font-bold mt-8 mb-4 text-center">Product List</h2>
      {ProcutItemsDB.length > 0 ? (
        <div className="grid items-start gap-6 mt-[30px] font-nunito ">
          <div className=" grid grid-cols-6 font-bold gap-2">
            <h2 className=" text-center">Image</h2>
            <h2 className=" text-center">Title</h2>
            <h2 className=" text-center">Price</h2>
            <h2 className=" text-center">Stock Status</h2>
            <h2 className=" text-center">Rating</h2>
            <h2 className=" text-center">Action</h2>
          </div>
          {ProcutItemsDB.map((product, index) => (
            <div className=" flex items-center gap-2">
              <p>{index + 1}</p>
              <div
                key={product._id}
                className="bg-gray-700 p-4 rounded-lg shadow-md  grid grid-cols-6  gap-3 items-center"
              >
                <div className=" bg-white px-3 h-full py-3  rounded-xl flex justify-center items-center overflow-hidden">
                  <div>
                    <img
                      src={`http://localhost:8080/${product.image}`}
                      alt={product.title}
                      className=" object-cover mb-4  rounded-md"
                    />
                  </div>
                </div>
                <h3 className="text-md font-semibold ">{product.title}</h3>
                <p className="text-sm text-gray-100 flex flex-col items-center mx-auto">
                  <div>
                    <b>Fixed:</b> ${product.fixedPrice}
                  </div>{" "}
                  <div>
                    {" "}
                    <b>Discount:</b> ${product.discountPrice}
                  </div>
                </p>
                <span
                  className={`mt-2 px-3 py-1 text-xs font-bold rounded-full w-[100px] text-center mx-auto ${
                    product.stockStatus === "in stock"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {product.stockStatus}
                </span>

                <p className=" mx-auto">{product.rating}</p>

                <div className=" flex flex-col gap-3 mx-auto w-auto font-semibold font-nunito">
                  <button
                    onClick={() => updateProductData(product)}
                    className=" px-6 py-2 bg-blue-600 rounded-full"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteProduct(product)}
                    className=" px-6 py-2 bg-red-600 rounded-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className=" text-2xl text-center">No products found !</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductUploadForm;
