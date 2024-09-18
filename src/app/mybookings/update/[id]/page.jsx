"use client";
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const UpdatedPage = ({ params }) => {
  const { data: sessionData } = useSession();
  const [booking, setBooking] = useState([]);
 

  const loadData = async () => {
    try {
      // ei api kaj get kore data ana defaultvalue te set kora usestate diywe
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mybookings/api/booking/${params.id}`);
      if (!resp.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await resp.json();
   

      setBooking(jsonData.data);
     
    } catch (error) {
      console.error('Error loading data:', error);
   
    }
  };

  useEffect(() => {


    loadData();


  }, [params.id]);

  const handleUpdated = async (e) => {
    e.preventDefault();
    const updateBooking = {
      date: e.target.date.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
    };

    try {

      // updated api
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mybookings/api/booking/${params.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateBooking),
      });
      const jsonData = await resp.json();
   
      
      if (resp.ok) {
        setBooking(jsonData.data);
        e.target.reset();

        Swal.fire({
          position: "top",
          icon: "success",
          title: "Successfully updated the booking",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Failed to update the booking",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Error occurred while updating",
        showConfirmButton: true,
      });
    }
  };

  

  return (
    <div className="text-gray-900 bg-slate-100 mx-auto container p-4">
      <h2 className="text-4xl text-center text-orange-400 m-3 font-semibold">Updated Form</h2>


      <form onSubmit={handleUpdated} className="bg-white p-6 rounded-lg shadow-md w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={sessionData?.user?.name || ''}
              className="mt-1 block w-full py-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={sessionData?.user?.email || ''}
              className="mt-1 block w-full py-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="address"
              name="address"
              rows="3"
              defaultValue={booking.address || ''}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              defaultValue={booking.phone || ''}
              className="mt-1 py-3 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              defaultValue={booking.date || ''}
              className="mt-1 block w-full py-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="duePrice" className="block text-sm font-medium text-gray-700">Due Price</label>
            <input
              type="text"
              id="duePrice"
              name="duePrice"
              defaultValue={booking.servicePrice || ''}
              className="mt-1 block w-full py-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatedPage;
