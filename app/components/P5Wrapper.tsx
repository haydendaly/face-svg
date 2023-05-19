import { useEffect } from "react";

const P5Wrapper = ({ sketch }) => {
  useEffect(() => {
    const p5 = require("p5");
    new p5(sketch, window.document.getElementById("p5-container"));

    return () => {
      try {
        p5.remove();
      } catch (e) {
        console.log(e);
      }
    };
  }, [sketch]);

  return <div id="p5-container" />;
};

export default P5Wrapper;
