import React from "react";
import _ from "lodash";
import findImageOfStructure from "../../utils/findImageOfStructure";

function StructureIllustrator({ beamStructure, jacketAmount }) {
  const unNullStructure = [];
  const { db12, db16, db20, db25 } = beamStructure;
  const jacketAmoutNumber = parseInt(jacketAmount, 10);

  if (db12) {
    unNullStructure.push({ name: "db12", amount: db12 });
  }
  if (db16) {
    unNullStructure.push({ name: "db16", amount: db16 });
  }
  if (db20) {
    unNullStructure.push({ name: "db20", amount: db20 });
  }
  if (db25) {
    unNullStructure.push({ name: "db25", amount: db25 });
  }

  console.log("Un Null Structure", unNullStructure);
  const take2UnNull = _.take(unNullStructure, 2);

  return (
    <div>
      {_.map(take2UnNull, (item, index) => (
        <div key={index}>
          <div>
            {index % 2 === 0 && (
              <div className='my-2 text-center'>
                {item.amount} {_.upperCase(item.name)}
              </div>
            )}
            <img
              src={findImageOfStructure(jacketAmoutNumber, item.amount)}
              alt={`${item.amount} ${_.upperCase(item.name)}`}
              style={{
                transform: index % 2 === 0 ? "rotate(180deg)" : "rotate(0deg)",
              }}
              className='w-48'
            />{" "}
            {index % 2 === 1 && (
              <div className='my-2 text-center'>
                {item.amount} {_.upperCase(item.name)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StructureIllustrator;
