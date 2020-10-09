import React, { useState } from "react";
import { TasksCollection } from "../db/TasksCollection";

export const TaskForm = ({ user }) => {
  const [text, setText] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") return;
    Meteor.call("tasks.insert", text.trim());
    // TasksCollection.insert({
    //   text: text.trim(),
    //   user: user._id,
    //   createdAt: new Date(),
    // });
    setText("");
  };

  return (
    <form onSubmit={onSubmit} className="task-form">
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      <button type="submit">Add Task</button>
    </form>
  );
};
