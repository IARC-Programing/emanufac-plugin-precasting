import mongoose from "mongoose";

import config from "../configs/app.js";
import errorMethods from "../configs/errorMethods.js";
import PrecastProjectModel from "../models/PrecastProject.js";
import precaseDividePipeline from "../pipelines/precastProject.pipeline.js";

const { ErrorBadRequest, ErrorNotFound } = errorMethods;
const methods = {
  createPipeline(req) {
    //  const { pipeline } = precaseDividePipeline();
    const pipeline = [];
    // query section
    if (req?.query?.name) {
      pipeline.push({
        $match: {
          $or: [
            {
              running_number: {
                $regex: req.query.name,
              },
            },
            {
              prefix: {
                $regex: req.query.name,
              },
            },
          ],
        },
      });
    }

    if (req?.query?.process) {
      pipeline.push({
        $match: {
          process: {
            $eq: mongoose.Types.ObjectId(req?.query?.process),
          },
        },
      });
    }

    // find one
    if (req?.params?.id) {
      pipeline.push({
        $match: {
          _id: {
            $eq: mongoose.Types.ObjectId(req?.params?.id),
          },
        },
      });
    } else {
      pipeline.push({ $sort: { createdAt: 1 } });
      pipeline.push({ $set: { id: "$_id" } });
      pipeline.push({
        $facet: {
          count: [{ $count: "total" }],
          data: [
            {
              $skip: +(
                (req?.query?.size || config.pageLimit) *
                ((req?.query?.page || 1) - 1)
              ),
            },
            {
              $limit: parseInt(req?.query?.size, 10) || config.pageLimit,
            },
          ],
        },
      });
    }

    return { pipeline };
  },
  find(req) {
    // console.log("Req", req);
    const limit = +(req?.query?.size || config.pageLimit);
    return new Promise(async (resolve, reject) => {
      try {
        Promise.all([
          PrecastProjectModel.aggregate(this.createPipeline(req).pipeline),
        ])
          .then((result) => {
            console.log("On Final All Precast Project");
            const rows = result[0][0]?.data;
            const count = result[0][0]?.count?.[0]?.total;
            resolve({
              total: count,
              lastPage: Math.ceil(count / limit) || 1,
              currPage: +req?.query?.page || 1,
              rows,
            });
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
  findById(req) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await PrecastProjectModel.aggregate(
          this.createPipeline(req).pipeline
        );

        if (!obj) {
          reject(ErrorNotFound("id: not found"));
        }
        resolve(obj[0]);
      } catch (error) {
        console.error(error);
        reject(ErrorNotFound("id: not found"));
      }
    });
  },
  insert(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = new PrecastProjectModel(data);
        const inserted = await obj.save();
        resolve(inserted);
      } catch (error) {
        console.error(error);
        reject(ErrorBadRequest(error.message));
      }
    });
  },
  update(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await PrecastProjectModel.findById(id);
        if (!obj) {
          reject(ErrorNotFound("id: not found"));
        }
        await PrecastProjectModel.updateOne({ _id: id }, data);
        resolve(Object.assign(obj, data));
      } catch (error) {
        reject(error);
      }
    });
  },
  async delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await PrecastProjectModel.findByIdAndDelete(id);
        resolve({ success: true });
      } catch (error) {
        reject(ErrorBadRequest(error));
      }
    });
  },

  async createWarehouseAndEditMetalDivideRecord() {},
};

export default methods;
