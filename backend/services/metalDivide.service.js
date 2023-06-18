import mongoose from "mongoose";

import config from "../configs/app.js";
import errorMethods from "../configs/errorMethods.js";
import MetalDivideModel from "../models/MetalDivide.js";
import MetalDividePipeline from "../pipelines/metalDivide.pipeline";

const { ErrorBadRequest, ErrorNotFound } = errorMethods;
const methods = {
  createPipeline(req) {
    const { pipeline } = MetalDividePipeline();
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
    if (req?.query?.manufacturing_order) {
      pipeline.push({
        $match: {
          "manufacturing_order._id": {
            $eq: mongoose.Types.ObjectId(req?.query?.manufacturing_order),
          },
        },
      });
    }
    if (req?.query?.process) {
      pipeline.push({
        $match: {
          "process._id": {
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
        console.log("On Matal Divide Aggregate");
        Promise.all([
          MetalDivideModel.aggregate(this.createPipeline(req).pipeline),
        ])
          .then((result) => {
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
        const obj = await MetalDivideModel.aggregate(
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
        const obj = new MetalDivideModel(data);
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
        const obj = await MetalDivideModel.findById(id);
        if (!obj) {
          reject(ErrorNotFound("id: not found"));
        }
        await MetalDivideModel.updateOne({ _id: id }, data);
        resolve(Object.assign(obj, data));
      } catch (error) {
        reject(error);
      }
    });
  },
  async delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await MetalDivideModel.findByIdAndDelete(id);
        resolve({ success: true });
      } catch (error) {
        reject(ErrorBadRequest(error));
      }
    });
  },

  async createWarehouseAndEditMetalDivideRecord() {},
};

export default {
  ...methods,
};
