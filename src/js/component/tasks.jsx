import propTypes from "prop-types";
import React from "react";

export const Tasks = ({ ...props }) => {
  return (
    <div className="details">
      {props.line}
    
    </div>
  );
};

Tasks.prototype = {
  line: propTypes.text,
  btn: propTypes.func,
};
