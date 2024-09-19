"use client";

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const MybookingPage = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (session?.user?.email) {
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mybookings/api/${session.user.email}`);
        const data = await resp.json();
        console.log(data);
        setBookings(data?.myBookings || []);
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    }
  };

  const handleDelete = async (id) => {

    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mybookings/api/booking/${id}`, {
            method: "DELETE",
          });

          if (resp.ok) {
            loadData();
            Swal.fire({
              title: "Deleted!",
              text: "Your booking has been deleted.",
              icon: "success"
            });
          } else {
            console.log("Failed to delete booking");
          }
        } catch (error) {
          console.log("Something went wrong during deletion", error);
        }
      } else {
        Swal.fire("Cancelled", "Your booking is safe :)", "error");
      }
    });
  };

  useEffect(() => {
    loadData();
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto'>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Service name</th>
              <th>Price</th>
              <th>Booking Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Rows */}
            {bookings.map((booking) => (
              <tr key={booking?._id}> {/* Ensure the key is unique */}
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          width={50}
                          height={50}
                          src={booking?.serviceImg || '/default-image.jpg'} 
                          alt="Service Image"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{booking?.serviceTitle}</div>
                    </div>
                  </div>
                </td>
                <td>{booking?.servicePrice}</td>
                <td>{booking?.date}</td>
                <th>
               <Link href={`/mybookings/update/${booking._id}`}>
              <button className="btn m-2 text-sm btn-ghos btn-xs">Edit</button>
                  
               </Link>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="btn text-sm btn-ghost bg-red-500 btn-xs"
                  >
                    Delete

                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MybookingPage;
