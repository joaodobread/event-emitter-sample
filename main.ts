import { EventEmitter } from "./event.ts";

const eventEmitter = new EventEmitter();

eventEmitter.on("user_created", async () => {
  return await new Promise((resolve) => resolve("okokok"));
});

eventEmitter.on("user_created", () => {
  return "User created";
});

const responses = eventEmitter.emit("user_created");

console.log({ r: await Promise.resolve(responses) });
