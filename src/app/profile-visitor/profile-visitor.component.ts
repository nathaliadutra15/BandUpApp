import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-profile-visitor',
  templateUrl: './profile-visitor.component.html',
  styleUrls: ['./profile-visitor.component.scss']
})
export class ProfileVisitorComponent implements OnInit {

  constructor(private router: Router) { 
    this.router.navigate(['/']);
  }


  ngOnInit(): void {
  }

}
