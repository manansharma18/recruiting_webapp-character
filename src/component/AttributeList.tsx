import { ATTRIBUTE_LIST } from "../consts";
import { Attributes } from "../types";

type AttributesProps = {
  attributes: Attributes;
  handleIncreaseAttribute: (attribute) => void;
  handleDecreaseAttribute: (attribute) => void;
};

const AttributeList = ({
  attributes,
  handleIncreaseAttribute,
  handleDecreaseAttribute,
}: AttributesProps) => {
  const calculateModifier = (attribute: keyof Attributes) => {
    // derived state
    if (attributes[attribute] > 10) {
      return Math.floor((attributes[attribute] - 10) / 2);
    } else if (attributes[attribute] < 10) {
      return Math.floor((attributes[attribute] - 10) / 2);
    }
    return 0;
  };

  return (
    <>
      {ATTRIBUTE_LIST.map((attribute: keyof Attributes) => {
        return (
          <div key={attribute}>
            {attribute} Value:
            {attributes[attribute]}
            (Modifier :{calculateModifier(attribute)})
            <button
              id={attribute}
              onClick={() => handleIncreaseAttribute(attribute)}
            >
              +
            </button>
            <button
              id={attribute}
              onClick={() => handleDecreaseAttribute(attribute)}
            >
              -
            </button>
          </div>
        );
      })}
    </>
  );
};

export default AttributeList;
