import { useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import PogressionMeter from "../../Components/ProgressionMeter/PogressionMeter";
import "./MyProjects.css"
const MyProjects = () => {
  const { section } = useParams();
  useEffect(() => {
    if (!section) {
      return;
    }

    const ele = document.getElementById(
      section.replace("-", "").replace(" ", "").toLowerCase()
    );
    if (ele) {
      ele.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [section]);
  return (
    <div className="experience">
      <Layout>
          <PogressionMeter />
      </Layout>
      </div>
  );
};

export default MyProjects;
