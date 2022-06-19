import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'upload', component: UploadExcelComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
