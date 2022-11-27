import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { randomColor } from "randomcolor";
import Draggable from "react-draggable";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  });

  const newItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: v4(),
        item,
        color: randomColor(),
      };
      setItems((items) => [...items, newItem]);
      setItem("");
    } else {
      alert("Enter something...");
      setItem("");
    }
  };

  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updatePos = (data, index) => {
    let newArr = [...items];
    newArr[index].defaultPosition = { x: data.x, y: data.y };
    setItems(newArr);
  };

  const keyPress = (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      newItem();
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <input
          value={item}
          type="text"
          placeholder="Enter something..."
          onChange={(e) => setItem(e.target.value)}
          onKeyPress={(e) => keyPress(e)}
        />
        <button className="enter" onClick={newItem}>
          Enter
        </button>
      </div>

      {items.map((item, index) => {
        return (
          <Draggable
            key={index}
            handle=".todo__item"
            positionOffset={{ x: 500, y: -100 }}
            grid={[25, 25]}
            onStop={(_, data) => {
              updatePos(data, index);
            }}
          >
            <div className="todo__item" style={{ backgroundColor: item.color }}>
              {`${item.item}`}
              <button onClick={() => deleteNode(item.id)} className="delete">
                X
              </button>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export default App;
