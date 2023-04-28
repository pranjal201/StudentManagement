import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Student } from 'src/app/model/student';
import { DataService } from 'src/app/shared/data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  studentList :Student[] = [];
  studentObj:Student ={
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  }
  id!: string;
  firstName!: string;
  lastName!: string;
  email!:string;
  mobile!:string;
  constructor(private auth : AuthService, private data :DataService) { }
  ngOnInit(): void {
    this.getAllStudent();
  }

  logout(){
    this.auth.logout();
  }

  getAllStudent(){
    this.data.getAllStudents().subscribe(res => {
      this.studentList = res.map((e:any) => {
        const data = e.payload.doc.data();
        data.id  = e.payload.doc.id;
        return data;
      })
    },err => {
      alert("Error while fetching the data!");

    })
  }
  resetForm(){
    this.id='';
    this.firstName = '';
    this.lastName = '';
    this.mobile = '';
    this.email = '';
  }
  addStudent(){
    if(this.firstName =='' || this.lastName == '' || this.mobile =='' || this.email == ''){
      alert('Enter all the Details!!');
      return;
    }
    this.id = '';
    this.studentObj.email = this.email;
    this.studentObj.firstName = this.firstName;
    this.studentObj.lastName = this.lastName;
    this.studentObj.mobile = this.mobile;
    this.data.addStudent(this.studentObj);
    this.resetForm();
  }
  addRecords(student:Student){
    this.id = student.id;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.mobile = student.mobile;
    this.email = student.email;

  }
  updateStudent(student:Student){
    this.studentObj.email = this.email;
    this.studentObj.id = this.id;
    this.studentObj.firstName = this.firstName;
    this.studentObj.lastName = this.lastName;
    this.studentObj.mobile = this.mobile;
    this.data.updateStudent(this.studentObj);
  }
  deleteStudent(student:Student){
    if(window.confirm("Are you sure you want to delete ?"+student.firstName)){
    this.data.deleteStudent(student);
    this.ngOnInit();

    }
  }
}
