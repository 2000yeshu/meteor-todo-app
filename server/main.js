import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "/imports/db/TasksCollection";
import { taskMethods } from "/imports/api/taskMethods";

const def_user = "ROOT";
const def_pass = "password";

function insertTask(taskText, user) {
  TasksCollection.insert({
    text: taskText,
    user: user._id,
    createdAt: new Date(),
  });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (!Accounts.findUserByUsername(def_user)) {
    Accounts.createUser({
      username: def_user,
      password: def_pass,
    });
  }
  const user = Accounts.findUserByUsername(def_user);

  if (TasksCollection.find().count() === 0) {
    ["Brush", "Bath", "Jogging", "Breakfast", "College"].forEach((taskText) =>
      insertTask(taskText, user)
    );
  }
});
