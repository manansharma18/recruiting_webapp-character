import { useState } from "react";
import "./App.css";
import { CLASS_LIST } from "./consts.ts";
import { Attributes, Class } from "./types";
import AttributeList from "./component/AttributeList.tsx";
import ClassList from "./component/ClassList.tsx";

function App() {
  const [attributes, setAttributes] = useState<Attributes>({
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  });
  const handleIncreaseAttribute = (attribute: keyof Attributes) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] + 1,
    }));
  };

  const handleDecreaseAttribute = (attribute: keyof Attributes) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: Math.max(0,prev[attribute] - 1),
    }));
  };

  const changeColor = (class_in_list: Class) => {
    const classRequirements = CLASS_LIST[class_in_list];
    const output = Object.entries(classRequirements).every(
      ([attr, value]) => attributes[attr as keyof Attributes] >= value
    );
    return output;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <section className="App-section">
          <AttributeList
            attributes={attributes}
            handleDecreaseAttribute={handleDecreaseAttribute}
            handleIncreaseAttribute={handleIncreaseAttribute}
          />
        </section>
        <section className="App-section">
          <ClassList changeColor ={changeColor}/>
        </section>
      </div>
    </div>
  );
}

export default App;
