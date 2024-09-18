
import { useServices, useServicesDetails } from '@/lib/useServices';
import Image from 'next/image';
import Link from 'next/link';


const ServiceDetailsPage =async ({ params }) => {

  const {services} =await  useServices();
  const {service} =await  useServicesDetails(params.id);

 

    return (
        <div className='text-gray-900 bg-slate-100 container mx-auto'>
            <div>
                <div className="carousel w-full h-[600px]">
                    <div id="slide1" className="carousel-item relative w-full">
                        <Image width={1200} height={150} alt="image" src={service?.img} className="w-full rounded-xl" />
                    </div>
                </div>

                {/* services div */}
                <div>
                    <h2 className="text-4xl p-2 text-purple-400 text-center">Services</h2>
                    <div className='text-4xl'>
                        {
                            services?.map((service) => (
                                <button
                                  
                                    className="btn btn-wide btn-outline text-xl btn-accent"
                                    key={service.id}>{service.title}</button>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className='container mx-auto p-3'>
                <h2 className="text-4xl text-orange-600">{service?.title}</h2>
                <h2 className="text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa error quidem totam similique temporibus tenetur sapiente debitis sint accusamus nam odio fugit recusandae nulla est, perspiciatis nostrum. Incidunt, quas libero.</h2>
            </div>

            <div className='container pt-5 mx-auto flex flex-col md:flex-row lg:flex-row gap-2'>
                {
                    service?.facility?.map((facility, index) => (
                        <div key={index} className="card card-compact bg-primary shadow-xl p-4">
                            <h4 className="text-4xl text-slate-200">{facility.name}</h4>
                            <p>{facility.details}</p>
                        </div>
                    ))
                }

                <div>
                    <Image width={300} height={50} alt="image" src={service?.img} className="w-full rounded-xl" />
                    <h2 className="text-3xl font-semibold p-2 text-red-600">Price: ${service?.price}</h2>
                    <Link  href={`/checkout/${service._id}`}>

                    <button className="btn text-2xl btn-wide bg-purple-400 text-gray-800">Checkout</button>

                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsPage;
