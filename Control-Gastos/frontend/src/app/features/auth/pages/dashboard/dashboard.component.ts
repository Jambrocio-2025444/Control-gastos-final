import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);

  currentUser: User | null = null;
  sessionTimestamp = new Date();

  roadmap = [
    {
      code: 'M-01',
      title: 'Registro de transacciones',
      description: 'Crea y administra tus ingresos y gastos con categorías, montos y notas.',
    },
    {
      code: 'M-02',
      title: 'Reportes y estadísticas',
      description: 'Visualiza gráficas y resúmenes de tus finanzas por mes, categoría y más.',
    },
    {
      code: 'M-03',
      title: 'Alertas y presupuestos',
      description: 'Define presupuestos y recibe notificaciones cuando te acerques al límite.',
    },
  ];

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  get roleLabel(): string {
    return this.currentUser?.role === 'admin' ? 'Administrador' : 'Usuario';
  }

  logout(): void {
    this.authService.logout();
  }
}