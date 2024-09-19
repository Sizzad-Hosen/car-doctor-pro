"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Checkout = ({ params }) => {
  const { id } = params;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services/api/${id}`);
        const data = await res.json();
        setService(data.service); 
      } catch (error) {
        console.error('Error fetching service details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  if (loading) {
    return <p>Loading service details...</p>;
  }

  if (!service) {
    return <p>No service found.</p>;
  }

  const { title, price, img, _id } = service;

  const handleBooking = async (event) => {
    event.preventDefault();
    const newBooking = { 
      email: event.target.email.value,
      name: event.target.name.value,
      address: event.target.address.value,
      phone: event.target.phone.value,
      date: event.target.date.value,
      serviceTitle: title,
      serviceImg:img,
      serviceID: _id,
      servicePrice: price,
    };

    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/api/new-booking`, {
        method: 'POST',
        body: JSON.stringify(newBooking),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await resp.json();
      if (resp.ok) {
        toast.success(response?.message || "Order confirmed successfully!");
      } else {
        toast.error(response?.message || "Failed to confirm the order.");
      }
      event.target.reset();
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error("Failed to create booking.");
    }
  };

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className="relative h-72">
        <Image
          className="absolute h-72 w-full left-0 top-0 object-cover"
          src={img}
          alt="service"
          width={1920}
          height={1080}
          style={{ width: "90vw" }}
        />
        <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
          <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
            Checkout {title}
          </h1>
        </div>
      </div>
      <div className="my-12 bg-slate-300 p-12">
        <form onSubmit={handleBooking}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input type="date" name="date" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due amount</span>
              </label>
              <input type="text" name="price" defaultValue={price} readOnly className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input type="tel" name="phone" placeholder="Your Phone" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Present Address</span>
              </label>
              <input type="text" name="address" placeholder="Your Address" className="input input-bordered" required />
            </div>
          </div>
          <div className="form-control mt-6">
            <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
