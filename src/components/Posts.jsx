import { useSelector, useDispatch } from "react-redux";
import PostExcerpt from "./PostExcerpt.jsx";
import { useEffect } from "react";

import {
  selectAllPosts,
  selectStatus,
  fetchPosts,
} from "../redux/slices/postsSlice";

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectStatus);

  //   useEffect(() => {
  //     console.log(status);
  //   }, [status]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const orderedpost = posts;

  return (
    <div className="border">
      <ul className="">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          orderedpost.map((post) => {
            return <PostExcerpt key={post.id} post={post}></PostExcerpt>;
          })
        )}
      </ul>
    </div>
  );
}

export default Posts;
