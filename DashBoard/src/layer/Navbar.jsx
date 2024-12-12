import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className=' h-dvh bg-gray-900 w-full px-[60px] pt-11 flex flex-col gap-y-20'>
      <div className=' font-nunito '>
      <div className="profile w-[70px] rounded-full overflow-hidden">
        <img src="/profile.jpg" alt="" />
      </div>
      <div>
        <h2 className=' text-white font-mono font-semibold text-2xl mt-3'>Ariful Islam</h2>
        <p className=' font-mono font-semibold text-gray-300'>citfdr.2401@gmail.com</p>
      </div>
      </div>

      <div className=' flex flex-col gap-y-3'>
        <NavLink className={"text-gray-400 text-2xl font-nunito font-semibold"} to={"/"}>Dashboard</NavLink>
        <NavLink className={"text-gray-400 text-2xl font-nunito font-semibold"} to={"/shop_time"}>Shop Time</NavLink>
        <NavLink className={"text-gray-400 text-2xl font-nunito font-semibold"} to={"/navbar"}>Navbar</NavLink>
        <NavLink className={"text-gray-400 text-2xl font-nunito font-semibold"} to={"/banner"}>Banner</NavLink>
        <NavLink className={"text-gray-400 text-2xl font-nunito font-semibold"} to={"/new_product"}>New Product</NavLink>
      </div>
    </div>
  )
}

export default Navbar
