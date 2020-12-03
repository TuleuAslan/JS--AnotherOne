import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

@Component({
    selector: 'app-page-layout',
    templateUrl: './page-layout.component.html',
    styleUrls: ['./page-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
