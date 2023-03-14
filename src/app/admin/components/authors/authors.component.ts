import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authors } from 'src/app/models/authorsList';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';





@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements AfterViewInit, OnInit{
  dataSource = new MatTableDataSource<Authors>;
  displayedColumns: string[] = ['name', 'descriptions', 'image','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  formAuthors: FormGroup = new FormGroup({})
  display: boolean = false
  form_btn: string = ""
  idAuthor: number | string = 0
  constructor(private request: RequestService, public fb: FormBuilder){}
  
  
  ngOnInit():void{
    this.setAuthorList()
 
    this.formAuthors = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(14)]],
      descriptions: ['',  [Validators.required, Validators.minLength(5)]],
      img: ['', Validators.required],
      
    })
  }

  ngAfterViewInit() :void{
    this.dataSource.paginator = this.paginator;
  }
  setAuthorList() :void{
    this.request.getData<Authors []>(environment.authorList.get).subscribe((authors)=>{
      this.dataSource = new MatTableDataSource(authors)
      this.dataSource.paginator = this.paginator
    })
  }

  deleteAuthor(id: number | string):void{
    if(confirm('Delete This Item')){
      this.request.deleteData(environment.authorList.get + `/${id}`).subscribe((authors)=>{
        this.setAuthorList()
      })
    } 
  }


  editAuthor(author: Authors): void{  
    this.formAuthors.patchValue({
      name: author.name,
      descriptions: author.descriptions,
      img: author.img
    })
    this.display = !this.display
    this.idAuthor = author.id
    this.form_btn = "edit"
  }

  save_btn(){
    let obj = this.formAuthors.value
    if(this.form_btn == "edit"){
      this.request.putData<Authors[]>(environment.authorList.get + `/${this.idAuthor}`, obj).subscribe((authors)=>{
        this.setAuthorList()
      })
    }else if(this.form_btn == "add"){
      this.request.postData<Authors[]>(environment.authorList.get, obj).subscribe((authors)=>{
        this.setAuthorList()
      })
    }
    this.display = !this.display
  }
 
  addAuthor(){
    this.formAuthors.patchValue({
      name: "",
      descriptions: "",
      img: ""
    })
  this.display = !this.display
  this.form_btn = "add"
 }

}
