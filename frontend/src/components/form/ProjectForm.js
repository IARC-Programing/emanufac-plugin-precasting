import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import _ from "lodash";

function BeamWithForm({ control, beamIndex }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `beams[${beamIndex}].width_list`,
  });

  return (
    <div>
      <div className='w-full py-2'>
        {_.map(fields, (field, index) => (
          <div className='w-full py-2  flex flex-wrap' key={field.id}>
            <div className='w-full  py-2 px-1'>
              <Controller
                name={`beams[${beamIndex}].width_list[${index}].length`}
                defaultValue={field.length}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size='small'
                    label='ความยาว'
                  />
                )}
              />
            </div>
            <div className='w-full font-semibold py-2 px-1'>เหล็กโครงสร้าง</div>
            <div className='w-full  py-2 px-1'>
              <Controller
                name={`beams[${beamIndex}].width_list[${index}].structure.db12`}
                defaultValue={field.length}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size='small'
                    label='ความยาว'
                  />
                )}
              />
            </div>
          </div>
        ))}
        <Button
          size='small'
          variant='contained'
          color='secondary'
          onClick={() => append()}
        >
          เพิ่มขนาด
        </Button>
      </div>
    </div>
  );
}

function ProjectForm({ defaultValue, control }) {
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
        {_.map(fields, (field, index) => (
          <div className='w-full py-2 px-1 flex flex-wrap' key={field.id}>
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
                    label='ขนาดคาน (ความกว้าง) ม.'
                  />
                )}
              />
            </div>
            <div className='w-full py-2 px-1'>
              <div className='font-semibold '>เหล็กโครงสร้าง</div>
            </div>
            <div className='w-1/4 py-2 px-1'>
              <Controller
                name={`beams[${index}].structure.db12`}
                defaultValue={field.structure ? field.structure.db12 : ""}
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth size='small' label='DB12' />
                )}
              />
            </div>
            <div className='w-1/4 py-2 px-1'>
              <Controller
                name={`beams[${index}].structure.db16`}
                defaultValue={field.structure ? field.structure.db16 : ""}
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth size='small' label='DB16' />
                )}
              />
            </div>
            <div className='w-1/4 py-2 px-1'>
              <Controller
                name={`beams[${index}].structure.db20`}
                defaultValue={field.structure ? field.structure.db20 : ""}
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth size='small' label='DB20' />
                )}
              />
            </div>
            <div className='w-1/4 py-2 px-1'>
              <Controller
                name={`beams[${index}].structure.db25`}
                defaultValue={field.structure ? field.structure.db25 : ""}
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth size='small' label='DB25' />
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
                  <TextField {...field} fullWidth size='small' label='RB6' />
                )}
              />
            </div>
            <div className='w-1/2 py-2 px-1'>
              <Controller
                name={`beams[${index}].casing.rb9`}
                defaultValue={field.structure ? field.structure.rb9 : ""}
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth size='small' label='RB9' />
                )}
              />
            </div>
            <div className='w-1/2 py-2 px-1'>
              <Controller
                name={`beams[${index}].casing.rb9`}
                defaultValue={field.structure ? field.structure.rb9 : ""}
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth size='small' label='RB9' />
                )}
              />
            </div>
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
                  <TextField {...field} fullWidth size='small' label='@' />
                )}
              />
            </div>
            <div className='w-full py-2 px-1'>
              <BeamWithForm beamIndex={index} control={control} />
            </div>
          </div>
        ))}
        <div className='w-full py-2 px-1'>
          <Button variant='contained' onClick={() => append({})}>
            เพิ่มคาน
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;
