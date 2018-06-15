import { Component } from "@angular/core"
import { IonicPage, NavController, NavParams } from "ionic-angular"

/**
 * Generated class for the OutputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-output",
  templateUrl: "output.html",
})
export class OutputPage {
  speakers = [
    {
      name: "Internal speaker",
      active: false,
    },
    {
      name: "Uhura speaker",
      active: true,
    },
  ]

  volume = 8

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  devices() {
    return this.speakers
  }

  changeActive(name) {
    this.speakers.forEach(({ name: currentName }, index, devices) => {
      // change given item to active, and all the others to inactive
      if (name === currentName) {
        devices[index].active = true
      } else {
        devices[index].active = false
      }
    })
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OutputPage")
  }
}
