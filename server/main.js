import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/TasksCollection";

function insertTask(taskText) {
  TasksCollection.insert({ text: taskText, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (TasksCollection.find().count() === 0) {
    ["Brush", "Bath", "Jogging", "Breakfast", "College"].forEach(insertTask);
  }
});
