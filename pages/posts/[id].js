import React, { useEffect, useState, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const Loader = dynamic(() => import("../../components/Loader"), { ssr: false });

function Post(props) {
  const { content, coverImage, title } = props;

  // console.log("props", props);
  return (
    <div className="flex flex-1 flex-col items-stretch">
      <div className="p-10">
        <h1 className="text-white text-5xl">{title}</h1>
        <img src={coverImage} className="max-w-lg my-5" />
        <div
          className="dark:text-white text-black max-w-3xl danger-div"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </div>
  );
}

export default Post;

export async function getStaticPaths(props) {
  // Return a list of possible value for id
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
  const posts = await postsRaw.json();
  if (posts && posts.data) {
    const items = posts.data.user.publication.posts.reduce((memo, post) => {
      memo.push({ params: { id: post.slug, cuid: post.cuid } });
      return memo;
    }, []);
    return {
      paths: items,
      fallback: false,
    };
  }

  return {
    paths: [{ params: { id: "my-first-blogpost" } }],
    fallback: false,
  };
}

export async function getStaticProps(props) {
  // Fetch necessary data for the blog post using params.id
  const postRaw = await fetch("https://api.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.hashnode,
    },
    body: JSON.stringify({
      query: `query {
        post(slug: "${props.params.id}", hostname: "pit.gg/blogs") {
          title,
          slug,
          cuid,
          coverImage,
          content,
          contentMarkdown
        }
      }`,
    }),
  });
  const post = await postRaw.json();
  return { props: post.data.post };
}
