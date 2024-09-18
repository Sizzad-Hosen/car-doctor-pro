import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
 


export const GET = async (request, { params }) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection('users');

   
    const { email } = params; 

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Data found',user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};




export const PUT = async (request) => {
  try {
    const updatedUser = await request.json();
    const { _id, name, email, image } = updatedUser; 

    const db = await connectDB();

    if (!_id || !ObjectId.isValid(_id)) {
      return new Response(
        JSON.stringify({ message: 'Invalid user ID' }),
        { status: 400 }
      );
    }

    const objectId = new ObjectId(_id);

   
    const updateDoc = {
      $set: {
        name: name || '', 
        email: email || '', 
        image: image || '', 
      },
    };


    const result = await db.collection('users').updateOne(
      { _id: objectId },
      updateDoc,
      { upsert: true } 
    );

   
    if (result.modifiedCount === 1 || result.upsertedCount === 1) {
      const user = await db.collection('users').findOne({ _id: objectId });

      return new Response(
        JSON.stringify({ message: 'Profile updated successfully', user }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: 'Failed to update user data' }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    return new Response(
      JSON.stringify({ message: 'Something went wrong', error: error.message }),
      { status: 500 }
    );
  }
};
