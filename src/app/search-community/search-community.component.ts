import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-search-community',
  templateUrl: './search-community.component.html',
  styleUrls: ['./search-community.component.scss']
})
export class SearchCommunityComponent implements OnInit {
  public options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public listaUsuarios = [];
  public usuariosBusca = [];
  public listaGeneros: string = "";
  public instrumentos = [];
  public objCardUsuario: any[];
  public nomeBusca: string;
  public local;

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) {
    this.listarTodosUsuarios();
  }

  ngOnInit(): void {
  }

  listarTodosUsuarios() {
    try {
      this.httpClient.get('http://localhost:3000/user/list', this.options).subscribe((res) => {
        let data = res;
        for (let i = 0; i < Object.keys(data).length; i++) {
          this.listaUsuarios[i] = data[i];
        }
      }, err => {
        console.log("ERRO:" + err);

      });
    } catch (error) {
      console.log("ERRO:" + error);
    }
  }

  buscarNomeUsuario() {
    let usuariosFiltrados = [];
    this.listaUsuarios.forEach(e => {
      if (e.nome == this.nomeBusca && e.nome != null) {
        usuariosFiltrados.push(e);
      }
    });
    
    this.listaUsuarios = usuariosFiltrados;
  }


}
