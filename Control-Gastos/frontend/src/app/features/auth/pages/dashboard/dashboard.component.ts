import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { IncomeService } from '../../../../core/services/income.service';
import { User } from '../../../../core/models/user.model';

interface KpiCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  iconType: 'trending-up' | 'trending-down' | 'piggy-bank' | 'calendar';
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
  private incomeService = inject(IncomeService);

  currentUser: User | null = null;

  // Dato real — viene de IncomeService, la misma fuente que usa el módulo de Ingresos
  totalIncome$ = this.incomeService.total$;

  // Estos tres siguen siendo de ejemplo hasta que existan sus módulos correspondientes
  kpis: KpiCard[] = [
    { label: 'Egresos', value: 'Q 0', change: '↑ 12.4% vs. julio', trend: 'down', iconType: 'trending-down' },
    { label: 'Ahorros', value: 'Q 0', change: '22.4% de tus ingresos', trend: 'up', iconType: 'piggy-bank' },
    { label: 'Deudas del mes', value: 'Q 0', change: '28% de tus ingresos', trend: 'down', iconType: 'calendar' },
  ];

  cashFlow: CashFlowWeek[] = [
    { label: 'Sem 1', ingresos: 55, egresos: 30 },
    { label: 'Sem 2', ingresos: 85, egresos: 65 },
    { label: 'Sem 3', ingresos: 70, egresos: 80 },
    { label: 'Sem 4', ingresos: 100, egresos: 60 },
  ];

  debtHealthPercent = 0;
  debtHealthGoal = 0;

  salaryCoversDebt = true;
  remainingAfterDebt = 'Q 0';
  debtTotal = 'Q ';

  savingsAmount = 'Q 0';
  savingsProgressPercent = 40;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.incomeService.loadIncomes();
  }
}