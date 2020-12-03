import { OverlayRef } from '@angular/cdk/overlay';
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { IConfirmConfig } from '../../services/dialog.configurations';
import { DIALOG_CONFIG } from '../../services/dialog.tokens';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent implements OnInit {
    title: string;
    content: string;
    confirmText: string;
    cancelText: string;

    constructor(
        private _overlayRef: OverlayRef,
        @Inject(DIALOG_CONFIG) private _config: IConfirmConfig
    ) {
        this.title = _config.title;
        this.content = _config.content;
        this.confirmText = _config.confirmText;
        this.cancelText = _config.cancelText;
    }

    ngOnInit(): void {
        console.log(this._overlayRef);
    }

    close(result: boolean) {
        this._overlayRef.dispose();
        this._config.close(result);
    }
}
