import mongoose from "mongoose";

const databases = {
  initialize(mongodbURI) {
    const db = mongoose.connect(
      mongodbURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: false,
      },
      (error) => {
        if (error) {
          console.error("MongoDB error: ", error);
        } else {
          console.log(`Package Plugin Meta Divide - MongoDB connected`);
        }
      }
    );
    return db;
  },
};
export default databases;
