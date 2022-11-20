import { Component, Input } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'band-up-app';
  auth: boolean = false;
  public user: string;

  constructor(public authService: AuthService){
    this.user = authService.getUserAutenticado();
  }

  ngOnInit(){
    this.auth = this.authService.getAutenticacao();
  }
}
