import React, { useState } from "react";

const Navbar = () => {
  const [logo, setLogo] = useState(null);
  const [menuItem, setMenuItem] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [showButton, setShowButton] = useState(false);

  return (
    <div className="bg-gray-800 w-[1000px] mx-auto text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Customize Navbar</h2>

      <div className="flex flex-col gap-4">
        {/* Logo Input */}
        <div className="flex flex-col">
          <label htmlFor="logo" className="mb-2 font-medium">
            Set Your Logo
          </label>
          <input
            type="file"
            id="logo"
            className="file-input file-input-bordered file-input-primary bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            onChange={(e) => setLogo(e.target.files[0])}
          />
          <p className=" font-nunito text-[14px] mt-2 text-[#5fb0fc]">
          Current : <span className=" font-semibold capitalize">{}</span>
        </p>
        </div>

        {/* Menu Items Input */}
        <div className="flex flex-col">
          <label htmlFor="menu-items" className="mb-2 font-medium">
            Enter Your Menu Item
          </label>
          <input
            type="text"
            id="menu-items"
            placeholder="Home, About, Contact"
            value={menuItem}
            onChange={(e) => setMenuItem(e.target.value)}
            className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <p className=" font-nunito text-[14px] mt-2 text-[#5fb0fc]">
          Current : <span className=" font-semibold capitalize">{}</span>
        </p>
        </div>

        {/* Button Name Input */}
        <div className="flex flex-col">
          <label htmlFor="button-name" className="mb-2 font-medium">
            Enter Your Button Name
          </label>
          <input
            type="text"
            id="button-name"
            placeholder="Submit"
            value={buttonName}
            onChange={(e) => setButtonName(e.target.value)}
            className="input input-bordered bg-gray-700 text-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <p className=" font-nunito text-[14px] mt-2 text-[#5fb0fc]">
          Current : <span className=" font-semibold capitalize">{}</span>
        </p>
        </div>

        {/* Show Button Checkbox */}
        <div className="flex flex-col items-center justify-center">
         <div className=" flex items-center gap-2">
         <input
            type="checkbox"
            id="show-button"
            checked={showButton}
            onChange={(e) => setShowButton(e.target.checked)}
            className="checkbox checkbox-primary"
          />
        
          <label htmlFor="show-button" className="font-medium">
            Show Button
          </label>
         </div>
          <p className=" font-nunito text-[14px] mt-2 text-[#5fb0fc]">
          Current : <span className=" font-semibold capitalize">{}</span>
        </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button className="btn btn-primary w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Navbar;
