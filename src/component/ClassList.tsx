import { useState } from "react";
import { CLASS_LIST } from "../consts.ts";
import { Class } from "../types";

type ClassListProps = {
    changeColor : (class_item)=>boolean
}

const ClassList = ({ changeColor }: ClassListProps) => {
  const [selectedClass, setSelectedClass] = useState<Class>();
  
  const handleClassClick = (class_clicked: Class) => {
    setSelectedClass(class_clicked)
  }
  
  const clearSelectedClass = () => {
    setSelectedClass('' as unknown as Class);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        {Object.keys(CLASS_LIST).map((class_list_item: Class) => (
          <div
            key={class_list_item}
            onClick={() => handleClassClick(class_list_item)}
            className={
              changeColor(class_list_item) ? "App-meets-requirement" : ""
            }
          >
            {class_list_item}
          </div>
        ))}
      </div>
      <div>
        {selectedClass ? (
          <div style={{ marginLeft: "10px" }}>
            <h3 style={{ marginTop: "0px" }}>Class's attributes</h3>
            {Object.entries(CLASS_LIST[selectedClass]).map(
              ([attribute, value]) => (
                <span key={attribute}>
                  <li key={attribute}>
                    {attribute} : {value}
                  </li>
                </span>
              )
            )}
            <button onClick={clearSelectedClass}>Clear class</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ClassList