import Image from 'next/image';
import React from 'react';

const BlogAndReviewSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">Our Blog & Reviews</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Section */}
          <div className="col-span-2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Latest Blog Posts</h3>
            <div className="space-y-6">
              {/* Blog Post 1 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold text-blue-600 mb-2">5 Essential Car Maintenance Tips</h4>
                <p className="text-gray-700">
                  Keeping your car in top condition requires regular maintenance. Here are five essential tips to ensure your car runs smoothly...
                </p>
                <a href="#" className="text-blue-500 hover:underline mt-4 inline-block">Read more</a>
              </div>
              {/* Blog Post 2 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold text-blue-600 mb-2">How to Choose the Right Mechanic</h4>
                <p className="text-gray-700">
                  Choosing a reliable mechanic is crucial for the longevity of your vehicle. Learn how to find a trusted professional...
                </p>
                <a href="#" className="text-blue-500 hover:underline mt-4 inline-block">Read more</a>
              </div>
              {/* Blog Post 3 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold text-blue-600 mb-2">Understanding Car Diagnostics</h4>
                <p className="text-gray-700">
                  Car diagnostics can seem complicated, but they're essential for identifying potential issues early on. Here's what you need to know...
                </p>
                <a href="#" className="text-blue-500 hover:underline mt-4 inline-block">Read more</a>
              </div>
            </div>
          </div>

          {/* Customer Satisfaction Reviews */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Customer Satisfaction</h3>
            <div className="space-y-6">
              {/* Review 1 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-700">
                  "Car Doctor Pro provided exceptional service! My car has never run better. Highly recommend them!"
                </p>
                <div className="mt-4 flex items-center">
                  <Image
                    width={50}
                    height={50}
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                    alt="Customer 1"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">John Doe</p>
                    <p className="text-sm text-gray-500">Regular Customer</p>
                  </div>
                </div>
              </div>
              {/* Review 2 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-700">
                  "The team at Car Doctor Pro is amazing! They diagnosed and fixed my car's issue in no time."
                </p>
                <div className="mt-4 flex items-center">
                  <Image
                    width={50}
                    height={50}
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                    alt="Customer 2"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">Jane Smith</p>
                    <p className="text-sm text-gray-500">Satisfied Customer</p>
                  </div>
                </div>
              </div>
              {/* Review 3 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-700">
                  "Great service and friendly staff! I trust Car Doctor Pro with all my car needs."
                </p>
                <div className="mt-4 flex items-center">
                  <Image
                    width={50}
                    height={50}
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                    alt="Customer 3"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">Emily Johnson</p>
                    <p className="text-sm text-gray-500">Happy Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogAndReviewSection;
