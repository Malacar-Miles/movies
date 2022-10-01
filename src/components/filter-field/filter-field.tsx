import "./filter-field.scss";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import FilterFieldValue from "../filter-field-value/filter-field-value";
import {
  addValueToField,
  removeValueFromField,
  selectFieldCurrentValues,
  selectFieldPossibleValues,
} from "../../utils/redux/filter-slice";
import { numberOrString } from "../../utils/menu-logic/filter";

const FilterField = ({
  fieldName,
  fieldDisplayName,
  fieldPlaceholderText,
}: {
  fieldName: string;
  fieldDisplayName: string;
  fieldPlaceholderText: string;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const fieldCurrentValues = useSelector(selectFieldCurrentValues(fieldName));
  const fieldPossibleValues = useSelector(selectFieldPossibleValues(fieldName));

  const fieldAddValue = (fieldName: string, newValue: numberOrString) => {
    dispatch(addValueToField({ fieldName: fieldName, newValue: newValue }));
  };

  const fieldRemoveValue = (fieldName: string, valueToRemove: numberOrString) => {
    dispatch(
      removeValueFromField({
        fieldName: fieldName,
        valueToRemove: valueToRemove,
      })
    );
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (clickEvent: React.MouseEvent<HTMLElement>) => {
    const clickedItemName = (clickEvent.target as HTMLElement).innerText;
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
