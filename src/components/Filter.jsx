function Filter() {
  return (
    <div className="flex gap-3 w-full">
      <div className="flex flex-col pl-1 mb-5">
        <label className="text-left pl-2" htmlFor="search">
          Search
        </label>
        <input className="rounded-xl bg-white text-black pl-2"></input>
      </div>
      <div className="flex-1 flex flex-col">
        <label className="">Filter</label>
        <select className="w-max self-center">
          <option>Ascending</option>
          <option>Descending</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
