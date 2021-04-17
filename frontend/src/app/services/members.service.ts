import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Member } from '../_models/members';
import { map } from 'rxjs/operators';
import { Application } from '../_models/application';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/UserParams';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  applications: Application[] = [];
  
  constructor(private http: HttpClient) { }

  getMembersPaginated(userParams: UserParams) {
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);


    return getPaginatedResult<Member[]>(this.baseUrl + 'users/members-paginated', params, this.http);
  }

  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member []>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getApplications() {
    if (this.applications.length > 0) return of(this.applications);
    return this.http.get<Application []>(this.baseUrl + 'users/check').pipe(
      map(apps => {
        this.applications = apps;
        return apps;
      })
    );
  }

  getApplication(id: number) {
    const app = this.applications.find(x => x.appUserId === id)
    if (app !== undefined) return of (app);
    return this.http.get<Application>(this.baseUrl + 'users/check/' + id)
  }

  check() {
    return this.http.get<Member>(this.baseUrl + 'users/checsk');
  }

  getMember(username: string) {
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
}
