import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
    Directive,
    ElementRef,
    HostListener,
    Injector,
    Input,
} from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';
import { TOOLTIP_TEXT } from '../services/dialog.tokens';

@Directive({
    selector: '[appTooltip]',
})
export class TooltipDirective {
    @Input() appTooltip: string;
    private _overlayRef: OverlayRef;
    private _timeout: any;

    constructor(private _overlay: Overlay, private _elementRef: ElementRef) {}

    @HostListener('mouseenter')
    handleMouseIn() {
        if (this._timeout) {
            clearTimeout(this._timeout);
            delete this._timeout;
        }
        setTimeout(() => {
            if (this._overlayRef) {
                return;
            }
            this._overlayRef = this._createOverlay();
            const portal = new ComponentPortal(
                TooltipComponent,
                null,
                Injector.create({
                    providers: [
                        { provide: TOOLTIP_TEXT, useValue: this.appTooltip },
                    ],
                })
            );
            this._overlayRef.attach(portal);
        }, 100);
    }

    @HostListener('mouseleave')
    handleMouseOut() {
        // this._timeout = setTimeout(() => {
        //     if (this._overlayRef) {
        //         this._overlayRef.dispose();
        //         delete this._overlayRef;
        //     }
        // }, 5000);
    }

    private _createOverlay() {
        return this._overlay.create({
            hasBackdrop: false,
            positionStrategy: this._overlay
                .position()
                .flexibleConnectedTo(this._elementRef)
                .withPositions([
                    {
                        offsetX: 12,
                        originX: 'end',
                        originY: 'center',
                        overlayX: 'start',
                        overlayY: 'center',
                    },
                    {
                        offsetY: -12,
                        originX: 'center',
                        originY: 'top',
                        overlayX: 'center',
                        overlayY: 'bottom',
                    },
                ]),
            scrollStrategy: this._overlay.scrollStrategies.reposition({
                autoClose: true,
                scrollThrottle: 10
            }),
        });
    }
}
