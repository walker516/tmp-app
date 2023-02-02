import { Button } from "@mui/material";
import React from "react";

const Test = () => {
  const onTest = () => {
    console.log("this is test");
  };
  return (
    <div>
      <Button onClick={onTest}>TEST</Button>
    </div>
  );
};

export default Test;
