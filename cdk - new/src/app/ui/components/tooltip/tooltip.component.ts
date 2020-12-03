import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { TOOLTIP_TEXT } from '../../services/dialog.tokens';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent implements OnInit {
    text: string;

    constructor(@Inject(TOOLTIP_TEXT) text: string) {
        this.text = text;
    }

    ngOnInit(): void {}
}
