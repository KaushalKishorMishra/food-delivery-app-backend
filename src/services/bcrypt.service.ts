import bcrypt from 'bcrypt';

export class Bcrypt {
    private static saltRounds = 10;

    public static async hash_password(plain_password: string, saltRounds: number = this.saltRounds): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(plain_password, saltRounds, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            })
        })
    }

    public static async compare_password(plain_password: string, hashed_password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plain_password, hashed_password, (err, result) => {
                if (err) {
                    reject(err);
                }
                if (!result) {
                    reject(new Error('email or password does not match'));
                }
                resolve(result);
            })
        })
    }
}