import React from "react";
import Emphasis from "../../Emphasis/Emphasis";
import "../PogressionMeter.css";
const Bethel = () => {
  return (
    <div>
      <h2>Student Developer/Internship</h2>
      <h2>Admissions Automation</h2>
      <p>
        Automated the weekly aggregation of Accuplacer, ACT, and SAT scores by
        integrating multiple vendor APIs into a scheduled Python background
        service, <Emphasis>supporting admissions processing for ~130 incoming freshmen
        annually.
        </Emphasis>
      </p>
      <p>
        Replaced a manual, hour-long workflow with <Emphasis>near-instant data delivery</Emphasis>,
         securely distributing validated results to the admissions team via
        internal email while handling sensitive student data in collaboration
        with Admissions and IT.
      </p>
      <h2>Employee Applicant App</h2>
      <p>
        Acted as sole developer on a prototype internal hiring application using
        React, .NET, and MySQL, modernizing a legacy employee recruitment
        system.
      </p>
      <p>
        Owned frontend, backend, and data modeling for the application while
        collaborating with IT stakeholders during development.
      </p>
    </div>
  );
};

export default Bethel;
