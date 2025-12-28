import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Todo {
  _id?: string;
  title: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  todos: Todo[] = [];
  todoTitle = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<Todo[]>('http://localhost:3000/todos')
      .subscribe(data => this.todos = data);
  }

  addTodo() {
    if (!this.todoTitle.trim()) return;

    this.http.post<Todo>('http://localhost:3000/todos', { title: this.todoTitle })
      .subscribe((data) => {
        this.todos.push(data); // اضيف العنصر الجديد مباشرة بدون إعادة تحميل
        this.todoTitle = '';
      });
  }
}
