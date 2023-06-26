import { Route, Routes } from "@angular/router";

export const contentRoutes : Routes = [
    {path :'dashboard',loadChildren : () => import('../../../modules/dashboard/dashboard.module').then(m=> m.DashboardModule)},
    {path :'invoice',loadChildren : () => import('../../../modules/invoice/invoice.module').then(m => m.InvoiceModule)},
    {path :'masters',loadChildren : () => import('../../../modules/masters/masters.module').then(m=> m.MastersModule)},
    {path : 'products',loadChildren : () => import('../../../modules/products/products.module').then(m=> m.ProductsModule)},
    {path : 'reports',loadChildren : () => import('../../../modules/reports/reports.module').then(m=> m.ReportsModule)},
    {path : 'sales',loadChildren : () => import('../../../modules/sales/sales.module').then(m=> m.SalesModule)},
    {path : 'settings',loadChildren : () => import('../../../modules/settings/settings.module').then(m => m.SettingsModule)},
    {path : 'users',loadChildren : () => import('../../../modules/users/users.module').then(m=> m.UsersModule)}
]