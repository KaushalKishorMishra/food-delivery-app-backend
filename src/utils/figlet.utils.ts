import figlet from "figlet";

export const figletText = (text: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        figlet(text, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}