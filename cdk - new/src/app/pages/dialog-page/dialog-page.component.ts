import {
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { DialogService } from 'src/app/ui/services/dialog.service';

@Component({
    templateUrl: './dialog-page.component.html',
    styleUrls: ['./dialog-page.component.scss'],
})
export class DialogPageComponent implements OnInit {
    constructor(
        private _dialog: DialogService,
        private _vcr: ViewContainerRef
    ) {}

    ngOnInit(): void {}

    @ViewChild('modalTemplate')
    modalTemplate: TemplateRef<any>;

    public async showAlert() {
        console.log('Alert shown');
        await this._dialog.alert({
            title: 'Custom alert title',
            content: 'Custom alert content',
        });
        console.log('Alert closed');
    }

    public async showConfirm() {
        const result = await this._dialog.confirm({
            title: 'Confirm removal',
            content: 'Do you really want to remove this item?',
            cancelText: 'No',
            confirmText: 'Yes',
        });
        console.log('User answered: ', result ? 'Yes' : 'No');
    }

    public showPrompt() {
        this._dialog.prompt(this.modalTemplate, this._vcr);
    }
}
