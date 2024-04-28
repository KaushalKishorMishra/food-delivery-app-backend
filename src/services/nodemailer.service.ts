import { IEmail } from '@/interfaces/email.interface';
import { NODEMAILER_HOST, NODEMAILER_PASS, NODEMAILER_PORT, NODEMAILER_USER } from '@config';
import * as nodeMailer from 'nodemailer';

export class NodeMailer {
    public static transporter: nodeMailer.transporter

    private static initializeTransporter() {
        NodeMailer.transporter = nodeMailer.createTransport({
            host: NODEMAILER_HOST,
            port: parseInt(NODEMAILER_PORT),
            secure: false,
            auth: {
                user: NODEMAILER_USER,
                pass: NODEMAILER_PASS
            }
        })
    }

    static async sendMail(email: IEmail): Promise<void> {
        if (!NodeMailer.transporter) {
            NodeMailer.initializeTransporter()
        }
        try {
            const mailOptions = {
                from: email.from,
                to: email.to,
                subject: email.subject,
                text: email.text,
                html: email.html
            }

            const send_mail = await NodeMailer.transporter.sendMail(mailOptions)

            console.log('Message sent: %s', send_mail.messageId)

        } catch (error) {
            throw new Error("Error Sending Mail: ", error)
        }
    }
}