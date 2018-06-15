import { Component } from "@angular/core"
import { IonicPage, NavController, NavParams } from "ionic-angular"
import { ScreenOrientation } from "@ionic-native/screen-orientation"

import { ReadBackPage } from "../read-back/read-back"

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html",
})
export class SettingsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingsPage")
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }

  switchToReadBack() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE)
    this.navCtrl.push(ReadBackPage)
  }
}
