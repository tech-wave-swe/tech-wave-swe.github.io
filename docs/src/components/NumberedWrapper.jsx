import React, { useEffect } from "react";

const NumberedWrapper = ({ children, toc }) => {
  useEffect(() => {
    toc.map((item) => {
      const element = document.getElementById(item.id);
      element.innerHTML = item.value;
    });
  }, [toc]);

  return <>{children}</>;
};

export default NumberedWrapper;
