import React from "react";
import _, { sumBy } from "lodash";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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
  const groupByLength = _.groupBy(filterByCode, "length");

  const filterByFullWidth10 = _.filter(filterByCode, { length: 10 });
  const filterByFullWidth12 = _.filter(filterByCode, { length: 12 });
  const filterAnother = _.filter(
    filterByCode,
    (each) => each.length !== 10 && each.length !== 12
  );

  const filterAnotherByWidth = _.groupBy(
    _.filter(filterAnother, (each) => each.amount && each.amount > 0),
    "length"
  );

  console.log("filterAnotherByWidth", filterAnotherByWidth);
  return (
    <div>
      <div className='my-2'>
        <div className='flex'>
          <div className='w-full lg:w-1/2'>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      ความยาว
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      ปริมาณ (เส้น)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_.map(groupByLength, (each, index) => (
                    <TableRow>
                      <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                        {index}
                      </TableCell>
                      <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                        {sumBy(each, "amount")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <div>
        <div className='font-semibold my-2'>ตัดขนาดพอดี</div>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  ขนาด
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  ปริมาณ (เส้น)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  10 เมตร
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {_.sumBy(filterByFullWidth10, "amount")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  12 เมตร
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {_.sumBy(filterByFullWidth12, "amount")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  เศษเหลือ{" "}
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {_.map(filterAnotherByWidth, (each, index) => (
                    <div>
                      <div>
                        ความยาว {index} เมตร : ปริมาณ{" "}
                        {_.sumBy(each, "amount") || 0} เส้น {"    "} ความยาว{" "}
                        {_.sumBy(each, "amount") * index} เมตร
                      </div>
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <div className='font-semibold my-2'>เศษเหลือจากการตัด</div>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  ขนาด
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  ปริมาณเส้นเหล็กที่ต้องใช้
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  ปริมาณที่เหลือจาก
                  <br /> 10 ม.
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  ปริมาณที่เหลือจาก
                  <br /> 12 ม.
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(filterAnotherByWidth, (each, index) => (
                <TableRow>
                  <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                    {index}
                  </TableCell>{" "}
                  <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                    {_.sumBy(each, "amount")} เส้น
                  </TableCell>
                  <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                    {10 - index} ม. x {_.sumBy(each, "amount")} เส้น
                  </TableCell>{" "}
                  <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                    {12 - index} ม. x {_.sumBy(each, "amount")} เส้น
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default StructureAnalyzeBox;
