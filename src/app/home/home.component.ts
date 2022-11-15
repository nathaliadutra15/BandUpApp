import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public musicFile;
  public picFile;
  public fileName;
  public imageFileName;
  public musicFileName;
  public postTxt: string;
  public isShared = false;
  public midiaType: string;
  public options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) {
    if (!this.authService.getAutenticacao()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {

  }

  onChangeMusic(event) {
    this.midiaType = "music";
    this.fileName = this.musicFileName.replace(/C:+\\+(\w+)+\\/, " ");
    this.musicFile = event;
    
  }

  onChangePic(event) {
    this.midiaType = "picture"
    this.fileName = this.imageFileName.replace(/C:+\\+(\w+)+\\/, " ");
    this.picFile = event;
  }

  enviarPost() {
    console.log(this.musicFile);
    try {
      let objPost = {
        posts:
        {
          createdAt: new Date,
          updatedAt: new Date,
          postTxt: this.postTxt,
          midia: this.midiaType == "music" ? <Object>this.musicFile : (this.midiaType == "picture" ? this.picFile : null),
          events: [],
          comments: [],
          sharings: [],
          likes: [],
          savings: [],
          isShared: this.isShared
        }

      }

      console.log(objPost);

      this.httpClient.patch(`http://localhost:3000/post/create/${this.authService.getUserAutenticado()}`, JSON.stringify(objPost), this.options).subscribe((res) => {
        console.log(res);
      }, err => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);

    }

  }

}
