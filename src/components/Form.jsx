import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postAdded,
  postCachedDelete,
  selectAuthor,
  selectLastId,
  pushPosts,
  selectCachedPosts,
} from "../redux/slices/postsSlice";
import Author from "./Author";
function Form() {
  // Caching Id Number;
  const [cachingId, setCachingId] = useState(0);
  const dispatch = useDispatch();
  const authors = useSelector(selectAuthor);
  const lastId = useSelector(selectLastId);
  const [isSynchHasntFired, setIsSynchHasntFired] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const cachedposts = useSelector(selectCachedPosts);

  //   useEffect(() => {
  //     console.log(cachedposts);
  //   }, [cachedposts]);

  const titleChanged = (e) => {
    setTitle(e.target.value);
  };
  const contentChanged = (e) => {
    setContent(e.target.value);
  };
  const authorChanged = (e) => {
    setAuthor(e.target.value);
  };

  const formHandler = (e) => {
    e.preventDefault();
    // Send cached post to db via redux-thunk
    dispatch(pushPosts(cachedposts));
    // Remove cached posts
    dispatch(postCachedDelete());
    // Set caching id to 0
    setCachingId(0);
    console.log("Form Sendded");
  };

  const intermediateLayerHandler = () => {
    // Define Id , contribution with cached Id
    dispatch(postAdded(Number(lastId + cachingId), title, content, author));
    setIsSynchHasntFired(false);
    setTitle("");
    setContent("");
    // Increase to cached Id
    setCachingId((previousValue) => {
      return previousValue + 1;
    });
  };

  return (
    <form
      onSubmit={formHandler}
      className="flex flex-col mt-2 ml-1 gap-3 border rounded-xl p-2 h-max"
    >
      <div className="flex gap-1 justify-end">
        <label htmlFor="title">Title:</label>
        <input
          onChange={titleChanged}
          value={title}
          type="text"
          className="pl-1"
          id="title"
        ></input>
      </div>

      <div className="flex gap-1 justify-end">
        <label htmlFor="content">Content:</label>
        <textarea
          onChange={contentChanged}
          value={content}
          id="content"
          className="pl-1 h-32"
        ></textarea>
      </div>
      <div className="flex gap-1 justify-end">
        <label htmlFor="author">Author:</label>
        <select
          value={author}
          onChange={authorChanged}
          id="author"
          name="author"
        >
          <option>Select an Author</option>
          {authors.map((author) => {
            return <Author key={author} name={author}></Author>;
          })}
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            intermediateLayerHandler();
          }}
          className="p-1 bg-yellow-600 font-bold"
        >
          Synchronous Add
        </button>
        <button
          disabled={isSynchHasntFired}
          className={
            !isSynchHasntFired
              ? `p-1 bg-green-600 font-bold`
              : `p-1 bg-gray-600 opacity-50 font-bold`
          }
        >
          Redux-Thunk Add
        </button>
      </div>
    </form>
  );
}

export default Form;
