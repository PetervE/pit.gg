import "../../components/configure";
import { Storage } from "aws-amplify";

export default async (req, res) => {
  try {
    const videoUrl = await Storage.get(req.query.id);
    const video = await Storage.get(req.query.id, { download: true });

    return res.status(200).json({ ...video, S3URL: videoUrl });
  } catch (err) {
    return res.status(500).json({ error: "Error videos api", err: err });
  }
};
