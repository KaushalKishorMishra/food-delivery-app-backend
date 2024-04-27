import express from 'express';
import { connectDatabase } from '@database';
import { PORT } from '@config';


export class App {
    public app: express.Application;
    public port: number | string;

    constructor() {
        this.app = express();
        this.port = PORT ? parseInt(PORT) : 3000;
        this.initializeConnection();

    }

    private async initializeConnection() {
        await connectDatabase();
    }

    public listen() {
        this.app.get('/', (req, res) => {
            res.send('Hello to my food delivery app backend!!!');
        })
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}!!!`);
        });
    }
}