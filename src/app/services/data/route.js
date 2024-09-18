import connectDB from "@/lib/connectDB";
import services from "@/lib/services";

export const GET = async () => {
  try {
    const db = await connectDB();
    const servicesCollection = db.collection('services');

  
    await servicesCollection.deleteMany();

   
    const result = await servicesCollection.insertMany(services);

   
    return new Response(JSON.stringify({ message: "Seed added successfully", insertedCount: result.insertedCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error inserting services:', error);
    return new Response(JSON.stringify({ error: 'Failed to insert services' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
