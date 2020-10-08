import React from "react";

export const Task = ({ task, toogleClicked, onDeleteClick }) => {
  //console.log("init");
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => toogleClicked(task)}
        readOnly
      />
      {task.text}
      <button onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
  );
};
