

import connectDB from "@/lib/connectDB";

export const GET = async ()=> {
  try {
    const db = await connectDB();
    const servicesCollection = db.collection('services');
  
    const services = await servicesCollection.find().toArray();
    
    return Response.json({ services });

  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
}
