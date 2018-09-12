import { Connection } from './connection.model';
import { ConnectionService } from './connection.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat'; 

@Component({
  selector: 'sitmun-connection-edit',
  templateUrl: './connection-edit.component.html',
  styleUrls: ['./connection-edit.component.css']
})
export class ConnectionEditComponent implements OnInit {

  item: Connection = new Connection();
  items: Connection[] = new Array<Connection>();
  
  sub: Subscription;
  

  constructor(private route: ActivatedRoute,
    private router: Router,    
    private connectionService: ConnectionService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      
      if (id) {
        this.connectionService.get(id).subscribe((item: any) => {
          if (item) {
            this.item = item;
            
            
            
          } else {
            console.log(`connection with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  getAllConnections() {
    this.connectionService.getAll()
    .subscribe((items: Connection[]) => {
        this.items = items;
    });
  }
  

  gotoList() {
    this.router.navigate(['/connection-list']);
  }

  save() {
      this.connectionService.save(this.item).subscribe(result => {      
        this.gotoList();
      }, error => console.error(error));
  }

  remove(item: Connection) {
    this.connectionService.delete(item).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }


}
