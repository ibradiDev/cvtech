import { UserService } from 'src/app/services/user.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-users-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.sass'],
})
export class UsersTableComponent {
  @Input() members!: any;

  constructor(private userService: UserService) {}

  changeMemberRole(memberID: number) {
    let user = this.userService.getUserByID(memberID);
    user!.role = user!.role === 'admin' ? 'user' : 'admin';
    this.userService.updateUser(memberID, user);
  }

  deleteOne(id: number) {
    if (
      confirm(
        '⚠ALERT SUPPRESSION⚠\nEtes-vous sûr de vouloir supprimer cet utilisateur?'
      )
    )
      this.userService.deleteOne(id);
  }
}
