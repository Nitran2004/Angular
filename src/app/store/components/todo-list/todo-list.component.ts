import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTodo, toggleTodo, deleteTodo } from '../../store/todo.actions';
import { selectAllTodos, selectTodoCount } from '../../store/todo.selectors';
import { Todo } from '../../store/todo.state';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;
  todoCount$: Observable<number>;
  newTodoText: string = '';

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
    this.todoCount$ = this.store.select(selectTodoCount);
  }

  addTodo() {
    if (this.newTodoText.trim()) {
      this.store.dispatch(addTodo({ text: this.newTodoText }));
      this.newTodoText = '';
    }
  }

  toggleTodo(id: number) {
    this.store.dispatch(toggleTodo({ id }));
  }

  deleteTodo(id: number) {
    this.store.dispatch(deleteTodo({ id }));
  }
}