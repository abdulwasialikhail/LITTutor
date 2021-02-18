import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { LayoutMainAppComponent } from './components/layout-main-app/layout-main-app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'home/welcome',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
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
        path: 'register',
        component: RegisterComponent,
      },
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