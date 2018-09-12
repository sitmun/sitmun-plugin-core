import { TaskGroup } from './task-group.model';
import { TaskGroupService } from './task-group.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat'; 

@Component({
  selector: 'sitmun-task-group-edit',
  templateUrl: './task-group-edit.component.html',
  styleUrls: ['./task-group-edit.component.css']
})
export class TaskGroupEditComponent implements OnInit {

  item: TaskGroup = new TaskGroup();
  items: TaskGroup[] = new Array<TaskGroup>();
  
  sub: Subscription;
  

  constructor(private route: ActivatedRoute,
    private router: Router,    
    private taskGroupService: TaskGroupService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      
      if (id) {
        this.taskGroupService.get(id).subscribe((item: any) => {
          if (item) {
            this.item = item;
            
            
            
          } else {
            console.log(`taskGroup with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  getAllTaskGroups() {
    this.taskGroupService.getAll()
    .subscribe((items: TaskGroup[]) => {
        this.items = items;
    });
  }
  

  gotoList() {
    this.router.navigate(['/task-group-list']);
  }

  save() {
      this.taskGroupService.save(this.item).subscribe(result => {      
        this.gotoList();
      }, error => console.error(error));
  }

  remove(item: TaskGroup) {
    this.taskGroupService.delete(item).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }


}
