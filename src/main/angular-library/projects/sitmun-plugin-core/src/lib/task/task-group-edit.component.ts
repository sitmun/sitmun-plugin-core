import { TaskGroup } from './task-group.model';
import { TaskGroupService } from './task-group.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat'; 

/**
 * Task group edit component
 */
@Component({
  selector: 'sitmun-task-group-edit',
  templateUrl: './task-group-edit.component.html',
  styleUrls: ['./task-group-edit.component.css']
})
export class TaskGroupEditComponent implements OnInit {
  
  /** task group to edit*/
  item: TaskGroup = new TaskGroup();
  
  /** all task groups*/
  items: TaskGroup[] = new Array<TaskGroup>();
  
  /** subscription*/
  sub: Subscription;
  
  /** constructor*/
  constructor(private route: ActivatedRoute,
    private router: Router,    
    private taskGroupService: TaskGroupService) {
  }
  
  /** On component init load all required data dependencies*/
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
  
  /** On component destroy remove subscription */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  /** load all task groups*/
  getAllTaskGroups() {
    this.taskGroupService.getAll()
    .subscribe((items: TaskGroup[]) => {
        this.items = items;
    });
  }
  
  /** navigate to task group list page*/
  gotoList() {
    this.router.navigate(['/task-group-list']);
  }
  
  /** save task group*/
  save() {
      this.taskGroupService.save(this.item).subscribe(result => {      
        this.gotoList();
      }, error => console.error(error));
  }
  
  /** remove task group*/
  remove(item: TaskGroup) {
    this.taskGroupService.delete(item).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }


}
