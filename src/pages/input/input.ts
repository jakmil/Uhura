import { Component } from "@angular/core"
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular"
import { Diagnostic } from "@ionic-native/diagnostic"
import { TtsProvider } from "../../providers/tts/tts"

/**
 * Generated class for the InputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-input",
  templateUrl: "input.html",
})
export class InputPage {
  devices = [
    {
      name: "Virtual keyboard",
      active: true,
      available: true,
    },
    {
      name: "On-Screen keyboard",
      active: false,
      available: true,
    },
    {
      name: "Sign language glove",
      available: false,
      active: false,
    },
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private diagnostic: Diagnostic,
    private platform: Platform,
    private tts: TtsProvider
  ) {}

  availableDevices() {
    return this.devices.filter(device => {
      return device.available
    })
  }

  unavailableDevices() {
    return this.devices.filter(device => {
      return !device.available
    })
  }

  changeActive(name) {
    this.devices.forEach(({ name: currentName }, index, devices) => {
      // change given item to active, and all the others to inactive
      if (name === currentName) {
        devices[index].active = true
      } else {
        devices[index].active = false
      }
    })
  }

  ionViewDidLoad() {
    if (this.platform.is("cordova")) {
      this.diagnostic.isBluetoothEnabled().then(bluetooth => {
        if (!bluetooth) {
          this.platform.exitApp()
        }
      })
    }

    // setup tts
    this.tts.authenticate()
  }
}
