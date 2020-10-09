import { check } from "meteor/check";
import { TasksCollection } from "../db/TasksCollection.js";

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);
    if (!this.userId) {
      throw new Meteor.error("Unauthorized");
    }
    TasksCollection.insert({
      text: text,
      user: this.userId,
      createdAt: new Date(),
    });
  },
  "tasks.remove"(taskId) {
    check(taskId, String);
    if (!this.userId) {
      throw new Meteor.error("Unauthorized");
    }
    TasksCollection.remove(taskId);
  },
  "tasks.update"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);
    if (!this.userId) {
      throw new Meteor.error("Unauthorized");
    }

    TasksCollection.update(taskId, {
      $set: { isChecked },
    });
  },
});
