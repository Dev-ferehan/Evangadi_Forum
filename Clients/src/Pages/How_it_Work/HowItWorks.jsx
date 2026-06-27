import React, { useState, useEffect } from "react";
import classes from "./Documentation.module.css";
import { IoChevronBackCircleSharp } from "react-icons/io5";

const HowItWorks = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/how-it-works.txt")
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error("Error fetching file:", err));
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.docHeader}>
        <a href={'/'}
        >
          <IoChevronBackCircleSharp />
        </a>
        <h2 className={classes.title}>How It Works</h2>
      </div>

      {content ?
        <div className={classes.docContent}>{content}</div>
      : <div className={classes.loading}>Loading documentation...</div>}
    </div>
  );
};

export default HowItWorks;
