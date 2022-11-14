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

  eviarPost() {
    try {
      let objPost = {
        posts:[
          {
            postTxt: this.postTxt,
            midia: this.midiaType == "music" ? this.musicFile : (this.midiaType == "picture" ? this.picFile : null), 
            events: [],
            comments: [],
            sharings: [],
            likes: [],
            savings: [],
            isShared: this.isShared
          }
        ]
      }
     
      /* this.httpClient.patch("http://localhost:3000/post/create/", JSON.stringify(objCadastro), this.options).subscribe((res) => {
      }, err => {
        this.userError = err.error.message;
      });
      this.userError = undefined; */
    } catch (error) {
      
    }
      
  }

}
