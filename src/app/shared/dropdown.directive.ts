import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
// export class DropdownDirective implements OnInit {
//   @HostBinding('class.show') isOpen: boolean = false;

//   constructor(private elRef: ElementRef, private renderer: Renderer2) {}

//   ngOnInit() {}

//   @HostListener('click') toggleOpen(event: Event) {
//     this.isOpen = !this.isOpen;
//   }
// }
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;
  // @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
  //   this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  // }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    if (this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = !this.isOpen;
      let part = this.elRef.nativeElement.querySelector('.dropdown-menu');
      if (part) {
        if (this.isOpen) this.renderer.addClass(part, 'show');
        else this.renderer.removeClass(part, 'show');
      }
    } else {
      this.isOpen = false;
      let part = this.elRef.nativeElement.querySelector('.dropdown-menu');
      if (part) {
        this.renderer.removeClass(part, 'show');
      }
    }
  }
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
}
