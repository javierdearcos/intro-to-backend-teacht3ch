import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, UseFilters } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './dtos/book.dto';
import { BookNotFoundExceptionFilter } from './exceptonFilters/bookNotFoundException.filter';

@Controller('books')
@UseFilters(BookNotFoundExceptionFilter)
export class BooksController {

    constructor(
        private booksService: BooksService
    ) {}

    @Get()
    async findAllBooks(): Promise<BookDTO[]> {
        return this.booksService.findAllBooks();
    }

    @Get(':id')
    async findBook(@Param('id', ParseIntPipe) id: number): Promise<BookDTO> {
        return this.booksService.findBook(id);
    }

    @Post()
    async createBook(@Body() newBook: BookDTO): Promise<BookDTO> {
        return this.booksService.createBook(newBook);
    }

    @Put(':id')
    @Patch(':id')
    async updateBook(@Param('id', ParseIntPipe) id: number, @Body() updatedBook: BookDTO): Promise<BookDTO> {
        return this.booksService.updateBook(id, updatedBook);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteBook(@Param('id', ParseIntPipe) id: number) {
        this.booksService.deleteBook(id);
    }

}
