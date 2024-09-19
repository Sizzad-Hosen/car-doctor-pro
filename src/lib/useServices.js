"use-client"
import { useState, useEffect } from 'react';

const useServicesDetails = (id) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services/api/get/${id}`);
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

  return { service, loading };
};

export default useServicesDetails;
