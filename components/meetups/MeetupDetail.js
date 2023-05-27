import { Fragment } from "react";
import classes from './MeetupDetail.module.css'
function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
      <img
        src={props.image}
        alt={props.title}
      />
      <h1>{props.title}</h1>
      <h3>{props.address}</h3>
      <p>{props.description}</p>
    </section>
  );
}

export default MeetupDetail;
