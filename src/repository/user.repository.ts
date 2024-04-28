import { prisma } from "@database";
import { User } from "@prisma/client";

export class User_Repository {

    public static async fetch_all(): Promise<User[]> {
        return await prisma.user.findMany();
    }

    public static async fetch_by_id(id: string): Promise<User> {
        return await prisma.user.findUnique({ where: { id } });
    }

    public static async fetch_by_email(email: string): Promise<User> {
        return await prisma.user.findUnique({ where: { email } });
    }

    public static async fetch_by_user_name(user_name: string): Promise<User> {
        return await prisma.user.findUnique({ where: { user_name } });
    }

    public static async create(input_data: User): Promise<User> {
        return await prisma.user.create({ data: input_data });
    }

    public static async update(id: string, update_data: User): Promise<User> {
        return await prisma.user.update({ where: { id }, data: update_data });
    }

    public static async soft_delete(id: string): Promise<User> {
        return await prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });
    }

    public static async hard_delete(id: string): Promise<User> {
        return await prisma.user.delete({ where: { id } });
    }

    public static async restore(id: string): Promise<User> {
        return await prisma.user.update({ where: { id }, data: { deletedAt: null } });
    }


}