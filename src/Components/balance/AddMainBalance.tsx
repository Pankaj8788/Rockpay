// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { TextField, MenuItem } from "@mui/material";
// const AddMainBalance = () => {
//   const [formData, setFormData] = useState({
//     receiverId: "",
//     receiverName: "",
//     receiverType: "",
//     amount: "",
//     reason: "",
//   });
//   const [userTypes, setUserTypes] = useState([]); // State for storing user types
//   const [message, setMessage] = useState("");
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("jwt");
//         const headers = {
//           "Content-Type": "application/json",
//           Authorization: token,
//         };
//         const response = await axios.get("http://localhost:5000/api/usertype", {
//           headers: headers,
//         });
//         setUserTypes(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);
//   const handleInputChange = async (e: any) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // Make an API call to fetch receiver details based on the entered ID
//     try {
//       const token = localStorage.getItem("jwt");
//       const response = await axios.get(
//         `http://localhost:5000/api/protected/users-under-me/${value}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//         }
//       );
//       // Update the receiver's name and type in the form data
//       const { name: receiverName, user_type: receiverType } = response.data;
//       setFormData({
//         ...formData,
//         receiverName,
//         receiverType,
//       });
//     } catch (error) {
//       console.log("Error fetching receiver details:", error);
//     }
//   };
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("jwt");
//       const response = await axios.post(
//         "http://localhost:5000/api/protected/transfer",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//         }
//       );
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage("Error transferring funds");
//     }
//   };
//   return (
//     <div className="gap-6 main-container">
//       <h2 className="text-xl font-bold">Fund Transfer</h2>
//       <form onSubmit={handleSubmit} className="gap-6">
//         <div className="flex flex-col">
//           <label>Receiver ID:</label>
//           <input
//             type="text"
//             name="receiverId"
//             value={formData.receiverId}
//             onChange={handleInputChange}
//             className="w-72 mb-2 mt-2 h-10"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label>Receiver Name:</label>
//           <input
//             type="text"
//             name="receiverName"
//             value={formData.receiverName}
//             onChange={handleInputChange}
//             className="w-72  mb-2 mt-2"
//           />
//         </div>
//         <div className="w-full mt-4 flex flex-col">
//           <p className="capitalize text-bold font-semibold">Receiver Type</p>
//           <TextField
//             name="receiverType"
//             value={formData.receiverType}
//             onChange={handleInputChange}
//             className="w-1/4 h-12 mt-2"
//           />
//         </div>
//         <div className="  items-start">
//           <p className="text-bold font-semibold mt-6 mb-2">Amount:</p>
//           <TextField
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleInputChange}
//             className="w-1/4  mb-2 mt-2 bg-white"
//             inputProps={{
//               style: {
//                 height: "3px",
//               },
//             }}
//           />
//         </div>
//         <div className="  items-start">
//           <p className="text-bold font-semibold mt-6 mb-2">Reason:</p>
//           <TextField
//             type="text"
//             name="reason"
//             multiline
//             rows={5}
//             value={formData.reason}
//             onChange={handleInputChange}
//             className="w-1/4  mb-2 mt-2 bg-white"
//             inputProps={{
//               style: {
//                 height: "3px",
//               },
//             }}
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-4 py-3 bg-themeColor texl-sm rounded-md text-white font-bold"
//         >
//           Transfer Funds
//         </button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };
// export default AddMainBalance;

//.....................original........

