import React from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import _ from "lodash";
import StructureIllustrator from "../box/StructureIllustrator";

function BeamListTable({ project }) {
  const calculateTotal = (structureCode, typeCode = "structure") => {
    return _.sum(
      _.map(project.beams, (each) =>
        each.beamLevel ? 0 : each[typeCode][structureCode]
      )
    );
  };

  const currencyFormatter = new Intl.NumberFormat("th", {
    style: "decimal",
    currency: "THB",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const decimalFormatter = new Intl.NumberFormat("th", {
    style: "decimal",
    currency: "THB",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });

  return (
    <div>
      <Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size='small'>
            <TableHead>
              <TableRow sx={{ border: "gray" }}>
                <TableCell
                  rowSpan={2}
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                >
                  <div className='font-semibold text-center'>คาน</div>
                </TableCell>
                <TableCell
                  rowSpan={2}
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                >
                  <div className='font-semibold text-center'>ยาว</div>
                </TableCell>
                <TableCell
                  colSpan={2}
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                >
                  <div className='font-semibold text-center'>ขนาดคาน</div>
                </TableCell>{" "}
                <TableCell
                  rowSpan={2}
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                >
                  <div className='font-semibold text-center'>
                    จำนวน <br /> (ชิ้น)
                  </div>
                </TableCell>
                <TableCell
                  colSpan={4}
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                >
                  <div className='font-semibold text-center'>
                    เหล็กโครงสร้าง (ม.)
                  </div>
                </TableCell>{" "}
                <TableCell
                  colSpan={4}
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                >
                  <div className='font-semibold text-center'>
                    เหล็กโครงสร้าง (เส้น)
                  </div>
                </TableCell>{" "}
                <TableCell
                  colSpan={2}
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                >
                  <div className='font-semibold text-center'>
                    เหล็กปลอก (ม.)
                  </div>
                </TableCell>
                <TableCell
                  colSpan={2}
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                >
                  <div className='font-semibold text-center'>
                    เหล็กปลอก (เส้น)
                  </div>
                </TableCell>{" "}
                <TableCell
                  rowSpan={2}
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                >
                  <div className='font-semibold text-center'>จำนวนปลอก</div>
                </TableCell>
                <TableCell
                  rowSpan={2}
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                >
                  <div className='font-semibold text-center'>@</div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  กว้าง
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  ยาว
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  DB12
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  DB16
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  DB20
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  DB25
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  DB12
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  DB16
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  DB20
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  DB25
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  RB6
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  RB9
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  RB6
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  RB9
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!_.isEmpty(project.beams) ? (
                _.map(project.beams, (row, index) => (
                  <TableRow
                    key={index}
                    sx={
                      row.beamLevel
                        ? {
                            backgroundColor: "#f5f5f5",
                          }
                        : {
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }
                    }
                  >
                    {row.beamLevel && (
                      <TableCell
                        sx={{ border: 1, borderColor: "#dcdcdc" }}
                        rowSpan={_.size(row.width_list) + 1}
                      >
                        {row.name}
                        <div className='w-24'>
                          <StructureIllustrator
                            beamStructure={row.structure}
                            jacketAmount={row.casting_amount}
                          />
                        </div>
                      </TableCell>
                    )}
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      <div className='font-semibold'>
                        {row.beamLevel ? "" : row.length}
                      </div>
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {row.beamLevel ? row.width : ""}
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {row.beamLevel ? row.length : ""}
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {row.beamLevel ? "" : row.amount}
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {row.structure ? row.structure.db12 : ""}
                    </TableCell>{" "}
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {row.structure ? row.structure.db16 : ""}
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {row.structure ? row.structure.db20 : ""}
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {row.structure ? row.structure.db25 : ""}
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      <div className='font-semibold'>
                        {!row.beamLevel
                          ? decimalFormatter.format(
                              row.structure.db12 / row.length
                            )
                          : ""}
                      </div>
                    </TableCell>{" "}
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      <div className='font-semibold'>
                        {!row.beamLevel
                          ? decimalFormatter.format(
                              row.structure.db16 / row.length
                            )
                          : ""}
                      </div>
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      <div className='font-semibold'>
                        {!row.beamLevel
                          ? decimalFormatter.format(
                              row.structure.db20 / row.length
                            )
                          : ""}
                      </div>
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      <div className='font-semibold'>
                        {!row.beamLevel
                          ? decimalFormatter.format(
                              row.structure.db25 / row.length
                            )
                          : ""}
                      </div>
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {row.casing ? row.casing.rb6 : ""}
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {row.casing ? row.casing.rb9 : ""}
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {row.casing
                        ? decimalFormatter.format(row.casing.rb6 / row.length)
                        : ""}
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {row.casing
                        ? decimalFormatter.format(row.casing.rb9 / row.length)
                        : ""}
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {row.beamLevel ? row.casting_amount : ""}
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {row.beamLevel ? row.at : ""}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className='text-center'>ไม่มีข้อมูล</div>
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                >
                  <div className='font-semibold'>รวม</div>
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    calculateTotal("db12", "structure")
                  )}
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    calculateTotal("db16", "structure")
                  )}
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    calculateTotal("db20", "structure")
                  )}
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    calculateTotal("db25", "structure")
                  )}
                </TableCell>
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>{" "}
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>{" "}
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(calculateTotal("rb6", "casing"))}
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(calculateTotal("rb9", "casing"))}
                </TableCell>
              </TableRow>{" "}
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                >
                  <div className='font-semibold'>จำนวนเส้น</div>
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    calculateTotal("db12", "structure") / 12
                  )}
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    calculateTotal("db16", "structure") / 12
                  )}
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    calculateTotal("db20", "structure") / 12
                  )}
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    calculateTotal("db25", "structure") / 12
                  )}
                </TableCell>
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>{" "}
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    calculateTotal("rb6", "casing") / 10
                  )}
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    calculateTotal("rb9", "casing") / 10
                  )}
                </TableCell>
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>
              </TableRow>{" "}
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                >
                  <div className='font-semibold'>คิดเผื่อ 20%</div>
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    ((calculateTotal("db12", "structure") / 12) * 120) / 100
                  )}
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    ((calculateTotal("db16", "structure") / 12) * 120) / 100
                  )}
                </TableCell>{" "}
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    ((calculateTotal("db20", "structure") / 12) * 120) / 100
                  )}
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    ((calculateTotal("db25", "structure") / 12) * 120) / 100
                  )}
                </TableCell>
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>{" "}
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    ((calculateTotal("rb6", "casing") / 10) * 120) / 100
                  )}
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                  {currencyFormatter.format(
                    ((calculateTotal("rb9", "casing") / 10) * 120) / 100
                  )}
                </TableCell>
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>{" "}
                <TableCell
                  sx={{ border: 1, borderColor: "#dcdcdc" }}
                ></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default BeamListTable;
