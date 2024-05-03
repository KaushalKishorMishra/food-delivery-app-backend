import { LOG_DIR } from "@config";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import winston, { level } from "winston";
import winstonDaily from "winston-daily-rotate-file";

const log_dir: string = join(__dirname, LOG_DIR);

if (!existsSync(log_dir)) {
    mkdirSync(log_dir);
}

const log_format = winston.format.printf(
    ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
)

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        log_format
    ),

    transports: [
        new winstonDaily({
            level: "debug",
            datePattern: "YYYY-MM-DD",
            dirname: log_dir,
            filename: "%DATE%.log",
            maxFiles: 30,
            zippedArchive: true,
            json: true
        }),
        new winstonDaily({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: log_dir,
            filename: "%DATE%.error.log",
            maxFiles: 30,
            zippedArchive: true,
            json: true
        })
    ]
})

logger.add(
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            winston.format.splat()
        )
    })
)

const stream = {
    write: (message: string) => {
        logger.info(message.substring(0, message.lastIndexOf("\n")))
    }
}

export { logger, stream }


