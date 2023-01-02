import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { BlobComponent } from './blob.component';

const routes: Routes = [
  { path: '', redirectTo: '/blob', pathMatch: 'full' },
  { path: 'blob', component: BlobComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
