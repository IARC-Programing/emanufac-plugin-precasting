import api from "../config/api";
import {
  Button,
  LinearProgress,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
} from "@mui/material";
import { useHistory, useParams } from "react-router";
import _ from "lodash";

function DetailProject({
  helpingComponent: HelpingComponent,
  title,
  subtitle,
  React,
}) {
  const history = useHistory();
  const { useState, useEffect } = React;
  const [isReady, setIsReady] = useState(false);
  const [project, setProject] = useState();
  const params = useParams();

  const currencyFormatter = new Intl.NumberFormat("th", {
    style: "decimal",
    currency: "THB",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const getData = async () => {
    try {
      const result = await api.get(
        `${process.env.REACT_APP_API_URL}/plugin/pr/precast-project/${params.id}`
      );

      if (result.data) {
        console.log("Beams", result.data.beams);
        const beamList = _.reduce(
          result.data.beams,
          (acc, each) => {
            if (_.isArray(acc)) {
              acc.push({ ...each, beamLevel: true });
            } else {
              acc = [{ ...each, beamLevel: true }];
            }
            _.map(each.width_list, (eachWidth) => {
              acc.push({ ...eachWidth, beamLevel: false, widthLevel: true });
            });

            return acc;
          },
          []
        );
        setProject({ name: result.data.name, beams: beamList });
        setIsReady(true);
      }
    } catch (error) {
      console.error("Error on Data Fetching", error);
    }
  };

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  if (!isReady) {
    return <LinearProgress />;
  }

  const calculateTotal = (structureCode, typeCode = "structure") => {
    return _.sum(
      _.map(project.beams, (each) =>
        each.beamLevel ? 0 : each[typeCode][structureCode]
      )
    );
  };
  return (
    <div>
      <div className='flex justify-between'>
        <HelpingComponent.ViewTitle title={title} subtitle={subtitle} />
      </div>
      <HelpingComponent.BackButton />
      <div className='my-4'>
        <div className='font-semibold font-display text-xl'>{project.name}</div>
        <div className='my-4'>
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
                      colSpan={2}
                      sx={{ border: 1, borderColor: "#dcdcdc" }}
                    >
                      <div className='font-semibold text-center'>
                        เหล็กปลอก (ม.)
                      </div>
                    </TableCell>
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
                        <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                          {row.name}
                        </TableCell>
                        <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                          {row.beamLevel ? "" : row.length}
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
                          {row.casing ? row.casing.rb6 : ""}
                        </TableCell>
                        <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                          {row.casing ? row.casing.rb9 : ""}
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
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {currencyFormatter.format(
                        calculateTotal("rb6", "casing")
                      )}
                    </TableCell>
                    <TableCell sx={{ border: 1, borderColor: "#dcdcdc" }}>
                      {currencyFormatter.format(
                        calculateTotal("rb9", "casing")
                      )}
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
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default DetailProject;
