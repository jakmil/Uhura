import { Component, Input } from "@angular/core"

/**
 * Generated class for the ShortcutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "shortcut",
  templateUrl: "shortcut.html",
})
export class ShortcutComponent {
  @Input() sentence: string
  @Input() pattern: number[]

  text: string

  constructor() {
    console.log("Hello ShortcutComponent Component")
    this.text = "Hello World"
  }
}
