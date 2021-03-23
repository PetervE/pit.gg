// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  try {
    const postsRaw = await fetch("https://api.hashnode.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.hashnode,
      },
      body: JSON.stringify({
        query: `query {
          user(username:"petervanegeraat") {
            publication {
              posts (page:0) {
                cuid
                slug
                title
                type
                popularity
                dateAdded
                dateUpdated
                dateFeatured
                brief
                coverImage
                contentMarkdown
              }
            }
          }
        }`,
      }),
    });
    let postItems = await postsRaw.json();
    let data = postItems.data.user.publication.posts || false;

    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ error: "Error posts api", err: err });
  }
};
