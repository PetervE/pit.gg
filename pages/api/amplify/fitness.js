import "../../../components/configure";
import { Storage } from "aws-amplify";

// get workouts, excercises and set active exercise
const getLiftLogs = async () => {};

export default async (req, res) => {
  try {
    const logs = await Storage.get(
      "fitness/logs/fithero-backup-2021-03-19.json",
      {
        download: true,
      }
    );
    return res.status(200).json(logs.Body);
  } catch (err) {
    console.log("getLiftLogs ERROR", err);
    return false;
  }
};
