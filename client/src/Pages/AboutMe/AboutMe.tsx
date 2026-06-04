import { useState, useEffect } from "react";
import ProgressionMeter from "../../Components/ProgressionMeter/PogressionMeter";
import Layout from "../../Components/Layout/Layout";
import type { Section } from "../../Helpers/Section.ts";
import HighSchool from "./RenderContent/HighSchool";
import ObsidianViewer from "../../Components/ObsidianViewer/ObsidianViewer";
import Interests from "./RenderContent/Interests";
import AboutMeIntro from "./RenderContent/AboutMeIntro";

const AboutMe = () => {
  const [fadingIn, setFadingIn] = useState<boolean>(false);

  const sections: Section[] = [
    {
      id: "aboutmeintro",
      title: "Introduction",
      color: "rgb(211, 192, 54)",
      innnerContent: AboutMeIntro(),
    },
    {
      id: "interests",
      title: "Interests & Hobbies",
      color: "rgb(93, 23, 23)",
      innnerContent: Interests(),
    },
    {
      id: "highschool",
      title: "High School / Early Years",
      color: "rgb(211, 192, 54)",
      innnerContent: HighSchool(),
    },
  ];

  useEffect(() => {
    setFadingIn(true);
    const timeout = setTimeout(() => setFadingIn(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout>
      <div className={`${fadingIn ? "fade-in" : ""}`}>
        <ProgressionMeter sections={sections} />
        <div className="flex justify-center">
          <ObsidianViewer />
        </div>
      </div>
    </Layout>
  );
};

export default AboutMe;
