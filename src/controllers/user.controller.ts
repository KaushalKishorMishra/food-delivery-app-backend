import { User_Repository } from "@/repository/user.repository";
import { Bcrypt } from "@services/bcrypt.service";
import { NodeMailer } from "@services/nodemailer.service";
import type { $Enums, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { c_error } from "@utils/chalk.utils";

export class User_Controller {

    private static from_email = "food_delivery@api.com"

    public async fetch_all(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const users: User[] = await User_Repository.fetch_all();

            if (users.length === 0) {
                return res.status(404).json(c_error({ status: 404, message: "users not found" }));
            }
            return res.status(200).json({ status: 200, message: `users found `, data: users });
        } catch (error) {
            next(error);
        }
    }

    public fetch_id = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const id = req.params.id;

            const find_user = await User_Repository.fetch_by_id(id);

            if (!find_user) {
                return res.status(404).json({ status: 404, message: "user not found" });
            }

            return res.status(200).json({ status: 200, message: `user found with id ${id}`, data: find_user });

        } catch (error) {
            next(error)
        }
    }

    public fetch_email = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const email = req.params.email;

            const find_user = await User_Repository.fetch_by_email(email);

            if (!find_user) {
                return res.status(404).json({ status: 404, message: "user not found" });
            }

            return res.status(200).json({ status: 200, message: `user found with email ${email}`, data: find_user });

        } catch (error) {
            next(error)
        }
    }

    public signup = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let find_user: User | null;

        try {
            var input_details = req.body;

            // Check if the user already exists
            find_user = await User_Repository.fetch_by_email(input_details.email);

            if (find_user) {
                return res.status(400).json({ status: 400, message: `user already exists with this ${input_details.email}` });
            }

            find_user = await User_Repository.fetch_by_user_name(input_details.user_name);

            if (find_user) {
                return res.status(400).json({ status: 400, message: `user already exists with this${input_details.user_name}` });
            }

            // hashing password 
            const hashed_password = await Bcrypt.hash_password(input_details.password);

            // updating input_details with hashed password
            input_details = { ...input_details, password: hashed_password };

            // create user
            const create_user = await User_Repository.create(input_details)

            // send mail to verify user
            await NodeMailer.sendMail({
                from: User_Controller.from_email,
                to: create_user.email,
                subject: "Verify Email",
                text: `OTP: ${create_user.id}`,
                html: `<a href="http://localhost:3000/api/user/verify_email/${create_user.id}/${create_user.email}">Click here to verify email</a>`
            })

            if (!create_user) {
                return res.status(400).json({ status: 400, message: "error while creating user" });
            }


            return res.status(201).json({ status: 200, message: "user created successfully", data: create_user });

        } catch (error) {
            next(error);
        }
    }

    public verify_email = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { id, email } = req.params;

            const find_user = await User_Repository.fetch_by_email(email);

            if (!find_user) {
                return res.status(404).json({ status: 404, message: `user not found with ${email}` });
            }

            const update_data: User = { ...find_user, is_verified: true };

            const verify_email = await User_Repository.update(id, update_data);

            if (!verify_email) {
                return res.status(400).json({ status: 400, message: "error while verifying email" });
            }

            return res.status(200).json({ status: 200, message: "email verified successfully", data: verify_email });

        } catch (error) {
            next(error)
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let find_user: User | null;

        try {
            const input_details = req.body;

            // Check if the user already exists
            find_user = await User_Repository.fetch_by_email(input_details.email);

            if (!find_user) {
                return res.status(400).json({ status: 400, message: `user not found with this ${input_details.email}` });
            }

            if (find_user.password !== input_details.password) {
                return res.status(400).json({ status: 400, message: `password is incorrect` });
            }

            return res.status(200).json({ status: 200, message: "user logged in successfully", data: find_user });

        } catch (error) {
            next(error);
        }
    }


}