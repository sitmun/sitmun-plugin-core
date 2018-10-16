import { TaskUI } from './task-ui.model';
import { TaskUIService } from './task-ui.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat'; 

@Component({
  selector: 'sitmun-task-ui-edit',
  templateUrl: './task-ui-edit.component.html',
  styleUrls: ['./task-ui-edit.component.css']
})
export class TaskUIEditComponent implements OnInit {

  item: TaskUI = new TaskUI();
  items: TaskUI[] = new Array<TaskUI>();
  
  sub: Subscription;
  

  constructor(private route: ActivatedRoute,
    private router: Router,    
    private taskUIService: TaskUIService) {
  }

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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  getAllTaskUIs() {
    this.taskUIService.getAll()
    .subscribe((items: TaskUI[]) => {
        this.items = items;
    });
  }
  

  gotoList() {
    this.router.navigate(['/task-ui-list']);
  }

  save() {
      this.taskUIService.save(this.item).subscribe(result => {      
        this.gotoList();
      }, error => console.error(error));
  }

  remove(item: TaskUI) {
    this.taskUIService.delete(item).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }


}
