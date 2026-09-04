import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.scss'],
  standalone: false
})
export class SessionExpiredModalComponent {
  private authService = inject(AuthService);
  sessionExpired$ = this.authService.sessionExpired$;

  onAccept(): void {
    this.authService.dismissSessionExpired();
  }
}