export const useServices = async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services/api/getall`);
    const services = await res.json();
    console.log('string is passs',services);
  
    return services;
  
  }
  
  
  
export const useServicesDetails = async (id)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services/api/${id}`);
    const service = await res.json();
    console.log('string is passs',service);
  
    return service;
  
  }
  
  
  