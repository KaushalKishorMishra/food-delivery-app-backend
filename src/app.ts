import express from 'express';
import { connectDatabase } from '@database';
import { LOG_FORMAT, PORT } from '@config';
import { IRoute } from '@interfaces/routes.interface';

import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { figletText } from '@utils/figlet.utils';
import { c_error, info, success, warning } from '@utils/chalk.utils';
import { logger } from './services/logger.service';


export class App {
    public app: express.Application;
    public port: number | string;
    public developer: string = 'Kaushal Kishor Mishra';

    constructor(routes: IRoute[]) {
        this.app = express();
        this.port = PORT ? parseInt(PORT) : 3000;
        this.initializeConnection();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }

    private initializeMiddlewares() {
        this.app.use(morgan(LOG_FORMAT));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    private async initializeConnection() {
        await connectDatabase();
    }

    public listen() {
        this.app.get('/', (req, res) => {
            res.send(success('Hello to my food delivery app backend!!!'));
        })
        this.app.listen(this.port, async () => {
            logger.info(success(`______________________ 🚀 App listening on the port ${this.port}!!! ✔️ ______________________\n`))
            console.log(info(await figletText(`Food Delivery App`)))
        });
    }

    private initializeRoutes(routes: IRoute[]) {
        routes.forEach(route => {
            this.app.use('/api', route.router);
        });
    }
}