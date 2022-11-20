import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-profile-visitor',
  templateUrl: './profile-visitor.component.html',
  styleUrls: ['./profile-visitor.component.scss']
})
export class ProfileVisitorComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { 
    if (!this.authService.getAutenticacao()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

}
