import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import {
  TODO_LIST_ITEM_TRIGGER,
  HOVER_ANIMATION,
} from './toasts-page.animation';

@Component({
  templateUrl: './toasts-page.component.html',
  styleUrls: ['./toasts-page.component.scss'],
  animations: [TODO_LIST_ITEM_TRIGGER],
})
export class ToastsPageComponent implements OnInit {

  constructor(private toastr: ToastrService) { }
  verTop = 'top';
  verCenter = 'center';
  verBottom = 'bottom';
  horTop = 'right';
  horBottom = 'left';
  horCenter = 'center';
  timeDefaultValue = 3;

  titleControl = new FormControl('', [Validators.required]);
  contentControl = new FormControl('', [Validators.required]);
  formForInput = new FormGroup({
    title: this.titleControl,
    content: this.contentControl
  });
  selectControl = new FormControl(1, [Validators.required]);
  verticalControl = new FormControl('', [Validators.required]);
  horizontalControl = new FormControl('', [Validators.required]);
  showTitleControl = new FormControl(true, [Validators.required]);
  hasCloseBtnControl = new FormControl(true, [Validators.required]);
  showDurationControl = new FormControl(true, [Validators.required]);

  @Output()
    remove = new EventEmitter();

  @HostBinding('@listItemHover')
    state: 'default' | 'hovered' | 'secondColor' | 'leaving' = 'default';

  leaving = false;
    
  removeHandler() {
      // this.state = 'leaving';
      this.remove.emit();
      this.leaving = true;
  }

  createToast(){
    if (this.selectControl.value === 1) {
      this.successMessage();
    }
    else{
      this.errorMessage();
    }
  }

  successMessage(){
    this.toastr.success(`${this.contentControl.value}`, `${this.titleControl.value}`, {
      positionClass: `toast-${this.verticalControl.value}-${this.horizontalControl.value}`,
      timeOut: this.timeDefaultValue*1000,
      closeButton: this.hasCloseBtnControl.value,
      progressBar: this.showDurationControl.value,
    });
  }

  errorMessage(){
    this.toastr.error(`${this.contentControl.value}`, `${this.titleControl.value}`, {
      positionClass: `toast-${this.verticalControl.value}-${this.horizontalControl.value}`,
      timeOut: this.timeDefaultValue*1000,
      closeButton: this.hasCloseBtnControl.value,
      progressBar: this.showDurationControl.value,
    });
  }
  ngOnInit(): void {
  }
}
