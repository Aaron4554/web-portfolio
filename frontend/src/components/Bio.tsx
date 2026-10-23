import Ink from "./Ink";
import "./Bio.css";

function Bio() {
  return (
    <section id="bio" className="bio">
      <div className="bio__inner">
        <Ink className="bio__section">About me</Ink>
        <Ink className="bio__text">
          I'm an undergrad student at the University of Michigan working towards
          my B.S in Software Engineering.
        </Ink>
        <Ink className="bio__section">Work history</Ink>
        <Ink className="bio__text">
          I've served over five years in the Michigan Air National Guard as a
          Network Engineer and maintainer at the 272D Cyber Operations Squaron.
          Where my primary role is to buildand maintain the CVA/H weapon system.
          As well as engineer our commercial network; focusing on data backups,
          deployment servers, kickstart files, and creating/managing user
          accounts.
        </Ink>
        <Ink className="bio__text">
          I'm the current tressuruer intern for Google Developers Group on
          Campus. Assisting with reimbursments and event planning
        </Ink>
      </div>
    </section>
  );
}

export default Bio;
