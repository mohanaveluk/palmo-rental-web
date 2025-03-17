import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';
import { CreateOrderDto } from '../models/create-order.dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/v1/orders`;
  private pageSize = 20;

  constructor(private http: HttpClient) { }

  getOrders(page: number = 0): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}?page=${page}&size=${this.pageSize}`);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: CreateOrderDto): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  cancelOrder(id: string): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${id}/cancel`, {});
  }
}