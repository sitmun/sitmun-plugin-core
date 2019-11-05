import { TaskUI } from './task-ui.model';
import { TaskUIService } from './task-ui.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat'; 

/**
 * Task UI edit component
 */
@Component({
  selector: 'sitmun-task-ui-edit',
  templateUrl: './task-ui-edit.component.html',
  styleUrls: ['./task-ui-edit.component.css']
})
export class TaskUIEditComponent implements OnInit {
  
  /** task UI to edit*/
  item: TaskUI = new TaskUI();
  
  /** all task UIs*/
  items: TaskUI[] = new Array<TaskUI>();
  
  /** subscription*/
  sub: Subscription;
  
  /** constructor */
  constructor(private route: ActivatedRoute,
    private router: Router,    
    private taskUIService: TaskUIService) {
  }
  
  /** On component init load all required data dependencies*/
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      
      if (id) {
        this.taskUIService.get(id).subscribe((item: any) => {
          if (item) {
            this.item = item;
            
            
            
          } else {
            console.log(`taskUI with id '${id}' not found, returning to list`);
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
  
  /** load all task UIs*/
  getAllTaskUIs() {
    this.taskUIService.getAll()
    .subscribe((items: TaskUI[]) => {
        this.items = items;
    });
  }
  
  /** navigate to task UI list page*/
  gotoList() {
    this.router.navigate(['/task-ui-list']);
  }
  
  /** save task UI*/
  save() {
      this.taskUIService.save(this.item).subscribe(result => {      
        this.gotoList();
      }, error => console.error(error));
  }
  
  /** remove task UI*/
  remove(item: TaskUI) {
    this.taskUIService.delete(item).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }


}
