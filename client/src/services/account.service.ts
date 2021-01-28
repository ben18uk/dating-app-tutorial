import { AxiosResponse } from 'axios';
import axios from 'axios-observable';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user-model';

class AccountService {
    baseUrl = 'https://localhost:5001/api/';
    private currentUserSource = new ReplaySubject<User>(1);
    currentUser$ = this.currentUserSource.asObservable();

    login(form: User): Observable<any> {
        return axios
            .post(this.baseUrl + 'account/login', form).pipe(
                map((response: AxiosResponse<User>) => {
                    const user = response;
                    if (user) {
                        localStorage.setItem('user', JSON.stringify(user.data));
                        this.currentUserSource.next(user.data);
                    }
                })
            )

    }

    register(form: User): Observable<any> {
        return axios
            .post(this.baseUrl + 'account/register', form).pipe(
                map((user: AxiosResponse<User>) => {
                    if (user) {
                        localStorage.setItem('user', JSON.stringify(user.data));
                        this.currentUserSource.next(user.data);
                        return user.data;
                    }
                })
            )
    }

    setCurrentUser(user: User) {
        this.currentUserSource.next(user);
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUserSource.next(null as any);
    }

    getUsers(): Observable<any> {
        return axios
          .get('https://localhost:5001/api/users')
      }
      
}

export const accountService = new AccountService();