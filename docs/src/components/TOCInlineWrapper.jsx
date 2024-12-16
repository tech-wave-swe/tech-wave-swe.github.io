import React from "react";
import TOCInline from "@theme/TOCInline";

const TOCInlineWrapper = ({ toc }) => {
	return (
		<>
			<h2>Table of Contents</h2>
			<TOCInline toc={toc} />
		</>
	);
};

export default TOCInlineWrapper;
