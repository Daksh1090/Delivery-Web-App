import { IoHomeOutline, IoBagHandleOutline, IoHeartOutline, IoPersonOutline } from "react-icons/io5";

function Footer() {
  return <div className="container py-4 flex justify-between px-2">
    <div className="flex flex-col text-white justify-center items-center ">
        <IoHomeOutline className=" text-2xl"/>
        <span >Home</span>
    </div>
    <div className="flex flex-col text-white justify-center items-center ">
        <IoBagHandleOutline className=" text-2xl"/>
        <span >My Order</span>
    </div>
    <div className="flex flex-col text-white justify-center items-center ">
        <IoHeartOutline className=" text-2xl"/>
        <span >Favorites</span>
    </div>
    <div className="flex flex-col text-white justify-center items-center ">
        <IoPersonOutline className=" text-2xl"/>
        <span >Profile</span>
    </div>
  </div>;
}

export default Footer;
