import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { LayoutMainAppComponent } from './components/layout-main-app/layout-main-app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { AddTutorComponent } from './components/add-tutor/add-tutor.component';
import { CreateApplicationComponent } from './components/applications/create-application/create-application.component';
import { SubmittedApplicationsComponent } from './components/applications/submitted-applications/submitted-applications.component';
import { ViewApplicationComponent } from './components/applications/view-application/view-application.component';
import { AssignTutorComponent } from './components/applications/assign-tutor/assign-tutor.component';
import { ListApplicationsComponent } from './components/applications/list-applications/list-applications.component';
import { ViewWorkshopsComponent } from './components/view-workshops/view-workshops.component';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'home/welcome',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    redirectTo: 'home/welcome',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },  
  {
    path: 'home',
    component: LayoutMainAppComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'welcome',
        component: HomeComponent,
      },
      {
        path: 'members',
        component: MemberListComponent
      },
      {
        path: 'member/edit',
        component: MemberEditComponent
      },
      {
        path: 'members/:username',
        component: MemberDetailComponent
      },
      {
        path: 'register/tutor',
        component: AddTutorComponent
      },
      {
        path: 'application',
        component: CreateApplicationComponent
      },
      {
        path: 'assignTutor',
        component: AssignTutorComponent
      },
      {
        path: 'workshops',
        component: ViewWorkshopsComponent
      },
      {
        path: 'listApplications',
        component: ListApplicationsComponent
      },
      {
        path: 'applications/:id',
        component: ViewApplicationComponent
      },
      {
        path: 'messages',
        component: MessagesComponent
      },
      {
        path: 'applications',
        component: SubmittedApplicationsComponent
      }
    ],
  },
{
  path: 'signin',
  component: LogInComponent
},
{ path: '**', component: PageNotFoundComponent },
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }