import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  // create a new Todo
  async create(createTodoDto: CreateTodoDto) {
    const { title, isDone } = createTodoDto;
    const todo = await this.prisma.todo.create({
      data: {
        title,
        isDone,
      },
    });

    return { message: 'Todo created succefully', data: todo };
  }

  // get all Todos
  async findAll() {
    const allTodos = await this.prisma.todo.findMany();
    return { data: allTodos };
  }

  // get a single Todo
  async findOne(todoId: string) {
    const singleTodo = await this.prisma.todo.findUnique({
      where: { id: todoId },
    });
    return { data: singleTodo };
  }

  // update a single Todo
  async update(todoId: string, updateTodoDto: UpdateTodoDto) {
    const { title, isDone } = updateTodoDto;
    const updated = await this.prisma.todo.update({
      where: { id: todoId },
      data: {
        title,
        isDone,
      },
    });
    return { message: 'Updated successfully', data: updated };
  }

  // delete a Todo
  async remove(todoId: string) {
    await this.prisma.todo.delete({
      where: { id: todoId },
    });
    return { message: 'Todo delted successfully' };
  }
}
