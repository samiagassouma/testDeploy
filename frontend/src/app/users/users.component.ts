import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { last } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users: any;
newUser: any = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  address: ''
};
selectedUser: any;
showUserPopup: boolean = false;
  constructor(private usersService: UsersService) { }


  ngOnInit(): void {
    this.loadUsers();
  }

  
  loadUsers() {
    // Logic to load users from the backend
    this.usersService.findAllUsers().subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }

  updateUser() {

    this.usersService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
      this.toggleUserPopup(null); // Close the popup
      this.loadUsers(); // Refresh the user list
    });
  }
  deleteUser(userId: number) {
    // Logic to delete a user
    this.usersService.deleteUser(userId).subscribe(() => {
      this.loadUsers(); // Refresh the user list
    });
  }

  addUser() {
    this.usersService.createUser(this.newUser).subscribe(() => {
      this.loadUsers(); // Refresh the user list
    });
  }
  openUserPopup(user: any) {
    this.showUserPopup = true;
    this.newUser = { ...user };
  }


  toggleUserPopup(user: any) {
    this.showUserPopup = !this.showUserPopup;
    this.selectedUser = { ...user };
  } 

}
