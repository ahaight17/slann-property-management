import Select from "shared/Select/Select";

const TabFilters = (props:any) => {

  const renderXClear = () => {
    return (
      <span className="w-4 h-4 rounded-full bg-primary-5000 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const renderPriceSort = () => {
    return (
      <div>
        <Select onChange={(e) => props.setSort(parseInt(e.target.value))}>
          <option value={0}>Rent: Low to High</option>
          <option value={1}>Rent: High to Low</option>
          <option value={2}>Address: A to Z</option>
          <option value={3}>Address: Z to A</option>
          <option value={4}>Dist. to Campus: Asc</option>
          <option value={5}>Dist. to Campus: Desc</option>
          <option value={6}>Availability: Asc</option>
          <option value={7}>Availability: Desc</option>
        </Select>
      </div>
    );
  }

  const renderTabAvailable = () => {
    return (
      <div
        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer transition-all ${
          props.propertyAvailable
            ? "border-primary-500 bg-primary-500"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
        onClick={() => props.setPropertyAvailable(!props.propertyAvailable)}
      >
        <span>Available</span>
        {props.propertyAvailable && renderXClear()}
      </div>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      <div className="hidden lg:flex space-x-4 items-center">
        {renderPriceSort()}
        {renderTabAvailable()}
      </div>
      <div className="flex lg:hidden space-x-4 items-center">
        {renderPriceSort()}
        {renderTabAvailable()}
      </div>
    </div>
  );
};

export default TabFilters;
