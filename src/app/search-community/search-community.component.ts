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
  public generosMusicais = [];
  public nomesInstrumentos = [];

  public objCardUsuario: any[];
  public nomeBusca: string;
  public nivelInstrumento;

  public cidade="";
  public uf="";

  public isOutroInstrumento: boolean = false;
  public isOutroGenero: boolean = false;
  public nomeOutroInstrumento;
  public nomeOutroGenero;

  public listaNiveis = ["Iniciante", "Intermediário", "Avançado"];

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) {
    if (!this.authService.getAutenticacao()) {
       this.router.navigate(['/login']);
     }


  }

  ngOnInit(): void {
    this.listarTodosUsuarios();
  }

  reset(){
    this.router.navigate(['/login']);
  }

  listarTodosUsuarios() {
    try {
      this.httpClient.get('http://localhost:3000/user/list', this.options).subscribe((res) => {
        let data = res;
        for (let i = 0; i < Object.keys(data).length; i++) {
          if (data[i].usuario != this.authService.getUserAutenticado()) {
            this.listaUsuarios[i] = data[i];
          }
        }
      }, err => {
        console.log("ERRO:" + err);

      });
    } catch (error) {
      console.log("ERRO:" + error);
    }
  }

  buscarNomeUsuario() {
    this.listarTodosUsuarios();
    let usuariosFiltrados = [];
    if (this.nomeBusca.length > 0) {
      this.listaUsuarios.forEach(e => {
        if (e.nome.toLowerCase().includes(this.nomeBusca.toLowerCase())) {
          usuariosFiltrados.push(e);
        }
      });
    } else {
      this.listarTodosUsuarios();
    }

    this.listaUsuarios = usuariosFiltrados;
  }

  seguirUsuario(username) {
    try {
      let objSeguidor = {
        seguidores: [{
          usuario: this.authService.getUserAutenticado()
        }]
      };

      let objSeguindo = {
        seguindo: [{
          usuario: username
        }]
      }

      //Adiciona na conta atual o usuário que está seguindo
      this.httpClient.patch(`http://localhost:3000/user/${this.authService.getUserAutenticado()}`, JSON.stringify(objSeguindo), this.options).subscribe((res) => {

        //Adiciona na conta do outro usuário um seguidor
        this.httpClient.patch(`http://localhost:3000/user/${username}`, JSON.stringify(objSeguidor), this.options).subscribe((res) => {
        }, err => {
          console.log(err);
        });
      }, err => {
        console.log(err);
      });

    } catch (error) {
      console.log("ERRO:" + error);
    }
  }

  setIsOutroInstrumento() {
    this.isOutroInstrumento = true;
  }

  setIsOutroGenero() {
    this.isOutroGenero = true;
  }

  setInstrumentoChecado(event) {
    let instrumentoAdd = event.path[0].name.toString();
    if (this.nomesInstrumentos.length > 0) {
      if (this.nomesInstrumentos.includes(event.path[0].name.toString())) {
        this.nomesInstrumentos = this.nomesInstrumentos.filter(instrumento => instrumento != instrumentoAdd);
      } else {
        this.nomesInstrumentos.push(instrumentoAdd);
      }
    } else {
      this.nomesInstrumentos.push(instrumentoAdd);
    }
  }

  setGeneroMusicalChecado(event) {
    let generoMusicalAdd = event.path[0].name.toString();
    if (this.generosMusicais.length > 0) {
      if (this.generosMusicais.includes(event.path[0].name.toString())) {
        console.log(this.generosMusicais.includes(generoMusicalAdd))
        this.generosMusicais = this.generosMusicais.filter(genero => genero != generoMusicalAdd);
      } else {
        this.generosMusicais.push(generoMusicalAdd);
      }
    } else {
      this.generosMusicais.push(generoMusicalAdd);
    }
  }

  filtrarPorInstrumento() {
    let usuariosFiltrados = [];
    this.nomesInstrumentos.forEach(instrumeto => {
      this.listaUsuarios.forEach(user => {
        for (let i = 0; i < user.instrumentos.length; i++) {
          if (user != null && user.instrumentos[i].nomeInstrumento.toLowerCase() == instrumeto.toLowerCase()) {
            usuariosFiltrados.push(user);
          }
        }
      });
    });
    this.listaUsuarios = usuariosFiltrados;
  }

  filtrarPorGeneroMusical() {
    let usuariosFiltrados = [];
    this.generosMusicais.forEach(genero => {
      this.listaUsuarios.forEach(user => {
        for (let i = 0; i < user.generoMusical.length; i++) {
          if (user != null && user.generoMusical[i].toLowerCase() == genero.toLowerCase()) {
            usuariosFiltrados.push(user);
          }
        }
      });
    });
    this.listaUsuarios = usuariosFiltrados;
  }

  filtrarPorCidade() {
    let usuariosFiltrados = [];

    this.listaUsuarios.forEach(user => {
      if (user != null && user.cidade.toLowerCase().includes(this.cidade.toLowerCase())) {
        usuariosFiltrados.push(user);
      }
    });
    this.listaUsuarios = usuariosFiltrados;
  }

  filtrarPorEstado() {
    let usuariosFiltrados = [];

    this.listaUsuarios.forEach(user => {
      if (user != null && user.estadoUF.toLowerCase().includes(this.uf.toLowerCase())) {
        usuariosFiltrados.push(user);
      }
    });
    this.listaUsuarios = usuariosFiltrados;
  }

  aplicarFiltros() {
    console.log(this.uf)
    if (this.nomesInstrumentos.length > 0) {
      return this.filtrarPorInstrumento();
    } else if (this.generosMusicais.length > 0) {
      return this.filtrarPorGeneroMusical();
    } else if (this.cidade.length > 0) {
      this.filtrarPorCidade();
    } else if (this.uf.length > 0) {
      this.filtrarPorEstado();
    }
    else {
      this.listarTodosUsuarios();
    }

  }


}
