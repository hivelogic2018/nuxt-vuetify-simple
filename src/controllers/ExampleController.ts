import { Controller, Get, Post, Route, Tags, Body } from 'tsoa';

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
}