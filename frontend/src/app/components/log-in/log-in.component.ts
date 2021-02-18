import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  returnUrl: string;
  model: any = {};

  constructor(public accountService: AccountsService, private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl("/home/welcome");
      
    }, error => {
      console.log(error);
      this.toastr.error(error.error
      );
      //this.router.navigateByUrl("/");
    })
  }

}
