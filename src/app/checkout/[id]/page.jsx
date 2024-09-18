"use client";
import Swal from 'sweetalert2'
import { useServicesDetails } from '@/lib/useServices';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const CheckoutPage = ({ params }) => {
  const { data } = useSession();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (params.id) {
        try {
          setLoading(true);
          const response = await useServicesDetails(params.id);
          setService(response.service);
        } catch (error) {
          console.error('Error fetching service details:', error);
          setError('Failed to load service details');
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, [params.id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const newBooking = {
      name: data?.user?.name,
      email: data?.user?.email,
      date: e.target.date.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      servicePrice :service?.price,
      serviceId: service?._id,
      serviceTitle: service?.title,
      serviceImg:service?.img,

    };
    console.log('New Booking:', newBooking);
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/api/new-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      });
      console.log(resp);


      if (resp.ok) {
        Swal.fire({
            position: "top",
            icon: "success",
            title: "Sucessfully added to the bookmark",
            showConfirmButton: false,
            timer: 1500
          });
      }

    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to confirm booking');
    }



  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="text-gray-900 bg-slate-100 mx-auto container p-4">
      <div className="carousel w-full h-[600px] mb-6">
        <div id="slide1" className="carousel-item relative w-full">
          <Image
            width={800}
            height={100}
            alt="Service Image"
            src={service?.img || '/default-image.jpg'}
            className="w-full rounded-xl"
          />
        </div>
      </div>

      <form onSubmit={handleBooking} className="bg-white p-6 rounded-lg shadow-md w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={data?.user?.name || ''}
              className="mt-1 block w-full py-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={data?.user?.email || ''}
              className="mt-1 block w-full py-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="address"
              name="address"
              rows="3"
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
              defaultValue={service?.price || ''}
              className="mt-1 block w-full py-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
