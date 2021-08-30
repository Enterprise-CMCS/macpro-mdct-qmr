import React from "react";
import { Link } from "react-router-dom";
import styles from "./Measure.module.css";

export default function Measure() {
  return (
    <>
      {/* Breadcrumbs are hard coded till we get real data to populate them */}
      <section className={styles.breadcrumbsMeasureContainer}>
        <div className={styles.breadcrumb}>
          <Link to='/'>Home</Link>
        </div>
        <div>{">"}</div>
        <div className={styles.breadcrumb}>State - Year</div>
        <div>{">"}</div>
        <div className={styles.breadcrumb}>
          <Link to='/coreset'>Sample Core Set</Link>
        </div>
        <div>{">"}</div>
        <div className={styles.breadcrumb}>Sample Measure / Form</div>
      </section>
      <h1>Measure Placeholder Page</h1>
    </>
  );
}
