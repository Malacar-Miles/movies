import "./sort-and-filter.scss";

import FilterField from "../filter-field/filter-field";
import { categories } from "../../utils/menu-logic/categories";

const SortAndFilter = ({ categoryId, itemId, filter, setFilter }) => {
  const fieldAddValue = (fieldName, newValue) => {
    // Debug code
    // console.log("Field name: " + fieldName);
    // console.log("Field value to add: " + newValue);
    // console.log(filter[fieldName].fieldCurrentValues);

    // If the fieldCurrentValues array doesn't yet contain newValue then update the filter
    if (!filter[fieldName].fieldCurrentValues.includes(newValue)) {
      const updatedFilter = structuredClone(filter);
      updatedFilter[fieldName].fieldCurrentValues.push(newValue);
      setFilter(updatedFilter);
    }
  };

  const fieldRemoveValue = (fieldName, valueToRemove) => {
    // Debug code
    // console.log("field to remove from: " + fieldName);
    // console.log("field value to remove: " + valueToRemove);
    // console.log("field current data: ");
    // console.log(filter[fieldName]);

    // If the fieldCurrentValues array contains valueToRemove then update the filter
    if (filter[fieldName].fieldCurrentValues.includes(valueToRemove)) {
      const updatedFilter = structuredClone(filter);
      updatedFilter[fieldName].fieldCurrentValues = updatedFilter[fieldName]
        .fieldCurrentValues.filter((value) => value !== valueToRemove);
      setFilter(updatedFilter);
    }
  };

  return (
    <div className="filter-box">
      <h1>Placeholder Filter Box</h1>
      <span className="filter-header">Filter by</span>
      <div className="filter-fields-container">
        {
          // Do not show this filter field on Subtitles category page
          categoryId !== categories.subtitles && (
            <FilterField
              fieldName="subs"
              fieldDisplayName="Subs Languages"
              fieldPlaceholderText="Select subs language"
              fieldData={{ ...filter.subs }}
              fieldAddValue={fieldAddValue}
              fieldRemoveValue={fieldRemoveValue}
            />
          )
        }
        {
          // Do not show this filter field on Genre category page unless we're showing All Movies page
          (categoryId !== categories.genre || itemId === "all-movies") && (
            <FilterField
              fieldName="genre"
              fieldDisplayName="Categories"
              fieldPlaceholderText="Select category"
              fieldData={{ ...filter.genre }}
              fieldAddValue={fieldAddValue}
              fieldRemoveValue={fieldRemoveValue}
            />
          )
        }
        {
          // Do not show this filter field on Countries category page
          categoryId !== categories.country && (
            <FilterField
              fieldName="country"
              fieldDisplayName="Countries"
              fieldPlaceholderText="Select country"
              fieldData={{ ...filter.country }}
              fieldAddValue={fieldAddValue}
              fieldRemoveValue={fieldRemoveValue}
            />
          )
        }
        {
          // Do not show this filter field on Decades category page
          categoryId !== categories.decade && (
            <FilterField
              fieldName="decade"
              fieldDisplayName="Decades"
              fieldPlaceholderText="Select decade"
              fieldData={{ ...filter.decade }}
              fieldAddValue={fieldAddValue}
              fieldRemoveValue={fieldRemoveValue}
            />
          )
        }
      </div>
    </div>
  );
};

export default SortAndFilter;
