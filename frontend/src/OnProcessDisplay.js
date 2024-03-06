import { Button, Card, CardContent, TextField } from "@mui/material";
import _ from "lodash";
import api from "./config/api";
import { useHistory } from "react-router";

export default function OnProcessDisplay({
  manufacturingOrder,
  currentProcess,
  currentStep,
  React,
}) {
  const { useEffect, useState } = React;
  const [precastProject, setPrecastProject] = useState(null);
  const [openAddProject, setOpenAddProject] = useState(false);
  const [projectName, setProjectName] = useState("");
  const history = useHistory();

  const getData = async () => {
    try {
      const result = await api.get(
        `${process.env.REACT_APP_API_URL}/plugin/pr/precast-project?process=${currentProcess._id}`
      );

      if (result.data) {
        setPrecastProject(result.data.rows);
      }
    } catch (error) {
      console.error("Error on Data Fetching", error);
    }
  };

  const handleCreateProject = async () => {
    try {
      const result = await api.post(
        `${process.env.REACT_APP_API_URL}/plugin/pr/precast-project`,
        {
          name: projectName,
          process: currentProcess._id,
        }
      );

      if (result.data) {
        setOpenAddProject(false);
        setProjectName("");
        getData();
      }
    } catch (error) {
      console.error("Error on Data Fetching", error);
    }
  };

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  const noFoundProcessRendering = (
    <div>
      <div>ยังไม่มีโครงการตัดเหล็กสำหรับคำสั่งผลิตนี้</div>
      <div className='my-2'>
        <Button variant='contained' onClick={() => setOpenAddProject(true)}>
          สร้างโครงการ
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Card>
        <CardContent>
          <div className='font-semibold'>โครงการตัดเหล็ก</div>
          {_.isEmpty(precastProject) ? (
            noFoundProcessRendering
          ) : (
            <div className='my-2'>
              <div>
                {_.map(precastProject, (eachProject) => (
                  <div className='flex justify-between my-2 py-2 items-center'>
                    <div>{eachProject.name}</div>
                    <div className='flex gap-2'>
                      <Button
                        variant='contained'
                        size='small'
                        color='info'
                        startIcon={<i className='fas fa-file-alt'></i>}
                        onClick={() => {
                          history.push(
                            `/plugin/precasting/project/basic-arrangement/${eachProject._id}`
                          );
                        }}
                      >
                        แผนตัดเหล็ก
                      </Button>
                      <Button
                        variant='contained'
                        size='small'
                        color='warning'
                        onClick={() => {
                          history.push(
                            `/plugin/precasting/project/edit/${eachProject._id}`
                          );
                        }}
                        startIcon={<i className='fas fa-hammer'></i>}
                      >
                        จัดการคาน
                      </Button>

                      <Button
                        variant='contained'
                        size='small'
                        color='error'
                        startIcon={<i className='fas fa-trash'></i>}
                      >
                        ลบ
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className='my-2'>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => {
                    setOpenAddProject(true);
                  }}
                >
                  เพิ่ม
                </Button>
              </div>
            </div>
          )}
          {openAddProject && (
            <div>
              <TextField
                fullWidth
                label='ชื่อโครงการ'
                size='small'
                onChange={(e) => setProjectName(e.target.value)}
              />
              <div className='my-2'>
                <Button
                  color='success'
                  variant='contained'
                  onClick={() => handleCreateProject()}
                >
                  สร้าง
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
