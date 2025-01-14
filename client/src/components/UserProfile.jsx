import React, { useState, useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import axios from "axios";
import Cookies from "js-cookie";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import api from "../utils/api"

const UserProfile = () => {
  const [upiId, setUpiId] = useState(".........");
  const [metamaskId, setMetamaskId] = useState(".........");
  const [copym, setCopym] = useState(false);
  const [copyu, setCopyu] = useState(false);


  const [name, setName] = useState("User");
  const [email, setEmail] = useState("");
  const [mob, setMob] = useState("..");
  const [age, setAge] = useState("..");
  const [dob, setDob] = useState("..");
  const [address, setAddress] = useState("..");
  const [status, setStatus] = useState("..");
  const [kyc, setKyc] = useState(false);

  const [box, setBox] = useState(false);

  useEffect(() => {
    try {
      const a = Cookies.get('userEmail');
      console.log(a);
      // setEmail(a);
      const USER = async () => {
        const res = await api.post(`/auth/fetchdetail`,{ email: a } );
        const details = await res.data.user;
        console.log(details);
        setEmail(details.email || a || "..");
        // console.log(email);
        setName(details.name || "..");
        setMob(details.mobile || "..");
        setAge(details.age || "..");
        setDob(details.dob || "..");
        setAddress(details.address || "..");
        setStatus(details.status) || "..";
        setUpiId(details.upiId );
        setMetamaskId(details.metamaskId);
        setKyc(details.kyc);
      };
      USER();
    } catch (error) {
      console.log(error);
    }
  }, []);


  const logoutHandler = () => {
    Cookies.remove("token");
    Cookies.remove("userEmail");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const togglebox = () => {
    setBox(!box);
  };

  const update = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/updatedet`,
        { name, email, mob, age, dob, address, status }
      );
      console.log(res.data);
      console.log("success");
      setBox(!box);
    } catch (error) {
      console.log(error);
    }
  };

  const copyMetamask = () => {
    navigator.clipboard
      .writeText(metamaskId)
      .then(() => {
        setCopym(true);
        setTimeout(() => {
          setCopym(false);
        }, 4000);
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const copyUpi = () => {
    navigator.clipboard
      .writeText(upiId)
      .then(() => {
        setCopyu(true);
        setTimeout(() => {
          setCopyu(false);
        }, 4000);
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <>
      <div className="relative">
        <FaEdit
          onClick={togglebox}
          className="absolute text-xl text-fadeBlue"
        />
        <div className="p-4 flex-1 flex flex-col">
          <div className="text-8xl flex flex-col justify-center items-center gap-2 mb-12">
            <FaCircleUser className="text-fadeBlue" />
            <p className="text-3xl flex text-gray-300 justify-center items-center">
              {name}
            </p>
          </div>
          <div className="flex flex-col  h-full">
            <div className="flex">
              <p className="font-bold text-gray-300 text-base">Email: </p>
              <span className="text-white text-zinc-300 text-base px-2">
                {email}
              </span>
            </div>
            <div className="flex">
              <p className="font-bold text-gray-300 text-base">Mobile: </p>
              <span className="text-white text-zinc-300 text-base px-2">
                {mob}
              </span>
            </div>
            <div className="flex">
              <p className="font-bold text-gray-300 text-base">Age: </p>
              <span className="text-white text-zinc-300 text-base px-2">
                {age}
              </span>
            </div>
            <div className="flex">
              <p className="font-bold text-gray-300 text-base">DOB: </p>
              <span className="text-white text-zinc-300 text-base px-2 truncate">
                {dob}
              </span>
            </div>
            <div className="flex">
              <p className="font-bold text-gray-300 text-base">Address: </p>
              <span className="text-white text-zinc-300 text-base px-2">
                {address}
              </span>
            </div>
            <div className="flex">
              <p className="font-bold text-gray-300 text-base">Status: </p>
              <span className="text-white text-zinc-300 text-base px-2">
                {status}
              </span>
            </div>
          </div>
          <div className="pt-2 mt-2 border-t w-full h-full p-4 flex flex-col gap-1">
            <div className="flex flex-col ">
              <label className="font-bold text-gray-300 text-base">
                Metamask Id:{" "}
              </label>
              <div className="flex text-stone-400">
                <p className="font-semibold w-full truncate">{metamaskId}</p>
                {copym ? (
                  <IoIosCheckmarkCircle className="text-icon text-xl" />
                ) : (
                  <FaCopy onClick={copyMetamask} />
                )}
              </div>
              <label className="font-bold text-gray-300 text-base">
                Upi Id:{" "}
              </label>
              <div className="flex text-stone-400">
                <p className="w-full font-semibold">{upiId}</p>
                {copyu ? (
                  <IoIosCheckmarkCircle className="text-icon text-xl" />
                ) : (
                  <FaCopy onClick={copyUpi} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* down box */}
        <div className="p-4 border-t flex flex-col items-center h-1/3">
          <Link to="/KYC" className="text-linkcolor">
            {kyc?<p className="text-icon">KYC Completed</p>: <p className="text-red-500">Complete your KYC.</p>}
          </Link>
          <p className="text-linkcolor">Change password</p>
          <p className="text-linkcolor">Show QR</p>
          <p className="text-linkcolor">Remainders</p>
          <button
            onClick={logoutHandler}
            className="text-black py-2 bg-fadeBlue rounded-md border w-full "
          >
            Logout
          </button>
        </div>
      </div>

      {box && (
        <div className="absolute flex flex-col gap-2 p-5 left-[30%] w-2/5 h-2/4 bg-neutral-800 border-2 rounded-md">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="py-2 px-2 bg-zinc-700 outline-none rounded-md"
          />
          <input
            type="text"
            placeholder="Mobile"
            onChange={(e) => setMob(e.target.value)}
            className="py-2 px-2 bg-zinc-700 outline-none rounded-md"
          />
          <input
            type="text"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
            className="py-2 px-2 bg-zinc-700 outline-none rounded-md"
          />
          <input
            type="text"
            placeholder="Dob"
            onChange={(e) => setDob(e.target.value)}
            className="py-2 px-2 bg-zinc-700 outline-none rounded-md"
          />
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            className="py-2 px-2 bg-zinc-700 outline-none rounded-md"
          />
          <input
            type="text"
            placeholder="Status"
            onChange={(e) => setStatus(e.target.value)}
            className="py-2 px-2 bg-zinc-700 outline-none rounded-md"
          />
          <button
            onClick={update}
            className="w-full bg-fadeBlue rounded-md py-2"
          >
            Save Changes
          </button>
        </div>
      )}
    </>
  );
};

export default UserProfile;
