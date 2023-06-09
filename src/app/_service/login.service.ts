import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.HOST}/oauth/token`;

  constructor(private http: HttpClient,
              private router: Router) { }

  public login(usuario:string, password: string){
    const body=`grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`;
    return this.http.post<any>(`${this.url}`, body, {
      headers:new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8').
      set('Authorization','Basic '+btoa(`${environment.TOKEN_AUTH_USERNAME}:${environment.TOKEN_AUTH_PASSWORD}`))
    });
  }
  public closeSession(){
    const tk = sessionStorage.getItem(environment.TOKEN);
    this.http.get(`${environment.HOST}/cerrarSesion/anular/${tk}`).subscribe(data =>{
      sessionStorage.clear();
      this.router.navigate(['/login']).then(() => { window.location.reload(); });
    });
  }

  public closeSesion(){
    const tk = sessionStorage.getItem(environment.TOKEN);
    this.http.get(`${environment.HOST}/cerrarSesion/anular/${tk}`).subscribe(data =>{
      sessionStorage.clear();
    });
  }
  public estaLogeado ():boolean{
    const tk = sessionStorage.getItem(environment.TOKEN);
    return tk != null;
  }

  public rol(): string{
    
    const helper = new JwtHelperService();
    let token: any = sessionStorage.getItem(environment.TOKEN);
    const decodedToken = helper.decodeToken(token);
    const rol: string = decodedToken.authorities[0];

    return rol;
  }
}
