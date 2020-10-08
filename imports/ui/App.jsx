import React, { useState } from "react";
import { Task } from "./Task.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import { TaskForm } from "./TaskForm";
import { LoginForm } from "./LoginForm";

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

export const App = () => {
  const [hc, shc] = useState(false);
  const user = useTracker(() => Meteor.user());
  const userFilter = user ? { user: user._id } : {};
  console.log(user && user._id);
  const hcFilter = {
    ...userFilter,
    isChecked: {
      $ne: true,
    },
  };
  console.log(hcFilter);

  const remainingTasks = useTracker(() => {
    if (!user) {
      return;
    }
    return TasksCollection.find({
      ...userFilter,
      isChecked: {
        $ne: true,
      },
    }).count();
  });

  const tasks = useTracker(() => {
    if (!user) {
      return;
    }
    return TasksCollection.find(hc ? hcFilter : userFilter, {
      sort: { createdAt: -1 },
    }).fetch();
  });
  return (
    <div>
      {!user ? (
        <LoginForm />
      ) : (
        <>
          UserName : {user ? user._id : ""}
          <button
            onClick={() => {
              Meteor.logout();
            }}
          >
            Logout
          </button>
          <h1>My ToDo's!</h1>
          <TaskForm user={user} />
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
        </>
      )}
    </div>
  );
};
