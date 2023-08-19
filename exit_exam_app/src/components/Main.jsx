import React from "react";

import Header from "./Header";

const Main = (props) => {
  return (
    <>
      <Header />
      {props.child}
    </>
  );
};

export default Main;
