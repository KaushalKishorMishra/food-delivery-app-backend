import { App } from "./app";
import { User_Route } from "@routes/user.route";

const app = new App(
    [
        new User_Route()
    ]
);

app.listen();