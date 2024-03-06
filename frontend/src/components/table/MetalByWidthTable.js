import React from "react";
import _ from "lodash";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function MetalByWidthTable({ beamAndStrcutureList }) {
  const filterOnlyWidthLevel = _.filter(
    beamAndStrcutureList,
    (each) => each.widthLevel === true
  );

  const groupByLength = _.groupBy(filterOnlyWidthLevel, "length");

  const currencyFormatter = new Intl.NumberFormat("th", {
    style: "decimal",
    currency: "THB",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const nanFree = (data) => (isNaN(parseFloat(data)) ? "" : data);
  return (
    <div className='my-2'>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }} rowSpan={2}>
                <div className='font-semibold'>ความยาว</div>
              </TableCell>
              <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }} colSpan={4}>
                <div className='font-semibold'>เหล็กโครงสร้าง (ม.)</div>
              </TableCell>{" "}
              <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }} colSpan={2}>
                <div className='font-semibold'>เหล็กปลอก (ม.)</div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                <div className='font-semibold'>DB12</div>
                <div>12mm</div>
              </TableCell>{" "}
              <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                <div className='font-semibold'>DB16</div>
                <div>16mm</div>
              </TableCell>{" "}
              <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                <div className='font-semibold'>DB20</div>
                <div>20mm</div>
              </TableCell>{" "}
              <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                <div className='font-semibold'>DB25</div>
                <div>25mm</div>
              </TableCell>{" "}
              <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                <div className='font-semibold'>RB6</div>
                <div>6mm</div>
              </TableCell>{" "}
              <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                <div className='font-semibold'>RB9</div>
                <div>9mm</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(groupByLength, (eachGroup, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {index}
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {nanFree(
                    currencyFormatter.format(
                      _.sumBy(eachGroup, "structure.db12")
                    )
                  )}
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {nanFree(
                    currencyFormatter.format(
                      _.sumBy(eachGroup, "structure.db16")
                    )
                  )}
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {nanFree(
                    currencyFormatter.format(
                      _.sumBy(eachGroup, "structure.db20")
                    )
                  )}
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {nanFree(
                    currencyFormatter.format(
                      _.sumBy(eachGroup, "structure.db25")
                    )
                  )}
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {nanFree(
                    currencyFormatter.format(_.sumBy(eachGroup, "casing.rb6"))
                  )}
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {nanFree(
                    currencyFormatter.format(_.sumBy(eachGroup, "casing.rb9"))
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MetalByWidthTable;
