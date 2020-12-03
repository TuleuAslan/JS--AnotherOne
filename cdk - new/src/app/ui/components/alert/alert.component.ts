import { OverlayRef } from '@angular/cdk/overlay';
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { DIALOG_CONFIG } from '../../services/dialog.tokens';
import { IAlertConfig } from '../../services/dialog.configurations';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
    title: string;
    content: string;

    constructor(
        private _overlayRef: OverlayRef,
        @Inject(DIALOG_CONFIG) private _config: IAlertConfig
    ) {
        this.title = _config.title;
        this.content = _config.content;
    }

    ngOnInit(): void {
        console.log(this._overlayRef);
    }

    close() {
        this._overlayRef.dispose();
        this._config.close();
    }
}
