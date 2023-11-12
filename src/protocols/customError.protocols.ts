export class CustomError {
    constructor(
        public name: string,
        public message: string,
        public status: number
    ) {};
};