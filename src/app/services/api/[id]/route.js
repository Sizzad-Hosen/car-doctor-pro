

import connectDB from "@/lib/connectDB";

export const GET = async (request, {params})=> {
  try {
    const db = await connectDB();
    const servicesCollection = db.collection('services');
  
    const service = await servicesCollection.findOne({_id :params.id});
    
    return Response.json({ service });

  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
}
