import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
  private oauthTokenUrl = `${environment.apiUrl}/oauth2/token`;  // Atualizando para o novo endpoint correto
  private jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();  // Carrega o token armazenado ao iniciar o serviço
  }

  // Getter público para jwtPayload
  getJwtPayload() {
    return this.jwtPayload;
  }

  // Método de login com o username e senha
  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');  // Autorização básica

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response['access_token']);  // Armazena o access_token
      })
      .catch(response => {
        if (response.status === 400 && response.error.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida!');
        }
        return Promise.reject(response);
      });
  }

  // Renova o access token com o refresh token
  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');  // Autorização básica

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response['access_token']);  // Armazena o novo access_token
        console.log('Novo access token criado!');
        return Promise.resolve();
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve();
      });
  }

  // Verifica se o access token está inválido ou expirado
  isAccessTokenInvalido(): boolean {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  // Verifica se o usuário tem a permissão necessária
  temPermissao(permissao: string): boolean {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  // Verifica se o usuário tem qualquer uma das permissões necessárias
  temQualquerPermissao(roles: string[]): boolean {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  // Armazena o token no localStorage e decodifica o payload
  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  // Carrega o token armazenado no localStorage
  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  // Limpa o token armazenado (logout)
  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  // Faz o logout e revoga o token no servidor
  logout(): Promise<void> {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.limparAccessToken();  // Remove o token localmente após logout
      });
  }
}
