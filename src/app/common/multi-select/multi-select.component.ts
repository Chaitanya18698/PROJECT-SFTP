import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'akv-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() =>
      MultiSelectComponent
    ), multi: true
  }]
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder!: string;
  @Input() optionList: Array<{ id: any, itemName: string }> = []
  @Input() invalid: any = false

  value: any[] = []
  onTouched = () => { };
  onChanged = (value: any) => { };
  disable = false;

  set: Set<number> = new Set()

  randomId: any;

  constructor() { }


  ngOnInit(): void {
    this.randomId = Math.random().toString();

    
    $(document).on('click','.multi-dropdown .dropdown-menu',(event:any)=>{
      event.stopPropagation();
      event.stopImmediatePropagation();
    });
  }

  onToggleValue(event: Event,item: any) {
    // event.preventDefault();
    event.stopPropagation();
    // event.stopImmediatePropagation
    if (this.set.has(item.id)) {
      this.set.delete(item.id);
      this.value = this.value.filter(el => el.id !== item.id);
    } else {
      this.set.add(item.id);
      this.value.push(item);
    }
    this.onChanged(this.value);
  }

  onClearValue() {
    this.value = [];
    this.onChanged([]);
  }

  writeValue(obj: any[]): void {
    this.set.clear();
    for (const item of obj) {
      this.set.add(item.id)
    }
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

  stopProp(e:any){
    e.stopPropagation();
  }

}
