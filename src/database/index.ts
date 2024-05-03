import { success, c_error } from '@/utils/chalk.utils';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectDatabase = async () => {
    try {
        await prisma.$connect()
            .then(() => {
                console.log(success('\n______________________ 🚀 Database connected successfully!!! ✔️ _____________________'))

            })
    } catch (error) {
        console.log(c_error('Database connection failed', error));
    }
}

export { connectDatabase, prisma };