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
    const { _id, name, email, image } = updatedUser; // Destructure the updated user data

    const db = await connectDB();

    // Check if the _id is valid and is a valid ObjectId
    if (!_id || !ObjectId.isValid(_id)) {
      return new Response(
        JSON.stringify({ message: 'Invalid user ID' }),
        { status: 400 }
      );
    }

    // Convert _id to ObjectId for MongoDB operations
    const objectId = new ObjectId(_id);

    // Prepare the update document
    const updateDoc = {
      $set: {
        name: name || '', // Provide default empty string if undefined
        email: email || '', // Provide default empty string if undefined
        image: image || '', // Provide default empty string if undefined
      },
    };

    // Update the user's profile in the database
    const result = await db.collection('users').updateOne(
      { _id: objectId },
      updateDoc,
      { upsert: true } // If no document is found, create a new one
    );

    // Check if the update was successful
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
