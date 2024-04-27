import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectDatabase = async () => {
    try {
        await prisma.$connect()
            .then(() => {
                console.log({ message: 'database connected successfully', status: 200 })
            })
    } catch (error) {
        console.log('Database connection failed', error);
        throw new Error('Database connection failed', error);
    }
}

export { connectDatabase, prisma };