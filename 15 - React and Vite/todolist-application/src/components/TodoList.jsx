import { useState } from "react";

function TodoList() {
  // [] - todo Array
  // ['Todo1', 'Todo2', 'Todo3']
  // useState()
  // [element1, element2]
  // element1 - current state of the value
  // element2 - function that updates the value of element1
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // todos = []
  // inputValue = ""

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a todo..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
export default TodoList;
