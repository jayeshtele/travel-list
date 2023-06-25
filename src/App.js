import React, { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeletedItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form additems={handleAddItems} />
      <PackingList
        items={items}
        deleteItem={handleDeletedItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ additems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    additems(newItem);

    setDescription("");
    setQuantity("");
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🤩 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, deleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item, i) => (
          <Item
            item={item}
            deleteItem={deleteItem}
            key={i}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, deleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => deleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;

  return (
    <footer className="stats">
      <em>💼 You have {numItems} items on your list and you already packed x (x%)</em>
    </footer>
  );
}
