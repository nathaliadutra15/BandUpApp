import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userInfo;
  public nomeUsuario;
  public qtSeguidores;
  public qtSeguindo;
  public options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private authService: AuthService, private router: Router, private httpClient: HttpClient) {
    if (!this.authService.getAutenticacao()) {
      this.router.navigate(['/login']);
    } else {
      let dataUpdate;

      this.httpClient.get(`http://localhost:3000/user/${this.authService.getUserAutenticado()}`, this.options).subscribe((res) => {
        this.nomeUsuario = res[0].nome;
        this.qtSeguidores = res[0].seguidores.length;
        this.qtSeguindo = res[0].seguindo.length;

      }, err => {
        console.log("ERRO:" + err);
      });

      this.userInfo = this.authService.getUserInformation();
      
      console.log(this.userInfo)
    }


  }

  ngOnInit(): void {
  }

}
