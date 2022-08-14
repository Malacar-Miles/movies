import "./filter-field-value.scss";

const FilterFieldValue = ({ fieldName, fieldValue, fieldRemoveValue }) => {
  const handleRemoveButtonClick = (clickEvent) => {
    clickEvent.stopPropagation();
    fieldRemoveValue(fieldName, fieldValue);
  };

  return (
    <div className="filter-field-value">
      <button className="remove-button" onClick={handleRemoveButtonClick}>x</button>
      <span className="value-text">{fieldValue}</span>
    </div>
  );
};

export default FilterFieldValue;