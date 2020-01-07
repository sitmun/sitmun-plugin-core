import { TaskType } from 'sitmun-frontend-core';
import { TaskTypeService } from 'sitmun-frontend-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';

/**
 * Task type edit component
 */
@Component({
  selector: 'sitmun-task-type-edit',
  templateUrl: './task-type-edit.component.html',
  styleUrls: ['./task-type-edit.component.css']
})
export class TaskTypeEditComponent implements OnInit {

  /** task type to edit*/
  item: TaskType = new TaskType();

  /** all task types*/
  items: TaskType[] = new Array<TaskType>();

  /** subscription*/
  sub: Subscription;

  /** constructor*/
  constructor(private route: ActivatedRoute,
    private router: Router,
    private taskTypeService: TaskTypeService) {
  }

  /** On component init load all required data dependencies*/
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

  /** On component destroy remove subscription */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /** load all task types*/
  getAllTaskTypes() {
    this.taskTypeService.getAll()
    .subscribe((items: TaskType[]) => {
        this.items = items;
    });
  }

  /** navigate to task type list page*/
  gotoList() {
    this.router.navigate(['/task-type-list']);
  }

  /** save task type*/
  save() {
      this.taskTypeService.save(this.item).subscribe(result => {
        this.gotoList();
      }, error => console.error(error));
  }

  /** remove task type*/
  remove(item: TaskType) {
    this.taskTypeService.delete(item).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }


}
