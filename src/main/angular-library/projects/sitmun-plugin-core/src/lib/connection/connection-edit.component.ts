import { Connection } from './connection.model';
import { ConnectionService } from './connection.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat'; 

/**
 * Connection edit component
 */
@Component({
  selector: 'sitmun-connection-edit',
  templateUrl: './connection-edit.component.html',
  styleUrls: ['./connection-edit.component.css']
})
export class ConnectionEditComponent implements OnInit {
  
  /** connection to edit*/
  item: Connection = new Connection();

  /** all connections*/
  items: Connection[] = new Array<Connection>();
  
  /** subscription*/
  sub: Subscription;
  
  /** constructor*/
  constructor(private route: ActivatedRoute,
    private router: Router,    
    private connectionService: ConnectionService) {
  }
  
  /** On component init load all required data dependencies*/
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
  
  /** On component destroy remove subscription */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  /** load all connections*/
  getAllConnections() {
    this.connectionService.getAll()
    .subscribe((items: Connection[]) => {
        this.items = items;
    });
  }
  
  /** navigate to territory list page*/
  gotoList() {
    this.router.navigate(['/connection-list']);
  }
  
  /** save connection*/
  save() {
      this.connectionService.save(this.item).subscribe(result => {      
        this.gotoList();
      }, error => console.error(error));
  }
  
  /** remove connection*/
  remove(item: Connection) {
    this.connectionService.delete(item).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }


}
