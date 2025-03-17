import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, Observable, of, tap, throwError } from 'rxjs';
import { AuthResponse, LoginRequest, RefreshTokenRequest, RefreshTokenResponse, UserDetailApiResponse, UserModel } from '../shared/models/auth.model';
import { Router } from '@angular/router';
import { ApiUrlBuilder } from '../shared/utility/api-url-builder';
import { TokenService } from '../shared/core/services/token.service';

// Add these interfaces inside the file
export interface SocialAuthResponse {
  access_token: string;
  refresh_token: string;
  user: UserModel;
  source: string;
  operator: string;
  lift: string;
  subscribe: string;
}

interface OtcResponse {
  success: boolean;
  message: string;
}

interface ValidateOtcRequest {
  mobile: string;
  code: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_TOKEN = 'lrpd_opr';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userName!: string;
  private user!: UserModel;
  private isAuthenticated = false;
  public redirectUrl: string | null = null;

  constructor(
    private http: HttpClient, 
    private apiUrlBuilder: ApiUrlBuilder, 
    private tokenService: TokenService,
    private router: Router
  ) {
    this.isAuthenticatedSubject.next(this.tokenService.hasValidAccessToken());
    this.userName = localStorage.getItem('userName') || '';
    const userobj  = localStorage?.getItem('user');
    this.user = userobj !== null ? JSON.parse(userobj) : {};
  }

