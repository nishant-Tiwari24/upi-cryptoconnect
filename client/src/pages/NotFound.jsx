import { MdError } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="bg-black w-full h-screen text-white flex flex-col justify-center items-center container not-found">
      <MdError className="text-red-700 text-9xl"/>
      <h1 className="text-white text-4xl">Page Not Found !!</h1>
    </div>
  );
};

export default NotFound;