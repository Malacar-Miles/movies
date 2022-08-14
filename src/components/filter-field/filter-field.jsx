import "./filter-field.scss";

import { useState } from "react";

import FilterFieldValue from "../filter-field-value/filter-field-value";

const FilterField = ({
  fieldName,
  fieldDisplayName,
  fieldPlaceholderText,
  fieldData,
  fieldAddValue,
  fieldRemoveValue,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { fieldCurrentValues, fieldPossibleValues } = fieldData;

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (clickEvent) => {
    const clickedItemName = clickEvent.target.innerText;
    setIsMenuOpen(false);
    fieldAddValue(fieldName, clickedItemName);
  };

  return (
    <div className="filter-field">
      <span className="filter-field-name">{fieldDisplayName}</span>
      <div className="filter-field-content" onClick={handleMenuClick}>
        {
          // If fieldCurrentValues exists, render the following
          fieldCurrentValues &&
            // If fieldCurrentValues is empty, render placeholder text, else render the values
            (fieldCurrentValues.length === 0 ? (
              <span className="placeholder-text">{fieldPlaceholderText}</span>
            ) : (
              fieldCurrentValues.map((value, index) => (
                <FilterFieldValue
                  key={index}
                  fieldName={fieldName}
                  fieldValue={value}
                  fieldRemoveValue={fieldRemoveValue}
                />
              ))
            ))
        }
      </div>
      {isMenuOpen && (
        <div className="menu">
          {fieldPossibleValues.map((value, index) => (
            <span
              key={index}
              className="menu-item"
              onClick={handleMenuItemClick}
            >
              {value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterField;
