import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { PaddleEventCallbackData } from './interfaces';
import { PaddleService } from './paddle.service';

@Directive({
  selector: '[ngxPaddle]',
})
export class PaddleDirective {
  @Output() onCheckoutEvent: EventEmitter<
    PaddleEventCallbackData
  > = new EventEmitter();
  @Input() vendor?: number;
  @Input() product?: number;
  @Input() title?: string;
  @Input() message?: string;
  @Input() coupon?: string;
  @Input() email?: string;

  constructor(private paddleServ: PaddleService) {}

  async ngOnInit() {

    if (this.vendor == null) {
      throw new Error(`'vendor has to be set!'`);
    }
    
    await this.paddleServ.create({
      vendor: this.vendor,
      eventCallback: (data: PaddleEventCallbackData) => {
        this.onCheckoutEvent.emit(data);
      },
    });
  }

  @HostListener('click')
  onClick() {
    this.paddleServ.open({
      product: this.product,
      title: this.title,
      message: this.message,
      coupon: this.coupon,
      email: this.email,
    });
  }
}
