import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/interfaces'

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.scss']
})
export class InfoAccountComponent {
  @Input() user!: User;

  isDeleting = false
  isEditing= false
}
