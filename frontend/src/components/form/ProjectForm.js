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
      <div className='w-full p-1'>
        {_.map(fields, (field, index) => (
          <div
            className='w-full p-4  flex flex-wrap border rounded-md bg-gray-100 my-2'
            key={field.id}
          >
            <div className='w-full flex justify-between'>
              <div className='w-full font-semibold px-1'>
                ความยาวที่ {index + 1}
              </div>
              <div>
                <Button
                  size='small'
                  variant='contained'
                  color='error'
                  onClick={() => remove(index)}
                >
                  ลบ
                </Button>
              </div>
            </div>
            <div className='w-full lg:w-1/2  py-2 px-1'>
              <Controller
                name={`beams[${beamIndex}].width_list[${index}].length`}
                defaultValue={field.length}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size='small'
                    label='ความยาว (ม.)'
                    style={{ backgroundColor: "#fff" }}
                  />
                )}
              />
            </div>
            <div className='w-full lg:w-1/2  py-2 px-1'>
              <Controller
                name={`beams[${beamIndex}].width_list[${index}].amount`}
                defaultValue={field.amount}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size='small'
                    label='จำนวนคาน (ตัว)'
                    style={{ backgroundColor: "#fff" }}
                  />
                )}
              />
            </div>
            <div className='w-full px-1'>เหล็กโครงสร้าง (แต่ละเส้นความยาว)</div>
            <div className='w-1/2 md:w-1/4 py-2 px-1'>
              <Controller
                name={`beams[${beamIndex}].width_list[${index}].structure.db12`}
                defaultValue={field.structure ? field.structure.db12 : ""}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size='small'
                    label='DB12'
                    style={{ backgroundColor: "#fff" }}
                  />
                )}
              />
            </div>
            <div className='w-1/2 md:w-1/4 py-2 px-1'>
              <Controller
                name={`beams[${beamIndex}].width_list[${index}].structure.db16`}
                defaultValue={field.structure ? field.structure.db16 : ""}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size='small'
                    label='DB16'
                    style={{ backgroundColor: "#fff" }}
                  />
                )}
              />
            </div>
            <div className='w-1/2 md:w-1/4 py-2 px-1'>
              <Controller
                name={`beams[${beamIndex}].width_list[${index}].structure.db20`}
                defaultValue={field.structure ? field.structure.db20 : ""}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size='small'
                    label='DB20'
                    style={{ backgroundColor: "#fff" }}
                  />
                )}
              />
            </div>
            <div className='w-1/2 md:w-1/4 py-2 px-1'>
              <Controller
                name={`beams[${beamIndex}].width_list[${index}].structure.db25`}
                defaultValue={field.structure ? field.structure.db25 : ""}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size='small'
                    label='DB25'
                    style={{ backgroundColor: "#fff" }}
                  />
                )}
              />
            </div>
            <div className='w-full py-2'>เหล็กปลอก</div>
            <div className='w-1/2 md:w-1/4 py-2 px-1'>
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
            </div>
            <div className='w-1/2 md:w-1/4 py-2 px-1'>
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
        <div className='p-4'>
          {_.map(fields, (field, index) => (
            <div
              className='w-full p-4 flex flex-wrap border rounded-md my-2'
              key={field.id}
            >
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
              <div className='w-full py-2 px-1'>
                <BeamWithForm beamIndex={index} control={control} />
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
