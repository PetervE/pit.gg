import "../../../../components/configure";
import { Storage } from "aws-amplify";

// get workouts, excercises and set active exercise
const getLiftLogs = async () => {};

export default async (req, res) => {
  try {
    console.log(req);

    return res.status(200).json({
      success: "done",
    });
  } catch (err) {
    console.log("getLiftLogs ERROR", err);
    return false;
  }
};
