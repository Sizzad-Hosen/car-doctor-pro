"use client";

import React from 'react';
import Swal from 'sweetalert2';

const ContactSection = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const message = form.message.value;

    const newContactUser = {
      name,
      email,
      phone,
      message
    };

    console.log("newContactInfo", newContactUser);

    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/contact/api/contactuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContactUser),
      });

      const data = await resp.json();
      console.log(data);

      if (resp.ok) {
        form.reset(); // Reset the form

        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your message has been sent successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Failed to send your message. Please try again.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.log('Error:', error);

      Swal.fire({
        position: "top",
        icon: "error",
        title: "An error occurred. Please try again later.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">Contact Us</h2>

        <div className="flex flex-wrap -mx-4">
          {/* Contact Information */}
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Get In Touch</h3>
              <p className="mb-6 text-gray-600">
                Feel free to reach out to us with any questions or concerns. We're here to help with all your car care needs.
              </p>
              <ul className="text-gray-700">
                <li className="mb-4">
                  <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                  123 Car Doctor Blvd, Auto City, CA 12345
                </li>
                <li className="mb-4">
                  <i className="fas fa-phone-alt mr-2 text-blue-600"></i>
                  (123) 456-7890
                </li>
                <li className="mb-4">
                  <i className="fas fa-envelope mr-2 text-blue-600"></i>
                  contact@cardoctorpro.com
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
