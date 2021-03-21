import React, { useEffect, useState, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

const Loader = dynamic(() => import("../../components/Loader"), { ssr: false });

function Post(props) {
  const router = useRouter();
  const { id } = router.query;
  console.log(router);
  return <p>Post: {id}</p>;
}

export default Post;

export async function getStaticPaths() {
  // Return a list of possible value for id

  return {
    paths: [{ params: { id: "my-first-blogpost" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id

  return { props: { title: "My Title", content: "Hello" } };
}
