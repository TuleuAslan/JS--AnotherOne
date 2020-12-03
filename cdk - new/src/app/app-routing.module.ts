import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogPageComponent } from './pages/dialog-page/dialog-page.component';
import { ToastsPageComponent } from './pages/toasts-page/toasts-page.component';

const routes: Routes = [
    {
        path: 'dialog',
        component: DialogPageComponent,
    },
    {
        path: 'toasts',
        component: ToastsPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
