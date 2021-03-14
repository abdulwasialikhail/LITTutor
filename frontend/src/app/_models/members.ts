import {Photo} from './photo';

export interface Member {
    id: number;
    username: string;
    photoUrl: string;
    firstName: string;
    lastName: string;
    studentId: string;
    campus: string;
    course: string;
    year: number;
    age: number;
    email: string;
    phone: number;
    created: Date;
    lastActive: Date;
    gender: string;
    city: string;
    country: string;
    photos: Photo[];
    userType: string;
    applicationSubmitted: boolean;
  }
  