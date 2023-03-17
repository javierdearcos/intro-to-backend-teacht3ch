import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from 'express';
import { BookNotFoundError } from "../errors/bookNotFound.error";

@Catch(BookNotFoundError)
export class BookNotFoundExceptionFilter implements ExceptionFilter {
    catch(bookNotFoundError: BookNotFoundError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response
        .status(HttpStatus.NOT_FOUND)
        .json({
            statusCode: HttpStatus.NOT_FOUND,
            message: bookNotFoundError.message,
            error: 'Not Found'
        });
    }
}