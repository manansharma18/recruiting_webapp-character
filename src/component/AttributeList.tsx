import { ATTRIBUTE_LIST } from "../consts";
import { Attributes } from "../types";

type AttributesProps = {
  attributes: Attributes;
  handleIncreaseAttribute: (attribute) => void;
  handleDecreaseAttribute: (attribute) => void;
  calculateModifier: (attribute) => number;
};

const AttributeList = ({
  attributes,
  handleIncreaseAttribute,
  handleDecreaseAttribute,
  calculateModifier,
}: AttributesProps) => {
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
