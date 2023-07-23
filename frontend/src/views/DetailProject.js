import { LinearProgress } from "@mui/material";
import { useParams } from "react-router";
import _ from "lodash";

import api from "../config/api";
import { BeamListTable } from "../components";

function DetailProject({
  helpingComponent: HelpingComponent,
  title,
  subtitle,
  React,
}) {
  const { useState, useEffect } = React;
  const [isReady, setIsReady] = useState(false);
  const [project, setProject] = useState();
  const params = useParams();

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

  return (
    <div>
      <div className='flex justify-between'>
        <HelpingComponent.ViewTitle title={title} subtitle={subtitle} />
      </div>
      <HelpingComponent.BackButton />
      <div className='my-4'>
        <div className='font-semibold font-display text-xl'>{project.name}</div>
        <div className='my-4'>
          <BeamListTable project={project} />
        </div>
      </div>
    </div>
  );
}

export default DetailProject;
