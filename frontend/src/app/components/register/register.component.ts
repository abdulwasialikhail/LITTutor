import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    this.router.navigate(['/home/welcome']);
    this.toastr.success("New User Added!");
  }

}
