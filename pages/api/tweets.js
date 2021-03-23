export default async (req, res) => {
  try {
    const url =
      "https://api.twitter.com/2/users/176971957/tweets?tweet.fields=created_at&expansions=author_id&user.fields=created_at&max_results=100";

    // const operation = await fetch(url, {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${process.env.twitter}`,
    //   },
    // });

    const url2 = "https://api.twitter.com/1.1/statuses/user_timeline.json?";

    const operation = await fetch(
      url2 +
        new URLSearchParams({
          screen_name: "petervanegeraat",
          count: 100,
        }),
      {
        headers: {
          Authorization: `Bearer ${process.env.twitter}`,
        },
      }
    );
    const data = await operation.json();
    // console.log("data", data);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ error: "Error tweets api", err: err });
  }
};
