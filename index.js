import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
});

let myusername=process.env.user_name;

console.log("Value=",myusername);

console.log("start of backend Project a new journey");
