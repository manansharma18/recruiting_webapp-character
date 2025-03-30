import { useState, useEffect } from "react";
import "./App.css";
import { CLASS_LIST, SKILL_LIST } from "./consts.ts";
import { Attributes, Class } from "./types";
import AttributeList from "./component/AttributeList.tsx";
import ClassList from "./component/ClassList.tsx";
import { getURLRequest, saveCharacterPostURL } from "./utils/fetch.ts";

function App() {
  const [attributes, setAttributes] = useState<Attributes>({
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  });
  const [skills, setSkills] = useState<Record<string, number>>(
    Object.fromEntries(SKILL_LIST.map((skill) => [skill.name, 0]))
  );

  const [skillPoints, setSkillPoints] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getURLRequest();
        const data = await res.json();
        if (data?.body?.attributes) setAttributes(data.body.attributes);
        if (data?.body?.skills) setSkills(data.body.skills);
      } catch (err) {
        console.log(err);
     }
    };
     fetchData();
  }, []);
  const saveCharacter = async () => {
    const character = { attributes, skills };
    try {
      await saveCharacterPostURL(character);
    } catch (er) {
      console.log(er);
    }
  };
  const calculateModifier = (attribute: keyof Attributes) =>
    Math.floor((attributes[attribute] - 10) / 2);

  const totalSkillPoints = 10 + 4 * calculateModifier("Intelligence");

  const handleIncreaseAttribute = (attribute: keyof Attributes) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] + 1,
    }));
  };

  const handleDecreaseAttribute = (attribute: keyof Attributes) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: Math.max(0, prev[attribute] - 1),
    }));
  };

  const handleIncreaseSkill = (skill: string) => {
    setSkills((prevSkills) => ({
      ...prevSkills,
      [skill]: prevSkills[skill] + 1,
    }));
    setSkillPoints((skillPoints) => skillPoints - 1);
  };

  const handleDecreaseSkill = (skill: string) => {
    if (skills[skill] > 0) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [skill]: prevSkills[skill] - 1,
      }));
      setSkillPoints((skillPoints) => skillPoints + 1);
    }
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
            calculateModifier={calculateModifier}
          />
        </section>
        <section className="App-section">
          <ClassList changeColor={changeColor} />
        </section>
        <section className="App-section">
          Total skill points available:{" "}
          {totalSkillPoints -
            Object.values(skills).reduce((prev, curr) => prev + curr)}
          {SKILL_LIST.map(
            ({ name, attributeModifier }) => (
              <div key={name}>
                {name}:{skills[name]} (Modified {attributeModifier}) :
                {calculateModifier(attributeModifier as keyof Attributes)}
                <button
                  id={name}
                  onClick={() => {
                    handleIncreaseSkill(name);
                  }}
                >
                  +
                </button>
                <button
                  id={name}
                  onClick={() => {
                    handleDecreaseSkill(name);
                  }}
                >
                  -
                </button>
                total :
                {skills[name] +
                  calculateModifier(attributeModifier as keyof Attributes)}
              </div>
            ),
            []
          )}
        </section>
        <button id="save" onClick={saveCharacter}>
          Save Character
        </button>
      </div>
    </div>
  );
}

export default App;
