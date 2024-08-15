import { ActivatedRouteSnapshot, ResolveFn, Route } from '@angular/router';

export const titleResolver: ResolveFn<string> = (
  route: ActivatedRouteSnapshot
) => route.routeConfig?.path?.replace('-', ' ') ?? '';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/expenses-overview',
  },
  {
    path: 'expenses-overview',
    loadComponent: () =>
      import(
        './pages/expenses-overview-page/expenses-overview-page.component'
      ).then(
        ({ ExpensesOverviewPageComponent }) => ExpensesOverviewPageComponent
      ),
    title: titleResolver,
  },
  {
    path: 'expenses-approval',
    title: titleResolver,
    loadComponent: () =>
      import(
        './pages/expenses-approval-page/expenses-approval-page.component'
      ).then(
        ({ ExpensesApprovalPageComponent }) => ExpensesApprovalPageComponent
      ),
  },
];
