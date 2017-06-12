import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './main-content/welcome-page/welcome-page.component';
import { CreateProjectComponent } from './main-content/create-project/create-project.component';
import { ImportProjectComponent } from './main-content/import-project/import-project.component';
import { ProjectDetailsComponent } from './main-content/project-details/project-details.component';
import { ExecuteProjectComponent } from "app/main-content/execute-project/execute-project.component";

const routes: Routes = [
    {path: '', component: WelcomePageComponent},
    {path: 'create-project', component: CreateProjectComponent},
    {path: 'import-project', component: ImportProjectComponent},
    {path: 'execute-project/:name', component: ExecuteProjectComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{ }
export const routingComponents = [
    WelcomePageComponent, 
    CreateProjectComponent, 
    ImportProjectComponent,
    ExecuteProjectComponent
]