import "./filter-field.scss";

import { useState } from "react";

const FilterField = ({
  fieldName,
  fieldDisplayName,
  fieldPlaceholderText,
  fieldData,
  fieldAddValue,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { fieldCurrentValues, fieldPossibleValues } = fieldData;

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (clickEvent) => {
    const clickedItemName = clickEvent.target.innerText;
    setIsMenuOpen(false);
    fieldAddValue(fieldName, clickedItemName)
  };

  return (
    <div className="filter-field">
      <span className="filter-field-name">{fieldDisplayName}</span>
      <div className="filter-field-content" onClick={handleMenuClick}>
        {fieldPlaceholderText}
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
