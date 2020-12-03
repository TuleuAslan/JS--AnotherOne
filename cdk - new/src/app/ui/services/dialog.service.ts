import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
    Injectable,
    Injector,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';
import { take } from 'rxjs/operators';
import { DIALOG_CONFIG } from './dialog.tokens';
import { IAlertConfig, IConfirmConfig } from './dialog.configurations';
import { ConfirmComponent } from '../components/confirm/confirm.component';
@Injectable({
    providedIn: 'root',
})
export class DialogService {
    constructor(private _overlay: Overlay) {}

    public async alert(
        config: IAlertConfig = { title: 'Alert', content: 'Alert content' }
    ): Promise<void> {
        return new Promise<any>((resolve, reject) => {
            const overlay = this._createOverlay({
                minWidth: '800px',
            });
            const injector = this._createInjector(overlay, {
                ...config,
                close: resolve,
            });
            const portal = new ComponentPortal(AlertComponent, null, injector);
            overlay.attach(portal);
            overlay
                .backdropClick()
                .pipe(take(1))
                .subscribe(() => {
                    overlay.dispose();
                    resolve();
                });
        });
    }

    public async confirm(config: IConfirmConfig = {}): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const overlay = this._createOverlay({
                minWidth: '800px',
            });
            const injector = this._createInjector(overlay, {
                cancelText: 'Cancel',
                confirmText: 'Confirm',
                ...config,
                close: resolve,
            } as IConfirmConfig);
            const portal = new ComponentPortal(
                ConfirmComponent,
                null,
                injector
            );
            overlay.attach(portal);
            overlay
                .backdropClick()
                .pipe(take(1))
                .subscribe(() => {
                    overlay.dispose();
                    resolve();
                });
        });
    }

    public async prompt(
        template: TemplateRef<any>,
        vcr: ViewContainerRef
    ): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const overlay = this._createOverlay({
                minWidth: '800px',
            });
            const portal = new TemplatePortal(template, vcr, {
                close: () => {
                    overlay.dispose();
                    resolve('');
                },
            });
            overlay
                .backdropClick()
                .pipe(take(1))
                .subscribe(() => {
                    overlay.dispose();
                    resolve();
                });
            overlay.attach(portal);
        });
    }

    private _createInjector(
        ref: OverlayRef,
        config: IAlertConfig | IConfirmConfig
    ) {
        const injector = Injector.create({
            providers: [
                { provide: OverlayRef, useValue: ref },
                { provide: DIALOG_CONFIG, useValue: config },
            ],
        });
        return injector;
    }

    private _createOverlay(config: OverlayConfig = {}): OverlayRef {
        const defaultConfig = {
            backdropClass: 'custom-modal-backdrop',
            hasBackdrop: true,
            positionStrategy: this._overlay
                .position()
                .global()
                .centerHorizontally()
                .centerVertically(),
            scrollStrategy: this._overlay.scrollStrategies.block(),
        } as OverlayConfig;
        return this._overlay.create({ ...defaultConfig, ...config });
    }
}
