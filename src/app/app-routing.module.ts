import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/shared/component/layout/layout.component';
import { contentRoutes } from './modules/shared/routes/content.routes';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  {path : '',component : LayoutComponent, children : contentRoutes,canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
