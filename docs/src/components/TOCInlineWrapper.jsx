import React, { useEffect } from "react";
import TOCInline from "@theme/TOCInline";
import addEnumeration from "../js/utility";

const TOCInlineWrapper = ({ toc, numbered = false }) => {
  if (numbered) toc = addEnumeration(toc);

  return (
    <>
      <h2>Table of Contents</h2>
      <TOCInline toc={toc} />
    </>
  );
};

export default TOCInlineWrapper;
