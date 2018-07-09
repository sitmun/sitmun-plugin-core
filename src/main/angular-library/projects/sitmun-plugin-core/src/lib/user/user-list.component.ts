import { User } from './user.model';
import { UserService } from './user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'sitmun-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  items: User[];
  
  displayedColumns = ['username','firstName','lastName','blocked','administrator','actions'];
  dataSource = new MatTableDataSource<User>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private userService: UserService ) { }
  
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.userService.getAll()
    .subscribe((items: User[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<User>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  remove(item: User) {
    this.userService.delete(item).subscribe(result => {
      this.getAll();
    }, error => console.error(error));
     
  }

}
