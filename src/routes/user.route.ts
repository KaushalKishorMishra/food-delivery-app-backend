import { User_Controller } from "@controllers/user.controller";
import { Router } from "express";

export class User_Route {
    public user = new User_Controller();
    public router = Router();
    public path = "/users";

    constructor() {
        this.initialize();
    }

    public initialize() {
        this.post_routes();
        this.get_routes();
    }

    private post_routes() {
        this.router.post(`${this.path}/signup`, this.user.signup);
        this.router.get(`${this.path}/test`, () => console.log("test"))
    }

    private get_routes() {
        this.router.get(`${this.path}`, this.user.fetch_all);

    }
}