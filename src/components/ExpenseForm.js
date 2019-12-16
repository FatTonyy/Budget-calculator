import React from "react";
import { MdSend } from "react-icons/md";

export default function ExpenseForm() {
  return (
    <form>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="e.g booze money"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="e.g 200"
          />
        </div>
      </div>

      <button type="submit" className="btn">
        submit <MdSend className="btn-icon" />
      </button>
    </form>
  );
}
