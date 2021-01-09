import React from "react";

const Bookmark = (props) => {
  let classes = "fa fa-bookmark";
  if (!props.isBookmarked) classes += "-o";
  return (
    <i
      onClick={props.onClick}
      className={classes}
      aria-hidden="true"
      style={{ cursor: "pointer", color: "red" }}
    ></i>
  );
};

export default Bookmark;
