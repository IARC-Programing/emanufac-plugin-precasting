import { Button, LinearProgress } from "@mui/material";
import api from "../config/api";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
} from "@mui/material";
import { useHistory } from "react-router";
import _ from "lodash";

function Projects({
  helpingComponent: HelpingComponent,
  title,
  subtitle,
  React,
}) {
  const { useState, useEffect } = React;
  const [isReady, setIsReady] = useState(false);
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [projects, setProjects] = useState([]);
  const history = useHistory();
  const getData = async () => {
    try {
      const result = await api.get(
        `${process.env.REACT_APP_API_URL}/plugin/pr/precast-project?page=${page}&size=${size}`
      );

      console.log("Result", result.data);
      setProjects(result.data);
      setTotal(result.data.total);
      setIsReady(true);
    } catch (error) {
      console.error("Error on Data Fetching", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  useEffect(() => {
    getData();
    return () => {};
  }, [page, size]);

  return (
    <div>
      <div className='flex justify-between'>
        <HelpingComponent.ViewTitle title={title} subtitle={subtitle} />
        <div className='self-center'>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              history.push("project/create");
            }}
          >
            สร้าง
          </Button>
        </div>
      </div>
      <HelpingComponent.BackButton />
      <div className='my-4'>
        {isReady ? (
          <div>
            <Paper>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <div className='font-bold'>ลำดับที่</div>
                      </TableCell>
                      <TableCell>
                        <div className='font-bold'> ชื่อโครงการ</div>
                      </TableCell>
                      <TableCell>
                        <div className='font-bold'>ดำเนินการ</div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!_.isEmpty(projects.rows) ? (
                      _.map(projects.rows, (row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component='th' scope='row'>
                            <div className='text-xs'>{index + 1}</div>
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>
                            <div className='flex gap-2'>
                              <Button
                                variant='contained'
                                color='info'
                                onClick={() => {
                                  history.push(`project/detail/${row._id}`);
                                }}
                              >
                                รายละเอียด
                              </Button>
                              <Button
                                variant='contained'
                                color='secondary'
                                onClick={() => {
                                  history.push(
                                    `project/basic-arrangement/${row._id}`
                                  );
                                }}
                              >
                                จัดเหล็กอย่างง่าย
                              </Button>
                              <Button
                                variant='contained'
                                color='warning'
                                onClick={() => {
                                  history.push(`project/edit/${row._id}`);
                                }}
                              >
                                แก้ไข
                              </Button>
                              <Button variant='contained' color='error'>
                                ลบ
                              </Button>
                            </div>
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
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component='div'
                page={page - 1}
                count={total || 1}
                rowsPerPage={size}
                onPageChange={handleChangePage}
              />
            </Paper>
          </div>
        ) : (
          <LinearProgress />
        )}
      </div>
    </div>
  );
}

export default Projects;
