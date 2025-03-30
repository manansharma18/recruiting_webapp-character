import React from "react";
import { CLASS_LIST } from "../consts";
import { Class } from "../types";
type ClassListProps = {
    changeColor : (class_item)=>boolean
}
const ClassList = ({ changeColor }: ClassListProps) => {
  return (
    <>
      {Object.keys(CLASS_LIST).map((class_list_item: Class) => (
        <div
          key={class_list_item}
          className={
            changeColor(class_list_item) ? "App-meets-requirement" : ""
          }
        >
          {class_list_item}
        </div>
      ))}
    </>
  );
};

export default ClassList