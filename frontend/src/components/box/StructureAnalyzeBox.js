import React from "react";
import _ from "lodash";

function StructureAnalyzeBox({ strcutureCode, beamList }) {
  const filterOnlyWidthLevel = _.filter(
    beamList,
    (each) => each.widthLevel === true
  );

  const filterByCode = _.filter(
    filterOnlyWidthLevel,
    (each) => each.structure[strcutureCode] !== null
  );

  console.log("Filter By Code", filterByCode);
  return <div>StructureAnalyzeBox</div>;
}

export default StructureAnalyzeBox;
