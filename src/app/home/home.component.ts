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
  public posts = [];
  public followingUsers = [];
  public imgPath;


  constructor(private httpClient: HttpClient, public authService: AuthService, private router: Router) {
    if (!this.authService.getAutenticacao()) {
      this.router.navigate(['/login']);
    }

    try {
      this.httpClient.get(`http://localhost:3000/user/${this.authService.getUserAutenticado()}`, this.options).subscribe((res) => {
        this.imgPath = res[0].urlImg;
        console.log(this.imgPath);
      }, err => {
        console.log("ERRO:" + err);
      });
    } catch (error) {
      
    }
    this.getFollowingUsersInfo();
    console.log(this.followingUsers);
  }

  ngOnInit(): void {

  }

  reset() {
    this.router.navigateByUrl('/visitor');
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
      let objPost =
      {
        usuario: this.authService.getUserAutenticado(),
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
      this.httpClient.patch(`http://localhost:3000/post/create/${this.authService.getUserAutenticado()}`, JSON.stringify(objPost), this.options).subscribe((res) => {
      }, err => {
      });
    } catch (error) {

    }

    this.reset();

  }

  getFollowingUsersInfo() {
    let following = [];
    let usuarios = [];
    try {
      this.httpClient.get(`http://localhost:3000/user/${this.authService.getUserAutenticado()}`, this.options).subscribe((res) => {
        let data = res[0].seguindo;
        for (let i = 0; i < data.length; i++) {
          following.push(data[i]);
        }
        for (let j = 0; j < following.length; j++) {
          this.httpClient.get(`http://localhost:3000/user/${following[j].usuario}`, this.options).subscribe((res) => {
            let dataPosts = res[0];
            for (let k = 0; k < dataPosts.posts.length; k++) {
              usuarios.push(dataPosts.posts[k]);
            }
            
          }, err => {

          });
        }
      }, err => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
    console.log(usuarios);
    this.followingUsers = usuarios;
  }

  setLike(usernameOrigem:string, idPost:string){
    try {
      this.httpClient.post(`http://localhost:3000/user/like/${this.authService.getUserAutenticado()}/${idPost}`, this.options).subscribe((res) => {
        console.log(res);
      }, err => {
        console.log(err);
      });

    } catch (error) {
      console.log("ERRO:" + error);
    }

    this.reset();
  }


}
