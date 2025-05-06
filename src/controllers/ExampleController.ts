import { Controller, Get, Post, Route, Tags, Body } from 'tsoa';

interface Todo {
  id: number;
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
    @Body() todo: { title: string; completed: boolean }
  ): Promise<{ message: string; todo: Todo }> {
    if (!todo.title || typeof todo.completed !== 'boolean') {
      throw new Error('Invalid request body');
    }

    const newTodo: Todo = { id: todos.length + 1, ...todo };
    todos.push(newTodo);
    return { message: 'Todo added successfully!', todo: newTodo };
  }
}