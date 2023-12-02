// eslint-disable-next-line react/prop-types
function PostExcerpt({ post }) {
  // eslint-disable-next-line react/prop-types
  const { id, title, content, author } = post;

  return (
    <li className="mb-3">
      <div className="text-left mx-4 mt-1 ring ring-white rounded-full w-max px-2">
        {id}
      </div>
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
      <div className="text-right mr-5 text-sm italic opacity-50">{author}</div>
      <div className="flex justify-end gap-2 text-right mr-2">
        <button className="p-1">Update</button>
        <button className="p-1 bg-red-600 font-bold">Delete</button>
      </div>
    </li>
  );
}

export default PostExcerpt;
