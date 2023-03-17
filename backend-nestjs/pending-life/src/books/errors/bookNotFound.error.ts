
export class BookNotFoundError extends Error {
    constructor(id: number) {
        super(`Book with id ${id} not found`);
        Object.setPrototypeOf(this, BookNotFoundError.prototype);
    }
}