import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "The first title",
//     image:
//       "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
//     address: "some address and some city",
//     description: "This is first Meetups",
//   },
//   {
//     id: "m2",
//     title: "The second title",
//     image:
//       "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
//     address: "some address and some city",
//     description: "This is first Meetups",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React Meetups!! "/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

//Pre-generating page or data dynamically after deployment on the server
// export async function getServerSideProps(context){
// const req = context.req;
// const res = context.res;

// //fetch data from an API
// //this code only runs on the server
// return {
//     props:{
//         meetups: DUMMY_MEETUPS,
//     },
// }
// }

//for pre-generating page or data after certain seconds after deployment on the server
export async function getStaticProps() {
  // fetch data from API or have secure Database connection
  const client = await MongoClient.connect(
    "mongodb+srv://roshandalami0:LearnMongo@cluster0.hzflmgc.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
