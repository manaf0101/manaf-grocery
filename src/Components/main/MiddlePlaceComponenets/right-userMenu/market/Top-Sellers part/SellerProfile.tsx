import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";

function SellerProfile () {
    return (
        <>
        <div className="h-20">
        <CircularProgressbarWithChildren
        className="h-20"
        value={100}
        strokeWidth={2}
        styles={buildStyles({
          pathColor: "#f00",
          trailColor: "arent",
        })}
      >
        {/*
          Width here needs to be (100 - 2 * strokeWidth)% 
          in order to fit exactly inside the outer progressbar.
        */}
        <div style={{ width: "90%" }}>
          <CircularProgressbar
          className="h-20"
            value={100}
            styles={buildStyles({
              trailColor: "transparent",
            })}
          />
        </div>
      </CircularProgressbarWithChildren>
        </div>
        </>
    )
}

export default SellerProfile