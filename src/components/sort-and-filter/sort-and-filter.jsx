import "./sort-and-filter.scss";

import FilterField from "../filter-field/filter-field";

const SortAndFilter = ({ filter, setFilter }) => {

  const fieldAddValue = (fieldName, newValue) => {
    // console.log("Field name: " + fieldName);
    // console.log("Field value to add: " + newValue);
    // console.log(filter[fieldName].fieldCurrentValues);

    // If the fieldCurrentValues array doesn't yet contain newValue, then update the filter
    if (!filter[fieldName].fieldCurrentValues.includes(newValue)) {
      const updatedFilter = structuredClone(filter);
      updatedFilter[fieldName].fieldCurrentValues.push(newValue);
      setFilter(updatedFilter);
    }
  };

  return (
    <div className="filter-box">
      <h1>Placeholder Filter Box</h1>
      <span className="filter-header">Filter by</span>
      <FilterField
        fieldName="genre"
        fieldDisplayName="Categories"
        fieldPlaceholderText="Select category"
        fieldData={{ ...filter.genre }}
        fieldAddValue={fieldAddValue}
      />
    </div>
  );
};

export default SortAndFilter;
