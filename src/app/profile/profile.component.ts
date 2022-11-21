import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { ProfileServiceService } from './profile-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userInfo = [];
  public nomeUsuario;
  public qtSeguidores;
  public qtSeguindo;
  public instrumentosInfo;
  public generoMusicalInfo;
  public localInfo;
  public imgPath;
  public arrPosts;
  public options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(public authService: AuthService, private router: Router, private httpClient: HttpClient, public profileService: ProfileServiceService) {
    if (!this.authService.getAutenticacao()) {
      //this.router.navigate(['/login']);
    } else {
      let dataUpdate;

      this.httpClient.get(`http://localhost:3000/user/${this.authService.getUserAutenticado()}`, this.options).subscribe((res) => {
        this.nomeUsuario = res[0].nome;
        this.qtSeguidores = res[0].seguidores.length;
        this.qtSeguindo = res[0].seguindo.length;
        this.instrumentosInfo = res[0].instrumentos;
        this.generoMusicalInfo = res[0].generoMusical;
        this.localInfo = res[0].cidade + "-" + res[0].estadoUF;
        this.imgPath = res[0].urlImg;
        console.log(this.imgPath);
      }, err => {
        console.log("ERRO:" + err);
      });

      this.getPosts();
      console.log(this.arrPosts)

    }
  }

  ngOnInit(): void {

  }

  getPosts() {
    let posts = [];
    try {
      this.httpClient.get(`http://localhost:3000/user/${this.authService.getUserAutenticado()}`, this.options).subscribe((res) => {
        let data = res[0].posts;
        for (let i = 0; i < data.length; i++) {
          posts.push(data[i]);

        }
      }, err => {
        console.log("ERRO:" + err);
      });

    } catch (error) {

    }

    this.arrPosts = posts;
  }



}