import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { TextField, MenuItem } from "@mui/material";
const AddMainBalance = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const headers = {
          "Content-Type": "application/json",
          Authorization: token,
        };
        const responsebalance = await axios.get(
          "http://localhost:5000/api/protected/balance",
          {
            headers: headers,
          }
        );
        setData(responsebalance.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const [formData, setFormData] = useState({
    receiverId: "",
    receiverName: "",
    receiverType: "",
    amount: "",
    reason: "",
  });

  const [message, setMessage] = useState("");
  const handleInputChange = async (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "receiverId") {
      setFormData({ ...formData, [name]: value });
    } else {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(
          `http://localhost:5000/api/protected/userrr/${value}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        // Update the receiver's name and type in the form data
        const { name: receiverName, user_type: receiverType } =
          response.data.user;
        setFormData({
          ...formData,
          receiverName,
          receiverType,
        });
      } catch (error) {
        console.log("Error fetching receiver details:", error);
      }
    }
  };

  // const handleInputChange = async (e: any) => {
  //   const { name, value } = e.target;
  //   console.log("Input value:", value); // Log the input value to check if it's correct
  //   setFormData({ ...formData, [name]: value });

  //   if (name === "receiverId") {
  //     try {
  //       const token = localStorage.getItem("jwt");
  //       const response = await axios.get(
  //         `http://localhost:5000/api/protected/userrr/${value}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: token,
  //           },
  //         }
  //       );
  //       console.log("Response data:", response.data); // Log the response data to check if it's correct
  //       // Update the receiver's name and type in the form data
  //       const { name: receiverName, user_type: receiverType } =
  //         response.data.user;
  //       console.log("Receiver name:", receiverName); // Log the receiver name to check if it's correct
  //       console.log("Receiver type:", receiverType); // Log the receiver type to check if it's correct
  //       setFormData({
  //         ...formData,
  //         receiverName,
  //         receiverType,
  //       });
  //     } catch (error) {
  //       console.log("Error fetching receiver details:", error);
  //     }
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.post(
        "http://localhost:5000/api/protected/transfer",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      setMessage(response.data.message);
      Swal.fire({
        icon: "success",
        title: "Funds Transfered Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setMessage("Error transferring funds");
    }
  };
  return (
    <section className=" flex w-full main-container ">
      <div className="rounded-full ">
        <div className="gap-6 main-container bg-white border-2 border-gray-400 rounded-3xl h-150">
          <h2 className="text-xl font-bold">Fund Transfer</h2>
          <form onSubmit={handleSubmit} className="gap-6">
            <div className="flex mb-1 flex-col h-12">
              <p className="font-medium text-md">Receiver ID:</p>
              <input
                type="text"
                name="receiverId"
                value={formData.receiverId}
                onChange={handleInputChange}
                placeholder=""
                className=" h-10 w-64 bg-white rounded-sm mb-4 border-2 border-gray-400"
              />
            </div>
            <div className="flex mb-1 flex-col h-12">
              <p className="font-medium text-md mb-2">Receiver Name:</p>
              <input
                type="text"
                name="receiverName"
                value={formData.receiverName}
                onChange={handleInputChange}
                className=" h-10 w-54 bg-white rounded-sm mb-4 border-2 border-gray-400"
              />
            </div>
            <div className=" h-12 mt-2 flex flex-col">
              <p className="font-medium text-md mb-2">Receiver Type</p>
              <input
                name="receiverType"
                value={formData.receiverType}
                onChange={handleInputChange}
                className=" h-10 w-54 bg-white rounded-sm  border-2 border-gray-400"
              />
            </div>
            <div className="items-start mt-4">
              <p className="font-medium text-md mb-2">Amount:</p>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className=" h-8 w-64 bg-white rounded-sm  border-2 border-gray-400"
              />
            </div>
            <div className="  items-start">
              <p className="font-medium text-md mb-2">Reason:</p>
              <TextField
                type="text"
                name="reason"
                multiline
                rows={2}
                value={formData.reason}
                onChange={handleInputChange}
                className=" h-10 w-64 bg-white rounded-md  border-2 border-gray-400"
                inputProps={{
                  style: {
                    height: "3px",
                  },
                }}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-3 mt-12 bg-themeColor texl-sm rounded-md text-white font-bold"
            >
              Transfer Funds
            </button>
          </form>
          <div className="w-full flex items-center justify-between mt-4 mb-4 h-36">
            <div className="w-full h-full rounded-xl bg-[#6C45BF] shadow-[0_10px_20px_rgba(00,00,00)] flex flex-col items-center justify-center gap-6">
              <h1 className="text-2xl font-bold capitalize text-white ">
                Wallet Balance
              </h1>
              <h1 className="text-2xl font-bold capitalize text-white ">
                {data?.balance} &#x20B9;
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AddMainBalance;

///..........................original
// import React, { useState } from "react";
// import axios from "axios";
// import { TextField } from "@mui/material";
// const AddMainBalance = () => {
//   const [formData, setFormData] = useState({
//     senderId: "1",
//     receiverId: "",
//     amount: "",
//   });
//   const [message, setMessage] = useState("");
//   const handleInputChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("jwt");

//       const response = await axios.post(
//         "http://localhost:8080/api/transfer",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//         }
//       );
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage("Error transferring funds");
//     }
//   };
//   return (
//     <div className="gap-6 main-container">
//       <h2 className="text-xl font-bold">Fund Transfer</h2>
//       <form onSubmit={handleSubmit} className="gap-6">
//         {/* <div>
//           <label>Sender ID:</label>
//           <input
//             type="text"
//             name="senderId"
//             value={formData.senderId}
//             onChange={handleInputChange}
//             className="w-2/3  mb-2 mt-2"
//           />
//         </div> */}
//         <div className="flex flex-col">
//           <label>Receiver ID:</label>
//           <input
//             type="text"
//             name="receiverId"
//             value={formData.receiverId}
//             onChange={handleInputChange}
//             className="w-1/4 h-10 mb-2 mt-2 "
//           />
//         </div>
//         <div className="w-full mt-4 flex flex-col">
//           <p className="capitalize text-bold font-semibold">User Type</p>
//           <select name="" id="" className="w-1/4 h-9 mt-2">
//             User Type
//           </select>
//         </div>
//         <div className="  items-start">
//           <p className="text-bold font-semibold mt-6 mb-2">Amount:</p>
//           <TextField
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleInputChange}
//             className="w-1/4  mb-2 mt-2 bg-white"
//             inputProps={{
//               style: {
//                 height: "3px",
//               },
//             }}
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-4 py-3 bg-themeColor texl-sm rounded-md text-white font-bold"
//         >
//           Transfer Funds
//         </button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };
// export default AddMainBalance;
