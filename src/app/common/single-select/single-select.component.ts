import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'akv-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => 
      SingleSelectComponent
    ),
    multi: true
  }]
})
export class SingleSelectComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder!: string;
  @Input() optionList: Array<{id: number | string, itemName: string }> = []

  value!: any;
  onTouched = () =>{};
  onChanged = (value: any) => {};
  disable = false;
  
  constructor() { }

  ngOnInit(): void {

  }

  onClearValue() {
    this.value = null;
    this.onChanged(null);
  }

  onValueChanged(item: any) {
    this.value = item;
    this.onChanged(this.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
  }

}