  register(register: any): Observable<AuthResponse> {
    const createApi = this.apiUrlBuilder.buildApiUrl('auth/register');
    return this.http.post<AuthResponse>(`${createApi}`, register).pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => throwError(() => error))
    );
  }

  //getAllUsers
  getAllUsers(): Observable<UserDetailApiResponse>{
    const requestApi = this.apiUrlBuilder.buildApiUrl('auth');
    return this.http.get<UserDetailApiResponse>(requestApi).pipe(
      catchError(error => throwError(() => error))
    );
  }

  verifyEmail(emailCode: any): Observable<any> {
    const createApi = this.apiUrlBuilder.buildApiUrl('auth/verify-email');
    return this.http.post<any>(`${createApi}`, emailCode).pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => throwError(() => error))
    );
  }

  resendVerificationCode(email: string): Observable<any> {
    const createApi = this.apiUrlBuilder.buildApiUrl('auth/resendotc');
    return this.http.post<any>(`${createApi}`, {email}).pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => throwError(() => error))
    );
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    const createApi = this.apiUrlBuilder.buildApiUrl('auth/login');
    return this.http.post<AuthResponse>(createApi, request).pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => throwError(() => error))
    );
  }

  login_prev(credentials: { email: string; password: string }): Observable<AuthResponse> {
    const createApi = this.apiUrlBuilder.buildApiUrl('auth/login');
    return this.http.post(`${createApi}`, credentials).pipe(
      tap((response: any) => {
        if (response.status) {
          this.userName = `${response?.user.firstName} ${response?.user.lastName}`;
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('userName', this.userName);
          localStorage.setItem(this.AUTH_TOKEN, response.access_token);
          this.loggedIn.next(true);
        }
      })
    );
  }


  login2(email: string, password: string, credentials: { email: string; password: string; }): Observable<boolean> {
    // Simulate API call
    return of(true).pipe(
      delay(1000),
      tap(() => (this.isAuthenticated = true))
    );
  }

  login1(credentials: { email: string; password: string }): Observable<any> {
    // Simulate API call
    return of({ success: true, userName: 'John Doe' }).pipe(
      tap(response => {
        if (response.success) {
          this.userName = response.userName;
          localStorage.setItem('userName', response.userName);
          this.loggedIn.next(true);
        }
      })
    );
  }


  logout(): Observable<any> {
    const createApi = this.apiUrlBuilder.buildApiUrl('auth/logout');

    return this.http.post<string>(createApi, {}).pipe(
      tap(() => {
        this.tokenService.removeTokens();
        this.isAuthenticatedSubject.next(false);
        this.isAuthenticated = false;
        this.loggedIn.next(false);
        this.userName = "";
        this.router.navigate(['/auth/login']);
      }),
      catchError(error => throwError(() => console.log(error)))
    );
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const request: RefreshTokenRequest = { refreshToken };
    const createApi = this.apiUrlBuilder.buildApiUrl('token/refresh');
    return this.http.post<RefreshTokenResponse>(createApi, request).pipe(
      tap(response => {
        this.tokenService.setAccessToken(response.access_token);
        this.isAuthenticatedSubject.next(true);
      }),
      catchError(error => throwError(() => console.log(error)))
    );
  }
  
  isLoggedIn(): boolean {
    this.loggedIn.next(false);
    
    this.userName =  localStorage.getItem(this.AUTH_TOKEN) || '';
    return this.isAuthenticated;
    //return this.tokenService.hasToken();
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  
  getUserName(): string {
    return this.userName;
  }

  getUser(): any {
    return localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')!) : {id: ""};
  }


  /**
   * Handles social login authentication
   * @param provider The social auth provider ('google' | 'facebook' | 'apple')
   * @returns Observable of auth response
   */
  async socialLogin(provider: string): Promise<Observable<SocialAuthResponse>> {
    const createApi = this.apiUrlBuilder.buildApiUrl(`auth/${provider}`);
    
    // Initialize the appropriate social auth SDK based on provider
    switch (provider) {
      case 'google':
        return await this.handleGoogleAuth(createApi);
      case 'facebook':
        return await this.handleFacebookAuth(createApi);
      case 'apple':
        return await this.handleAppleAuth(createApi);
      default:
        return throwError(() => new Error('Invalid provider'));
    }
  }

  /**
   * Sends OTC to provided mobile number
   * @param mobile The mobile number to send OTC to
   * @returns Observable of OTC response
   */
  sendOtc(mobile: string): Observable<OtcResponse> {
    const createApi = this.apiUrlBuilder.buildApiUrl('auth/mobile/send-otc');
    return this.http.post<OtcResponse>(createApi, { mobile }).pipe(
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Verifies OTC code for mobile number
   * @param mobile The mobile number
   * @param code The OTC code to verify
   * @returns Observable of auth response
   */
  verifyOtc(mobile: string, code: string): Observable<AuthResponse> {
    const createApi = this.apiUrlBuilder.buildApiUrl('auth/mobile/validate');
    const payload: ValidateOtcRequest = { mobile, code };
    
    return this.http.post<AuthResponse>(createApi, payload).pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => throwError(() => error))
    );
  }

  // Private helper methods for social auth
  private async handleGoogleAuth(apiUrl: string): Promise<Observable<SocialAuthResponse>> {
    try {
      // Initialize Google Auth - In real app, use proper Google Sign-In SDK
      const googleUser = await this.initGoogleAuth();
      return this.http.post<SocialAuthResponse>(apiUrl, {
        token: googleUser.credential
      });
    } catch (error) {
      return throwError(() => error);
    }
  }

  private async handleFacebookAuth(apiUrl: string): Promise<Observable<SocialAuthResponse>> {
    try {
      // Initialize Facebook Auth - In real app, use proper Facebook SDK
      const fbResponse = await this.initFacebookAuth();
      return this.http.post<SocialAuthResponse>(apiUrl, {
        token: fbResponse.accessToken
      });
    } catch (error) {
      return throwError(() => error);
    }
  }

  private async handleAppleAuth(apiUrl: string): Promise<Observable<SocialAuthResponse>> {
    try {
      // Initialize Apple Auth - In real app, use proper Apple Sign-In SDK
      const appleResponse = await this.initAppleAuth();
      return this.http.post<SocialAuthResponse>(apiUrl, {
        token: appleResponse.authorization.code
      });
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Note: These methods would need to be implemented with actual SDK integration
  private async initGoogleAuth(): Promise<any> {
    // Implement Google Sign-In SDK initialization
    throw new Error('Google Auth not implemented');
  }

  private async initFacebookAuth(): Promise<any> {
    // Implement Facebook SDK initialization
    throw new Error('Facebook Auth not implemented');
  }

  private async initAppleAuth(): Promise<any> {
    // Implement Apple Sign-In SDK initialization
    throw new Error('Apple Auth not implemented');
  }


  private hasToken(): boolean {
    return !!localStorage.getItem(this.AUTH_TOKEN);
  }

  private handleAuthResponse(response: AuthResponse): void {
    if (response.access_token && response.refresh_token) {
      this.tokenService.setTokens(response.access_token, response.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      this.userName = `${response?.user?.firstName} ${response?.user?.lastName}`;
      localStorage.setItem('userName', this.userName);
      this.isAuthenticatedSubject.next(true);
      this.loggedIn.next(true);
    }
  }
}
