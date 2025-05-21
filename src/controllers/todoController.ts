import { Controller, Get, Post, Route, Tags, Body, Put, Patch, Delete } from 'tsoa';
import { TodoService, Todo, PatchTodoDto } from '@/services/TodoService';

@Route('todos')
@Tags('Todos')
export class ExampleController extends Controller {
  private readonly service = new TodoService();

  @Get('/')
  public async getTodos(): Promise<Todo[]> {
    return this.service.getAll();
  }

  @Get('{id}')
  public async getTodoById(id: number): Promise<Todo> {
    const todo = this.service.getById(id);
    if (!todo) {
      this.setStatus(404);
      throw new Error('Todo not found');
    }
    return todo;
  }

  @Post('/')
  public async addTodo(@Body() todo: Todo): Promise<{ message: string; todo: Todo }> {
    if (!todo.title || typeof todo.completed !== 'boolean') {
      throw new Error('Invalid request body');
    }
    const newTodo = this.service.add(todo);
    return { message: 'Todo added successfully!', todo: newTodo };
  }

  @Put('{id}')
  public async updateTodo(
    id: number,
    @Body() todo: Todo
  ): Promise<{ message: string; todo: Todo }> {
    const updatedTodo = this.service.update(id, todo);
    if (!updatedTodo) {
      this.setStatus(404);
      throw new Error('Todo not found');
    }
    return { message: 'Todo updated successfully!', todo: updatedTodo };
  }

  @Patch('{id}')
  public async patchTodo(
    id: number,
    @Body() partial: PatchTodoDto
  ): Promise<{ message: string; todo: Todo }> {
    const patchedTodo = this.service.patch(id, partial);
    if (!patchedTodo) {
      this.setStatus(404);
      throw new Error('Todo not found');
    }
    return { message: 'Todo patched successfully!', todo: patchedTodo };
  }

  @Delete('{id}')
  public async deleteTodo(id: number): Promise<{ message: string }> {
    const deleted = this.service.delete(id);
    if (!deleted) {
      this.setStatus(404);
      throw new Error('Todo not found');
    }
    return { message: 'Todo deleted successfully!' };
  }
}