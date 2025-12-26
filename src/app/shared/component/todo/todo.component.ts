import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from '../../models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {


  constructor(
    private _snackbar:MatSnackBar 
  ) { }

  ngOnInit(): void {
  }

  todoarr:Array<Itodo>=[
    {
      todoitem:"angular",
      todoid:"123"
    },{
      todoitem:"js",
      todoid:"124"
    }
  ]

isInEditmode:boolean=false
editId!:string
@ViewChild('todoitem')todoitem!:ElementRef



onaddtodo(){

  if (this.todoitem.nativeElement.value.length === 0) return;
  let obj={
    todoitem:this.todoitem.nativeElement.value,
    todoid:Date.now().toString()
  }
  console.log(obj)

  this.todoitem.nativeElement.value="",
  this.todoarr.push(obj)
  this._snackbar.open(`todo item added successfully`,"Close",{
    horizontalPosition:'center',
    verticalPosition:'top',
    duration:3000
  })
}

trackById(index: number, todo:Itodo) {
  return todo.todoid
}

onremove(id:string){
  console.log(id)

  let getindex=this.todoarr.findIndex(a=>a.todoid===id)
  this.todoarr.splice(getindex,1)
  this._snackbar.open(`the todo with id${id}  removed successfulyy`, "Close",{
    horizontalPosition:'left',
    verticalPosition:'top',
    duration:3000
  })
}


onedit(todo:Itodo){
  console.log(todo)
  this.editId=todo.todoid
  this.todoitem.nativeElement.value=todo.todoitem
  this.isInEditmode=true

}

onupdate(){
  let updated:Itodo={
    todoitem:this.todoitem.nativeElement.value,
    todoid:this.editId
  }
  this.todoitem.nativeElement.value=""

  let getindex=this.todoarr.findIndex(a=>a.todoid===updated.todoid)
  this.todoarr[getindex]=updated
  this.isInEditmode=false
this._snackbar.open(`todo item added updated  successfully`,"Close",{
  horizontalPosition:'center',
  verticalPosition:'top',
  duration:3000
})

}



}
