import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "uuid/v4";

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "food", amount: 500 },
  { id: uuid(), charge: "drink", amount: 2600 }
];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);

  return (
    <>
      <Alert />
      <h1>Budget Calculator</h1>

      <main className="App">
        <ExpenseForm />
        <ExpenseList expenses={expenses} />
      </main>

      <h1>
        total spending :{" "}
        <span className="total">
          GHC{" "}
          {expenses.reduce((acc, curr) => {
            return (acc += curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
