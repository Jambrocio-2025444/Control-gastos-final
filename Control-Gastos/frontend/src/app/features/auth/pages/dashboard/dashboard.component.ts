import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';

interface KpiCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  iconType: 'trending-up' | 'trending-down' | 'refresh' | 'calendar';
}

interface CashFlowWeek {
  label: string;
  ingresos: number; 
  egresos: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);

  currentUser: User | null = null;

navItems = [
  { label: 'Resumen', icon: 'home', active: true },
  { label: 'Ingresar tus ingresos', icon: 'arrow-down', active: false },
  { label: 'Ingresa tus egresos', icon: 'arrow-up', active: false },
  { label: 'Metas de ahorro', icon: 'target', active: false },
];

kpis: KpiCard[] = [
  { label: 'Ingresos', value: 'Q 7,500', change: '↑ 8.2% vs. julio', trend: 'up', iconType: 'trending-up' },
  { label: 'Egresos', value: 'Q 5,820', change: '↑ 12.4% vs. julio', trend: 'down', iconType: 'trending-down' },
  { label: 'Ahorros', value: 'Q 1,680', change: '22.4% de tus ingresos', trend: 'up', iconType: 'refresh' },
  { label: 'Deudas del mes', value: 'Q 2,100', change: '28% de tus ingresos', trend: 'down', iconType: 'calendar' },
];

  cashFlow: CashFlowWeek[] = [
    { label: 'Sem 1', ingresos: 55, egresos: 30 },
    { label: 'Sem 2', ingresos: 85, egresos: 65 },
    { label: 'Sem 3', ingresos: 70, egresos: 80 },
    { label: 'Sem 4', ingresos: 100, egresos: 60 },
  ];

  debtHealthPercent = 28;
  debtHealthGoal = 35;

  salaryCoversDebt = true;
  remainingAfterDebt = 'Q 5,400';
  debtTotal = 'Q 2,100';

  savingsAmount = 'Q 1,680';
  savingsProgressPercent = 40;


  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  get roleLabel(): string {
    return this.currentUser?.role === 'admin' ? 'Administrador' : 'Usuario';
  }

  get userInitials(): string {
    const name = this.currentUser?.username ?? '';
    return name.slice(0, 2).toUpperCase();
  }

  logout(): void {
    this.authService.logout();
  }
}