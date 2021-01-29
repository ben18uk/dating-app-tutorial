import { AxiosResponse } from 'axios';
// import axios from 'axios-observable';
import { Observable, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user-model';
import { useToast } from 'vue-toastification';
import $axios from '../axios/axios';


class AccountService {
    baseUrl = 'https://localhost:5001/api/';
    authenticated = false;
    private currentUserSource = new ReplaySubject<User>(1);
    currentUser$ = this.currentUserSource.asObservable();

    login(form: User): Observable<any> {
        return $axios
            .post(this.baseUrl + 'account/login', form).pipe(
                map((response: AxiosResponse<User>) => {
                    if (response) {
                        localStorage.setItem('user', JSON.stringify(response.data));
                        this.currentUserSource.next(response.data);
                    }
                    return response;
                })
            )

    }

    register(form: User): Observable<any> {
        return $axios
            .post(this.baseUrl + 'account/register', form).pipe(
                map((response: AxiosResponse<User>) => {
                    if (response) {
                        localStorage.setItem('user', JSON.stringify(response.data));
                        this.currentUserSource.next(response.data);
                        return response.data;
                    }
                })
            )
    }

    setCurrentUser(user: User) {
        this.currentUserSource.next(user);
        if (user) {
            this.authenticated = true;
        }
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUserSource.next(null as any);
    }

    getUsers(): Observable<any> {
        return $axios
          .get('https://localhost:5001/api/users')
      }
      
}

export const accountService = new AccountService();