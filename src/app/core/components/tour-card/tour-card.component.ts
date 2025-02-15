import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'vsf-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.scss'],
})
export class TourCardComponent {
  @Input() name!: string
  @Input() location!: string
  @Input() provider!: string
  @Input() stay_period!: string
  @Input() image_url!: string

  @Input() rating!: number
  @Input() reviews!: number
  @Input() discount!: number
  @Input() price!: number

  @Output() contactClicked = new EventEmitter<void>()

  onContactClick() {
    this.contactClicked.emit()
  }
}
