import React from "react";
import pdfFile from "./Mikael_Engvall.pdf";

const Ads = ({ sidebarIsOpen }) => {
  return (
    <div
      style={{
        marginLeft: sidebarIsOpen ? "270px" : "80px",
        transition: "margin-left 0.5s ease-out",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "110vh",
      }}
    >
      <iframe
        src={pdfFile}
        width="800px"
        height="800px"
        style={{ border: "none" }}
        title="PDF in an iFrame"
      ></iframe>
    </div>
  );
};

export default Ads;
