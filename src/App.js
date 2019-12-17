import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "uuid/v4";

// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1600 },
//   { id: uuid(), charge: "Fufu Joint", amount: 500 },
//   { id: uuid(), charge: "Booze Moolah", amount: 2600 }
// ];

// * localStorage.getItem('item name')
// * localStorage.setItem('item name')

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  // ! ***** State Values ************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);

  // single expense
  const [charge, setCharge] = useState("");

  // single amount
  const [amount, setAmount] = useState("");

  // ! ********Edit section *********
  // edit
  const [edit, setEdit] = useState(false);

  // edit item
  const [id, setId] = useState(0);
  //!##### Alert function ######
  const [alert, setAlert] = useState({ show: false });

  // ! *****  useEffect ******************
  useEffect(() => {
    console.log("called useEffect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // ! *****  Functionality ******************
  // handleCharge
  const handleCharge = e => {
    setCharge(e.target.value);
  };

  // handleAmount
  const handleAmount = e => {
    setAmount(e.target.value);
  };

  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  // handleSubmit

  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      //
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item Edited" });
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      // handle alert called
      handleAlert({
        type: "danger",
        text: `charge cant be an empty value and amount value has to be bigger than zero`
      });
    }
  };

  // Clear all items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };

  // handle delete (delete-single item)
  const handleDelete = id => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };

  // handle edit (edit-single item)
  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {/* Alert expression */}
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <Alert />
      <h1>Budget Calculator</h1>

      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>

      <h1>
        total spending :{" "}
        <span className="total">
          GHC{" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
