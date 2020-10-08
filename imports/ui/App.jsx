import React, { useState } from "react";
import { Task } from "./Task.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import { TaskForm } from "./TaskForm";

const toogleClicked = ({ _id, isChecked }) => {
  //console.log(_id, isChecked);
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked,
    },
  });
};
const onDeleteClick = ({ _id }) => {
  TasksCollection.remove(_id);
};

const hcFilter = {
  isChecked: {
    $ne: true,
  },
};
console.log(
  TasksCollection.find({
    isChecked: {
      $ne: true,
    },
  }).count()
);

export const App = () => {
  const [hc, shc] = useState(false);
  const remainingTasks = useTracker(() =>
    TasksCollection.find({
      isChecked: {
        $ne: true,
      },
    }).count()
  );

  const tasks = useTracker(() =>
    TasksCollection.find(hc ? hcFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );
  return (
    <div>
      <h1>My ToDo's!</h1>
      <TaskForm />
      <span>Tasks to be Completed : {remainingTasks} </span>
      <ul>
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            toogleClicked={toogleClicked}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </ul>
      <button
        onClick={() => {
          shc(!hc);
        }}
      >
        {hc ? "Show" : "Hide"}
      </button>
    </div>
  );
};
