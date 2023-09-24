import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import _ from "lodash";

import StructureIllustrator from "../box/StructureIllustrator";

function BeamWithForm({ control, beamIndex, setValue, watch }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `beams[${beamIndex}].width_list`,
  });

  const calculateStructureLength = (index, structureCode) => {
    const totalLength =
      parseFloat(watch(`beams[${beamIndex}].width_list[${index}].length`)) *
      parseFloat(watch(`beams[${beamIndex}].width_list[${index}].amount`)) *
      parseFloat(
        watch(`beams[${beamIndex}].structure.[${structureCode}]`) || 0
      );
    return totalLength;
  };
  return (
    <TableBody>
      {_.map(fields, (field, index) => (
        <TableRow key={field.id}>
          <TableCell>
            <Controller
              name={`beams[${beamIndex}].width_list[${index}].length`}
              defaultValue={field.length}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='ยาว (ม.)'
                  style={{ backgroundColor: "#fff" }}
                />
              )}
            />
          </TableCell>
          <TableCell>
            <Controller
              name={`beams[${beamIndex}].width_list[${index}].amount`}
              defaultValue={field.amount}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='จำนวน (ชิ้น)'
                  style={{ backgroundColor: "#fff" }}
                />
              )}
            />
          </TableCell>
          <TableCell>
            <Controller
              name={`beams[${beamIndex}].width_list[${index}].structure.db12_enable`}
              defaultValue={field.structure ? field.structure.db12 : false}
              control={control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  defaultChecked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    if (e.target.checked) {
                      setValue(
                        `beams[${beamIndex}].width_list[${index}].structure.db12`,
                        calculateStructureLength(index, "db12")
                      );
                    } else {
                      setValue(
                        `beams[${beamIndex}].width_list[${index}].structure.db12`,
                        null
                      );
                    }
                  }}
                />
              )}
            />
            <div className='text-center'>
              {watch(`beams[${beamIndex}].width_list[${index}].structure.db12`)}
            </div>
          </TableCell>
          <TableCell>
            <Controller
              name={`beams[${beamIndex}].width_list[${index}].structure.db16_enable`}
              defaultValue={field.structure ? field.structure.db16 : false}
              control={control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  defaultChecked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    if (e.target.checked) {
                      setValue(
                        `beams[${beamIndex}].width_list[${index}].structure.db16`,
                        calculateStructureLength(index, "db16")
                      );
                    } else {
                      setValue(
                        `beams[${beamIndex}].width_list[${index}].structure.db16`,
                        null
                      );
                    }
                  }}
                />
              )}
            />
            <div className='text-center'>
              {watch(`beams[${beamIndex}].width_list[${index}].structure.db16`)}
            </div>
          </TableCell>
          <TableCell>
            <Controller
              name={`beams[${beamIndex}].width_list[${index}].structure.db20_enable`}
              defaultValue={field.structure ? field.structure.db20 : false}
              control={control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  defaultChecked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    if (e.target.checked) {
                      setValue(
                        `beams[${beamIndex}].width_list[${index}].structure.db20`,
                        calculateStructureLength(index, "db20")
                      );
                    } else {
                      setValue(
                        `beams[${beamIndex}].width_list[${index}].structure.db20`,
                        null
                      );
                    }
                  }}
                />
              )}
            />
            <div className='text-center'>
              {watch(`beams[${beamIndex}].width_list[${index}].structure.db20`)}
            </div>
          </TableCell>
          <TableCell>
            <Controller
              name={`beams[${beamIndex}].width_list[${index}].structure.db25_enable`}
              defaultValue={field.structure ? field.structure.db25 : false}
              control={control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  defaultChecked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    if (e.target.checked) {
                      setValue(
                        `beams[${beamIndex}].width_list[${index}].structure.db25`,
                        calculateStructureLength(index, "db25")
                      );
                    } else {
                      setValue(
                        `beams[${beamIndex}].width_list[${index}].structure.db25`,
                        null
                      );
                    }
                  }}
                />
              )}
            />
            <div className='text-center'>
              {watch(`beams[${beamIndex}].width_list[${index}].structure.db25`)}
            </div>
          </TableCell>
          <TableCell>
            <Controller
              name={`beams[${beamIndex}].width_list[${index}].casing.rb6`}
              defaultValue={field.casing ? field.casing.rb6 : ""}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='RB6'
                  style={{ backgroundColor: "#fff" }}
                />
              )}
            />
          </TableCell>
          <TableCell>
            <Controller
              name={`beams[${beamIndex}].width_list[${index}].casing.rb9`}
              defaultValue={field.casing ? field.casing.rb9 : ""}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='RB9'
                  style={{ backgroundColor: "#fff" }}
                />
              )}
            />
          </TableCell>
          <TableCell>
            <Button
              size='small'
              variant='contained'
              color='error'
              onClick={() => remove(index)}
            >
              ลบ
            </Button>
          </TableCell>
        </TableRow>
      ))}
      <TableRow>
        <TableCell>
          <Button
            size='small'
            variant='contained'
            color='secondary'
            onClick={() => append()}
          >
            เพิ่มขนาด
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

