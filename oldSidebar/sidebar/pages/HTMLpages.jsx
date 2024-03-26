import React, { useState, useEffect } from "react";

const HTMLpages = ({ sidebarIsOpen }) => {
  const [selectedHtml, setSelectedHtml] = useState(null);
  const [htmlCode, setHtmlCode] = useState("");
  const [screenshot, setScreenshot] = useState("");

  useEffect(() => {
    fetch("./genereradeAnnonser/pilot1.html")
      .then((response) => response.text())
      .then((data) => {
        setHtmlCode(data);
      });
  }, []);
  useEffect(() => {
    if (htmlCode) {
      // Only run if htmlCode is not an empty string
      fetch("http://localhost:3001/screenshot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html: htmlCode }),
      })
        .then((response) => response.text())
        .then((data) => {
          setScreenshot(`data:image/png;base64,${data}`);
        });
    }
  }, [htmlCode]);

  console.log("Sidebar open? ", sidebarIsOpen);

  return (
    <div
      style={{
        marginLeft: sidebarIsOpen ? "290px" : "80px",
        transition: "margin-left 0.5s ease-out",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src={screenshot}
            alt="Thumbnail comming ..."
            onClick={() =>
              setSelectedHtml(selectedHtml === screenshot ? null : screenshot)
            }
            style={{
              width: 100,
              height: 150,
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
        </div>

        <div>
          {selectedHtml && (
            <img
              src={selectedHtml}
              style={{ objectFit: "contain" }}
              width={800}
              height={600}
              alt="Selected HTML"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HTMLpages;
