import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AngularMaterialModule } from 'src/app/core/angular-material.module';
import { RouterModule } from '@angular/router';
import { AdminMenuComponent } from './navigation/admin-menu/admin-menu.component';
import { StudentMenuComponent } from './navigation/student-menu/student-menu.component';
import { TutorMenuComponent } from './navigation/tutor-menu/tutor-menu.component';



@NgModule({
  declarations: [HeaderComponent, SidenavListComponent, AdminMenuComponent, StudentMenuComponent, TutorMenuComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports: [
    HeaderComponent, 
    SidenavListComponent
  ]
})
export class SharedComponentsModule { }
