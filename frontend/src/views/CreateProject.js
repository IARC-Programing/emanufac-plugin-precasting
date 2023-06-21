import {
  Button,
  Card,
  CardContent,
  LinearProgress,
  TextField,
} from "@mui/material";
import api from "../config/api";

import { useForm } from "react-hook-form";
import _ from "lodash";
import { ProjectForm } from "../components";

function CreateProject({
  helpingComponent: HelpingComponent,
  title,
  subtitle,
  React,
}) {
  const { useState, useEffect } = React;
  const { control, handleSubmit } = useForm();

  const handleCreateData = async () => {
    try {
    } catch (error) {
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
              <ProjectForm control={control} defaultValue={{}} />
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
