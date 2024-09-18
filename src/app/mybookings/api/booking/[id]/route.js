import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
  try {
    const { id } = params; 
    const db = await connectDB();
    const bookingCollection = db.collection('booking');


    const deleteResult = await bookingCollection.deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount === 1) {
      return new Response(JSON.stringify({ message: "Successfully deleted", deleteResult }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete booking' }), { status: 500 });
  }
};


export const PATCH = async (request, { params }) => {
  try {
    const { id } = params;
    const updateBooking = await request.json();

    const db = await connectDB();
    const bookingCollection = db.collection('booking');

    const resp = await bookingCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set:{

          ...updateBooking,

        }
      },
      {
        upsert: true,
      }
    );


    

    return new Response(JSON.stringify({ message: "Successfully updated", data: resp }), { status: 200 });

  } catch (error) {
    console.error('Error updating booking:', error);
    return new Response(JSON.stringify({ error: 'Failed to update booking' }), { status: 500 });
  }
}






export const GET = async (request, {params})=> {
  try {
    const db = await connectDB();
    const bookingCollection = db.collection('booking');
  
    const resp = await bookingCollection.findOne({_id : new ObjectId(params.id)})
    
    return Response.json({message: "data found",data: resp});

  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
}
