export default async (req, res) => {
  try {
    console.log("req", req);
    // const url =
    //   "https://api.twitter.com/2/users/176971957/tweets?tweet.fields=created_at&expansions=author_id&user.fields=created_at&max_results=50";

    // const operation = await fetch(url, {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${process.env.twitter}`,
    //   },
    // });
    // const data = await operation.json();
    return res.status(200).json("lol");
  } catch (err) {
    console.log("getLiftLogs ERROR", err);
    return false;
  }
};
