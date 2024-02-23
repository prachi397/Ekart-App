import React from "react";
import "./CircularLoader.css";
import { ProgressSpinner } from "primereact/progressspinner";

export default function CircularLoader(props) {
  const { size, message, fontSize, height, loaderAlign } = props;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: loaderAlign ? loaderAlign : "center",
        alignItems: "center",
        margin: "auto",
        height: height ? height : "auto",
      }}
    >
      <div className="card flex justify-content-center">
        <ProgressSpinner />
      </div>
      &nbsp;
      <span style={{ fontSize: '22px',marginTop:'-20px',color:'#fff' }}>
        {message ? message : ""}
      </span>
    </div>
  );
}
