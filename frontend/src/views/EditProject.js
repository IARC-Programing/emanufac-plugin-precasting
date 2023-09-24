import { Button, Card, CardContent, LinearProgress } from "@mui/material";
import api from "../config/api";

import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { ProjectForm } from "../components";

function EditProject({
  helpingComponent: HelpingComponent,
  title,
  subtitle,
  React,
}) {
  const { useState, useEffect } = React;
  const params = useParams();
  const { control, handleSubmit, setValue, watch } = useForm();
  const history = useHistory();
  const [project, setProject] = useState();
  const [isReady, setIsReady] = useState(false);
  const getData = async () => {
    try {
      const result = await api.get(
        `${process.env.REACT_APP_API_URL}/plugin/pr/precast-project/${params.id}`
      );

      if (result.data) {
        console.log("Result", result.data);
        setProject(result.data);
      }
    } catch (error) {
      console.error("Error on Data Fetching", error);
    }
  };

  useEffect(() => {
    getData();
    return () => {};
  }, [params]);

  useEffect(() => {
    if (project) {
      setValue("beams", project.beams);
      setIsReady(true);
    }

    return () => {};
  }, [project]);

  const handleEditData = async (data) => {
    try {
      await api.put(
        `${process.env.REACT_APP_API_URL}/plugin/pr/precast-project/${params.id}`,
        data
      );

      history.goBack();
    } catch (error) {
      alert(`ไม่สามารถบันทึกข้อมูลได้ เนื่องจาก ${error.message}`);
      console.error("Error on Data Fetching", error);
    }
  };

  if (!isReady) {
    return <LinearProgress />;
  }

  return (
    <div>
      <HelpingComponent.ViewTitle title={title} subtitle={subtitle} />
      <HelpingComponent.BackButton />
      <div className='my-4'>
        <form>
          <Card>
            <CardContent>
              <ProjectForm
                control={control}
                defaultValue={project}
                setValue={setValue}
                watch={watch}
              />
            </CardContent>
          </Card>
          <div className='flex justify-end mt-4'>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit(handleEditData)}
            >
              บันทึก
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProject;
