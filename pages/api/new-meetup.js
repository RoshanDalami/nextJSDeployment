import { MongoClient } from "mongodb";

//api/new-meetup

//often function is called handler
// POST  request  to this route api/new-meetup
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const {title , image , address, description} = data ;
    const client = await MongoClient.connect(
      "mongodb+srv://roshandalami0:LearnMongo@cluster0.hzflmgc.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();
    res.status(201).json({ message: "meetup inserted!!" });
  }
}

export default handler;
