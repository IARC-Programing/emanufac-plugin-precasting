import {
  LinearProgress,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useParams } from "react-router";
import _ from "lodash";

import api from "../config/api";
import {
  BeamListTable,
  MetalByWidthTable,
  StructureAnalyzeBox,
  AmoutMetalByWidthTable,
} from "../components";

function BasicMetalArrangement({
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
        const beamList = _.reduce(
          result.data.beams,
          (acc, each) => {
            if (_.isArray(acc)) {
              acc.push({ ...each, beamLevel: true });
            } else {
              acc = [{ ...each, beamLevel: true }];
            }
            _.map(each.width_list, (eachWidth) => {
              acc.push({
                ...eachWidth,
                beamLevel: false,
                widthLevel: true,
                mainStructure: each,
              });
            });

            return acc;
          },
          []
        );
        console.log("Beam List", beamList);
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
        <div className='self-center print-disable'>
          <Button
            variant='contained'
            color='info'
            onClick={() => {
              window.print();
            }}
          >
            พิมพ์
          </Button>
        </div>
      </div>
      <div className='print-disable'>
        <HelpingComponent.BackButton />
      </div>
      <div className='my-4'>
        <div className='font-semibold font-display text-xl'>{project.name}</div>

        <div className='my-4'>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<i className='fas fa-chevron-down' />}
            >
              ตารางรายละเอียดการจัดเหล็ก
            </AccordionSummary>
            <AccordionDetails>
              <BeamListTable project={project} />
            </AccordionDetails>
          </Accordion>
          <div className='my-2'>
            <Card>
              <CardContent>
                <div className='font-semibold font-display text-lg'>
                  สรุปรวมคานตามความยาวที่เท่ากัน
                </div>
                <p className='mb-4 text-sm'>
                  เป็นการรวมว่าในความยาวแต่ละขนาด
                  มีการใช้เหล็กโครงสร้างขนาดต่างๆ อย่างไรบ้าง
                </p>
                <div className='font-semibold font-display'>รวมความยาว</div>
                <MetalByWidthTable beamAndStrcutureList={project.beams} />
                <div className='font-semibold font-display'>
                  รวมปริมาณเส้นของเหล็ก
                </div>
                <AmoutMetalByWidthTable beamAndStrcutureList={project.beams} />
              </CardContent>
            </Card>
          </div>

          <div className='my-2'>
            <Card>
              <CardContent>
                <div className='font-semibold font-display'>
                  การวิเคาะห์โครงสร้าง เหล็กยาว 12mm
                </div>
                <StructureAnalyzeBox
                  beamList={project.beams}
                  strcutureCode={"db12"}
                />
              </CardContent>
            </Card>
          </div>

          <div className='my-2'>
            <Card>
              <CardContent>
                <div className='font-semibold font-display'>
                  การวิเคาะห์โครงสร้าง เหล็กยาว 16mm
                </div>
                <StructureAnalyzeBox
                  beamList={project.beams}
                  strcutureCode={"db16"}
                />
              </CardContent>
            </Card>
          </div>

          <div className='my-2'>
            <Card>
              <CardContent>
                <div className='font-semibold font-display'>
                  การวิเคาะห์โครงสร้าง เหล็กยาว 20mm
                </div>
                <StructureAnalyzeBox
                  beamList={project.beams}
                  strcutureCode={"db20"}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicMetalArrangement;
