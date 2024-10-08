 "use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services/api/getall`);
      const data = await res.json();
      setServices(data.services); // Assuming the response is { services: [...] }
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false); // Set loading to false even if an error occurs
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return <p className='text-center text-red-400'>Loading services...</p>;
  }

  return (
    <div id="service" className="mt-4 bg-gray-100 text-gray-900">
      <div className="text-center">
        <h2 className="text-4xl text-orange-500 p-2 pb-5">Services</h2>
        <h2 className="text-5xl pb-4">Our Services Area</h2>
        <p>
          The majority have suffered alteration in some form, <br /> by
          injected humour, or randomised words which do not <br /> look even
          slightly believable.
        </p>

        <div className="grid p-2 m-2 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
          {services?.length > 0 &&
            services.map((service) => (
              <div key={service._id} className="card card-compact bg-base-100 w-96 shadow-xl">
                <figure>
                  <Image
                    src={service.img}
                    alt={service.title}
                    width={400}
                    height={300}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{service.title}</h2>

                  <div className="card-actions justify-between">
                    <p className="text-3xl">${service.price}</p>
                    <Link href={`/services/${service._id}`}>
                      <button className="btn btn-primary hover:bg-slate-600">
                        View details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
