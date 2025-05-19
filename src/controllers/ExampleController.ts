import { Controller, Get, Post, Route, Tags, Body, Put, Patch, Delete } from 'tsoa';

interface Todo {
  id?: number; // Optional id
  title: string;
  completed: boolean;
}

let todos: Todo[] = [
  { id: 1, title: 'Learn TSOA', completed: false },
  { id: 2, title: 'Build an API', completed: false },
];

@Route('todos')
@Tags('Todos')
export class ExampleController extends Controller {
  /**
   * Get all todos
   */
  @Get('/')
  public async getTodos(): Promise<Todo[]> {
    return todos;
  }

  /**
   * Add a new todo
   * @param todo The todo item to add
   */
  @Post('/')
  public async addTodo(
    @Body() todo: Todo
  ): Promise<{ message: string; todo: Todo }> {
    if (!todo.title || typeof todo.completed !== 'boolean') {
      throw new Error('Invalid request body');
    }

    // Ensure id is generated if not provided
    const newTodo: Todo = { ...todo, id: todos.length + 1 };
    todos.push(newTodo);
    return { message: 'Todo added successfully!', todo: newTodo };
  }

  /**
   * Update an entire todo (replace)
   * @param id The id of the todo to update
   * @param todo The new todo data
   */
  @Put('{id}')
  public async updateTodo(
    id: number,
    @Body() todo: Todo
  ): Promise<{ message: string; todo: Todo }> {
    const idx = todos.findIndex(t => t.id === id);
    if (idx === -1) {
      this.setStatus(404);
      throw new Error('Todo not found');
    }
    const updatedTodo: Todo = { ...todo, id };
    todos[idx] = updatedTodo;
    return { message: 'Todo updated successfully!', todo: updatedTodo };
  }

  /**
   * Partially update a todo
   * @param id The id of the todo to patch
   * @param partial Partial todo data
   */
  @Patch('{id}')
  public async patchTodo(
    id: number,
    @Body() partial: Partial<Todo>
  ): Promise<{ message: string; todo: Todo }> {
    const idx = todos.findIndex(t => t.id === id);
    if (idx === -1) {
      this.setStatus(404);
      throw new Error('Todo not found');
    }
    todos[idx] = { ...todos[idx], ...partial, id };
    return { message: 'Todo patched successfully!', todo: todos[idx] };
  }

  /**
   * Delete a todo
   * @param id The id of the todo to delete
   */
  @Delete('{id}')
  public async deleteTodo(
    id: number
  ): Promise<{ message: string }> {
    const idx = todos.findIndex(t => t.id === id);
    if (idx === -1) {
      this.setStatus(404);
      throw new Error('Todo not found');
    }
    todos.splice(idx, 1);
    return { message: 'Todo deleted successfully!' };
  }
}