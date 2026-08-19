import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { Router } from '@angular/router';
import { User, LoginRequest, LoginResponse } from '../models/user.model';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  public sessionExpired$ = new BehaviorSubject<boolean>(false);

  private logoutTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.loadStoredAuth();
  }

  private loadStoredAuth(): void {
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user_data');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
        this.scheduleAutoLogout(token);
      } catch (e) {
        this.logout();
      }
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        map(response => response.data),
        tap(data => {
          console.log(`Respuesta del login`, data)
          if (data.token) {
            localStorage.setItem('access_token', data.token);
            localStorage.setItem('user_data', JSON.stringify(data.user));
            this.currentUserSubject.next(data.user);
            this.scheduleAutoLogout(data.token);
          }
        })
      );
  }


  logout(): void {
    this.clearSession();
    this.sessionExpired$.next(false);
    this.router.navigate(['/login']);
  }


  notifySessionExpired(): void {
    if (!this.currentUserSubject.value) {
    return;
  }
  this.clearSession();
  this.sessionExpired$.next(true);
  }

  dismissSessionExpired(): void {
    this.sessionExpired$.next(false);
    this.router.navigate(['/login']);
  }

  private clearSession(): void {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private scheduleAutoLogout(token: string): void {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }

    const expiresAt = this.getTokenExpiration(token);
    if (!expiresAt) return;

    const msUntilExpiry = expiresAt - Date.now();

    if (msUntilExpiry <= 0) {
      this.notifySessionExpired();
      return;
    }

    this.logoutTimer = setTimeout(() => this.notifySessionExpired(), msUntilExpiry);
  }

  private getTokenExpiration(token: string): number | null {
    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      return payload.exp ? payload.exp * 1000 : null;
    } catch {
      return null;
    }
  }
}