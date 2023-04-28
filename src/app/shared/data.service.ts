import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore"
import { Student } from '../model/student';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  addStudent(student: Student){
    student.id = this.afs.createId();
    return this.afs.collection('/Students').add(student);
  }

  //get all student
  getAllStudents(){
    return this.afs.collection('/Students').snapshotChanges();
  }

  //delete student
  deleteStudent(student: Student){
    
    this.afs.collection('/Students').doc(student.id).delete();
  }

  updateStudent(student:Student){
    this.deleteStudent(student);
    this.addStudent(student);
  }
}
