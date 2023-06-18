/* eslint-disable no-sparse-arrays */
const createPipeline = () => {
  const pipeline = [];
  pipeline.push({
    $lookup: {
      from: "manufacturingorders",
      localField: "manufacturing_order",
      foreignField: "_id",
      as: "manufacturing_order",
    },
  });
  pipeline.push({
    $set: {
      manufacturing_order: {
        $arrayElemAt: ["$manufacturing_order", 0],
      },
    },
  });
  pipeline.push({
    $lookup: {
      from: "processes",
      localField: "process",
      foreignField: "_id",
      as: "process",
    },
  });
  pipeline.push({
    $set: {
      process: {
        $arrayElemAt: ["$process", 0],
      },
    },
  });
  pipeline.push({
    $lookup: {
      from: "customers",
      localField: "divide_sets.customer",
      foreignField: "_id",
      as: "divide_customers",
    },
  });
  pipeline.push({
    $addFields: {
      divide_sets: {
        $map: {
          input: "$divide_sets",
          as: "divset",
          in: {
            $mergeObjects: [
              "$$divset",
              {
                customer: {
                  $cond: {
                    if: {
                      $ne: ["$$divset.customer", null],
                    },
                    then: {
                      $arrayElemAt: [
                        "$divide_customers",
                        {
                          $indexOfArray: [
                            "$divide_customers._id",
                            "$$divset.customer",
                          ],
                        },
                      ],
                    },
                    else: {},
                  },
                },
              },
            ],
          },
        },
      },
    },
  });

  pipeline.push({
    $project: {
      divide_customers: 0,
    },
  });

  return { pipeline };
};

export default createPipeline;
