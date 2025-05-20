export interface Todo {
  id?: number;
  title: string;
  completed: boolean;
}

export interface PatchTodoDto {
  title?: string;
  completed?: boolean;
}

let todos: Todo[] = [
  { id: 1, title: 'Learn TSOA', completed: false },
  { id: 2, title: 'Build an API', completed: false },
];

export class TodoService {
  public getAll(): Todo[] {
    return todos;
  }

  public getById(id: number): Todo | undefined {
    return todos.find(t => t.id === id);
  }

  public add(todo: Todo): Todo {
    const newTodo: Todo = { ...todo, id: todos.length + 1 };
    todos.push(newTodo);
    return newTodo;
  }

  public update(id: number, todo: Todo): Todo | undefined {
    const idx = todos.findIndex(t => t.id === id);
    if (idx === -1) return undefined;
    const updatedTodo: Todo = { ...todo, id };
    todos[idx] = updatedTodo;
    return updatedTodo;
  }

  public patch(id: number, partial: PatchTodoDto): Todo | undefined {
    const idx = todos.findIndex(t => t.id === id);
    if (idx === -1) return undefined;
    todos[idx] = { ...todos[idx], ...partial, id };
    return todos[idx];
  }

  public delete(id: number): boolean {
    const idx = todos.findIndex(t => t.id === id);
    if (idx === -1) return false;
    todos.splice(idx, 1);
    return true;
  }
}