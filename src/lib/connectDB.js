
const { MongoClient, ServerApiVersion } = require('mongodb');

let db;

const connectDB = async () => {
  if (db) return db; 

  try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iynsonj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    // const uri = process.env.MONGODB_URL
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect(); 
// database name and create it
    db = client.db("car-doctor-pro");
    console.log("Connected to MongoDB successfully");
    return db;

  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Failed to connect to the database"); 
  }
};

export default connectDB;
