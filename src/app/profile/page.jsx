"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const ProfilePage = ({ params }) => {
  const { data: session, status } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Load user data from the API
  const load = async () => {
    try {
      const res = await fetch(`http://localhost:3000/profile/api/${session?.user?.email}`);
      if (!res.ok) throw new Error("Failed to fetch user data");
      const data = await res.json();
      setUserData(data.user);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session && status === "authenticated") {
      load();
    }
  }, [session, status]);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const file = form.image.files[0];

    let base64Image = "";
    if (file) {
      base64Image = await toBase64(file);
    }

    const updatedUser = {
      name,
      email,
      _id: userData?._id,
      image: base64Image || userData?.image,
    };

    try {
      const resp = await fetch(`http://localhost:3000/profile/api/${userData?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!resp.ok) {
        throw new Error(`Error: ${resp.statusText}`);
      }

      const data = await resp.json();
      setUserData(data.user);
      setSuccess("Profile updated successfully!");
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-10 items-center mt-10">
      <div className="flex flex-col items-center">
        <div className="avatar mb-4">
          <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              alt="Profile Picture"
              width={96}
              height={96}
              src={userData?.image || "/default-avatar.png"}
              className="rounded-full"
            />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold">{userData?.name}</h2>
          <p className="text-gray-500">{userData?.email}</p>
        </div>

        {session && (
          <div className="mt-6">
            <button
              onClick={handleOpenModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Edit Profile"
        className="bg-white p-8 rounded-lg shadow-lg w-96 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={userData?.name}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={userData?.email}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>

        {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </Modal>
    </div>
  );
};

export default ProfilePage;
