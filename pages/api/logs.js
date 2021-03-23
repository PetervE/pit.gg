import "../../components/configure";
import { Storage } from "aws-amplify";

export default async (req, res) => {
  try {
    const logs = await Storage.get(
      "fitness/logs/fithero-backup-2021-03-23.json",
      {
        download: true,
      }
    );
    return res.status(200).json({ data: logs.Body });
  } catch (err) {
    return res.status(500).json({ error: "Error logs api", err: err });
  }
};
