import "./filter-field-value.scss";

const FilterFieldValue = ({
  fieldName,
  fieldValue,
  fieldRemoveValue,
}: {
  fieldName: string;
  fieldValue: number | string;
  fieldRemoveValue: (fieldName: string, valueToRemove: number | string) => void;
}) => {
  const handleRemoveButtonClick = (clickEvent: React.MouseEvent<HTMLButtonElement>) => {
    clickEvent.stopPropagation();
    fieldRemoveValue(fieldName, fieldValue);
  };

  return (
    <div className="filter-field-value">
      <button className="remove-button" onClick={handleRemoveButtonClick}>
        &#10006;
      </button>
      <span className="value-text">{fieldValue}</span>
    </div>
  );
};

export default FilterFieldValue;