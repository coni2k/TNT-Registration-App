import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationCompletedComponent } from './registration-completed/registration-completed.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'completed', component: RegistrationCompletedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
