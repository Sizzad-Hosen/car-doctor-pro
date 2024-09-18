import connectDB from "@/lib/connectDB";

export const POST = async (request) => {
  try {
    
    const booking = await request.json();


    const db = await connectDB();


    const bookingCollection = db.collection('booking');

 
    const newBooking = await bookingCollection.insertOne(booking);

    return new Response(JSON.stringify({ message: "Successfully added booking to collection" }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error adding booking:', error);

   
    return new Response(JSON.stringify({ error: 'Failed to add booking' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