function ProjectForm({ defaultValue, control, setValue, watch }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "beams",
  });

  return (
    <div>
      <div className='flex flex-wrap'>
        <div className='w-full py-2 px-1'>
          <Controller
            name='name'
            defaultValue={defaultValue.name || ""}
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth size='small' label='ชื่องาน' />
            )}
          />
        </div>
        <div className='p-4'>
          {_.map(fields, (field, index) => (
            <div
              className='w-full p-2 flex flex-wrap border rounded-md my-2'
              key={field.id}
            >
              <div className='w-full lg:w-1/3'>
                <StructureIllustrator
                  beamStructure={watch(`beams[${index}].structure`)}
                  jacketAmount={watch(`beams[${index}].casting_amount`)}
                />
              </div>
              <div className='w-full lg:w-2/3 p-4 flex flex-wrap'>
                <div className='w-full py-1 flex justify-between'>
                  <div className='font-semibold '>คานที่ {index + 1}</div>
                  <div>
                    <Button
                      color='error'
                      variant='contained'
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      ลบ
                    </Button>
                  </div>
                </div>
                <div className='w-1/3 py-2 px-1'>
                  <Controller
                    name={`beams[${index}].name`}
                    defaultValue={field.name || `B${index + 1}`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        label='ชื่อคาน'
                      />
                    )}
                  />
                </div>
                <div className='w-1/3 py-2 px-1'>
                  <Controller
                    name={`beams[${index}].width`}
                    defaultValue={field.width}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        label='ขนาดคาน (ความกว้าง) ม.'
                      />
                    )}
                  />
                </div>
                <div className='w-1/3 py-2 px-1'>
                  <Controller
                    name={`beams[${index}].length`}
                    defaultValue={field.length}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        label='ขนาดคาน (ความลึก) ม.'
                      />
                    )}
                  />
                </div>
                <div className='w-full py-2 px-1'>
                  <div className='font-semibold '>จำนวนเส้นของเหล็ก</div>
                </div>
                <div className='w-1/4 py-2 px-1'>
                  <Controller
                    name={`beams[${index}].structure.db12`}
                    defaultValue={field.structure ? field.structure.db12 : ""}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        label='DB12 (เส้น)'
                      />
                    )}
                  />
                </div>
                <div className='w-1/4 py-2 px-1'>
                  <Controller
                    name={`beams[${index}].structure.db16`}
                    defaultValue={field.structure ? field.structure.db16 : ""}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        label='DB16 (เส้น)'
                      />
                    )}
                  />
                </div>
                <div className='w-1/4 py-2 px-1'>
                  <Controller
                    name={`beams[${index}].structure.db20`}
                    defaultValue={field.structure ? field.structure.db20 : ""}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        label='DB20 (เส้น)'
                      />
                    )}
                  />
                </div>
                <div className='w-1/4 py-2 px-1'>
                  <Controller
                    name={`beams[${index}].structure.db25`}
                    defaultValue={field.structure ? field.structure.db25 : ""}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        label='DB25 (เส้น)'
                      />
                    )}
                  />
                </div>
                <div className='w-full py-2 px-1'>
                  <div className='font-semibold '>เหล็กปลอก (ม.)</div>
                </div>
                <div className='w-1/2 py-2 px-1'>
                  <Controller
                    name={`beams[${index}].casing.rb6`}
                    defaultValue={field.structure ? field.structure.rb6 : ""}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        label='RB6'
                      />
                    )}
                  />
                </div>
                <div className='w-1/2 py-2 px-1'>
                  <Controller
                    name={`beams[${index}].casing.rb9`}
                    defaultValue={field.structure ? field.structure.rb9 : ""}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        label='RB9'
                      />
                    )}
                  />
                </div>
                <div className='w-full py-2 px-1 font-bold'>จำนวนปลอก</div>
                <div className='w-1/2 py-2 px-1'>
                  <Controller
                    name={`beams[${index}].casting_amount`}
                    defaultValue={field.casting_amount}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        label='จำนวนปลอก'
                      />
                    )}
                  />
                </div>
                <div className='w-1/2 py-2 px-1'>
                  <Controller
                    name={`beams[${index}].at`}
                    defaultValue={field.at}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        label='ระยะห่างของคานแต่ละตัว (@)'
                      />
                    )}
                  />
                </div>
              </div>

              <div className='w-full py-2 px-1'>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell rowSpan={2}>
                          <div className='font-bold'> ยาว</div>
                        </TableCell>
                        <TableCell rowSpan={2}>
                          <div className='font-bold'> จำนวน(ชิ้น)</div>
                        </TableCell>
                        <TableCell colSpan={4}>
                          <div className='font-bold'> เหล็กโครงสร้าง (ม.)</div>
                        </TableCell>
                        <TableCell colSpan={2}>
                          <div className='font-bold'> เหล็กปลอด (ม.)</div>
                        </TableCell>{" "}
                        <TableCell rowSpan={2}></TableCell>{" "}
                      </TableRow>{" "}
                      <TableRow>
                        <TableCell>
                          <div>DB12</div>
                        </TableCell>
                        <TableCell>
                          <div> DB16</div>
                        </TableCell>{" "}
                        <TableCell>
                          <div> DB20</div>
                        </TableCell>
                        <TableCell>
                          <div> DB25</div>
                        </TableCell>{" "}
                        <TableCell>
                          <div> RB6</div>
                        </TableCell>
                        <TableCell>
                          <div> RB9</div>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <BeamWithForm
                      beamIndex={index}
                      control={control}
                      setValue={setValue}
                      watch={watch}
                    />
                  </Table>
                </TableContainer>
              </div>
            </div>
          ))}
        </div>
        <div className='w-full py-2 px-1'>
          <Button variant='contained' color='info' onClick={() => append({})}>
            เพิ่มคาน
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;
