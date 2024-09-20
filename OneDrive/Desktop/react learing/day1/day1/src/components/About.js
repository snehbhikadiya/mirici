import React, { useState } from "react";

export default function About() {
  const [darkmode, setdarkmode] = useState({
    color: "white",
    backgroundColor: "black",
    border:"1px solid white"
  });
  const [btntext, setbtntext] = useState("white");

  let strongstyle = {
    backgroundColor: "black",
    color:"white",
  };

  const white = () => {
    if (darkmode.color === "white") {
      setdarkmode({
        color: "black",
        backgroundColor: "white",
      });
      setbtntext("dark");
    } else {
      setdarkmode({
        color: "white",
        backgroundColor: "black",
        border:"1px solid white"
      });
      setbtntext("white");
    }
  };

  return (
    <>
      <div className="container">
        <div className="accordion" id="accordionExample" style={darkmode}>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                style={darkmode}
              >
                Accordion Item #1
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body" style={darkmode}>
                <strong style={strongstyle}>
                  This is the first item's accordion body.
                </strong>{" "}
                It is shown by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables. It's also worth
                noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item" style={darkmode}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
                style={darkmode}
              >
                Accordion Item #2
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
              style={darkmode}
            >
              <div className="accordion-body" style={darkmode}>
                <strong style={strongstyle}>
                  This is the second item's accordion body.
                </strong>{" "}
                It is hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables. It's also worth
                noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <button type="button" class="btn btn-dark" onClick={white}>
          {btntext}
        </button>
      </div>
    </>
  );
}
