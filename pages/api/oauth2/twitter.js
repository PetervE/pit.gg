export default async (req, res) => {
  try {

    const url = 'https://api.twitter.com/2/tweets/176971957';
    const url2 = 'https://api.twitter.com/2/users/176971957/tweets?tweet.fields=created_at&expansions=author_id&user.fields=created_at&max_results=50';

    const operation = await fetch(
      url2,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAABFbNwEAAAAAbYR3%2FVtD1cKY1WjW79MTiFRlP64%3DlWJDWK92D57Y2yahC5RJLtZMgr8FZAzTwrXuC1bUw3wqcvsVBm`,
        },
      }
    );
    const data = await operation.json();
    console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    console.log("getLiftLogs ERROR", err);
    return false;
  }
};
