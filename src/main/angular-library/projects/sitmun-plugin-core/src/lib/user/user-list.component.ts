import { User } from 'sitmun-frontend-core';
import { UserService } from 'sitmun-frontend-core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

/** Component for managing users*/
@Component({
  selector: 'sitmun-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  /** Users to manage */
  items: User[];

  /** Table displayed columns */
  displayedColumns = ['username','firstName','lastName','blocked','administrator','actions'];

  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<User>(this.items);

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Component constructor */
  constructor( private userService: UserService ) { }

  /** On component init, get all data dependencies */
  ngOnInit() {
    this.getAll();
  }

  /** load all users*/
  getAll() {
    this.userService.getAll()
    .subscribe((items: User[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<User>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }

  /** remove user*/
  remove(item: User) {
    this.userService.delete(item).subscribe(result => {
      this.getAll();
    }, error => console.error(error));

  }

}
