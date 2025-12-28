import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Todo {

  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<{_id?: string, title: string}[]> {
    return this.http.get<{_id?: string, title: string}[]>(this.apiUrl);
  }
  addTodo(todo: {_id?: string, title: string}): Observable<{_id?: string, title: string}> {
    return this.http.post<{_id?: string, title: string}>(this.apiUrl, todo);
  }
}
