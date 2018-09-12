import { TaskType } from './task-type.model';
import { TaskTypeService } from './task-type.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat'; 

@Component({
  selector: 'sitmun-task-type-edit',
  templateUrl: './task-type-edit.component.html',
  styleUrls: ['./task-type-edit.component.css']
})
export class TaskTypeEditComponent implements OnInit {

  item: TaskType = new TaskType();
  items: TaskType[] = new Array<TaskType>();
  
  sub: Subscription;
  

  constructor(private route: ActivatedRoute,
    private router: Router,    
    private taskTypeService: TaskTypeService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      
      if (id) {
        this.taskTypeService.get(id).subscribe((item: any) => {
          if (item) {
            this.item = item;
            
            
            
          } else {
            console.log(`taskType with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  getAllTaskTypes() {
    this.taskTypeService.getAll()
    .subscribe((items: TaskType[]) => {
        this.items = items;
    });
  }
  

  gotoList() {
    this.router.navigate(['/task-type-list']);
  }

  save() {
      this.taskTypeService.save(this.item).subscribe(result => {      
        this.gotoList();
      }, error => console.error(error));
  }

  remove(item: TaskType) {
    this.taskTypeService.delete(item).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }


}
