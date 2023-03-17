import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDTO } from './dtos/book.dto';
import { Book } from './entities/book.entity';
import { BookNotFoundError } from './errors/bookNotFound.error';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)private readonly booksRepository: Repository<Book> 
    ) {}

    async findAllBooks(): Promise<BookDTO[]> {
        return this.booksRepository.find();
    }

    async findBook(id: number): Promise<BookDTO> {
        const book = await this.booksRepository.findOneBy({id});

        if (!book) {
            throw new BookNotFoundError(id);
        }

        return book;
    }

    async createBook(book: BookDTO): Promise<BookDTO> {
        const newBook = this.booksRepository.create({
            ...book
        });
        await this.booksRepository.save(book);

        return newBook;
    }

    async updateBook(id: number, updatedBook: BookDTO): Promise<BookDTO> {
        const book = this.findBook(id);
        const bookToUpdate = await this.booksRepository.preload({
            ...book, 
            ...updatedBook,
            id
        });
        await this.booksRepository.save(bookToUpdate);
        return bookToUpdate;
    }

    async deleteBook(id: number) {
        const book = await this.findBook(id);
        this.booksRepository.delete(book);
    }
}
