import { Button, Card, CardContent } from "@mui/material";
import api from "../config/api";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import _ from "lodash";
import { ProjectForm } from "../components";

function CreateProject({
  helpingComponent: HelpingComponent,
  title,
  subtitle,
  React,
}) {
  const { useState, useEffect } = React;
  const { control, handleSubmit, setValue, watch } = useForm();
  const history = useHistory();

  const handleCreateData = async (data) => {
    try {
      await api.post(
        `${process.env.REACT_APP_API_URL}/plugin/pr/precast-project`,
        data
      );

      history.goBack();
    } catch (error) {
      alert(`ไม่สามารถบันทึกข้อมูลได้ เนื่องจาก ${error.message}`);
      console.error("Error on Data Fetching", error);
    }
  };

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
                defaultValue={{}}
                setValue={setValue}
                watch={watch}
              />
            </CardContent>
          </Card>
          <div className='flex justify-end mt-4'>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit(handleCreateData)}
            >
              บันทึก
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
