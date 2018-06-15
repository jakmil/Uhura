import { Component } from "@angular/core"
import { Platform } from "ionic-angular"
import { StatusBar } from "@ionic-native/status-bar"
import { SplashScreen } from "@ionic-native/splash-screen"

import { TabsPage } from "../pages/tabs/tabs"
import { Diagnostic } from "@ionic-native/diagnostic"

import { AlertController } from "ionic-angular"

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  rootPage: any = TabsPage

  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private diagnostic: Diagnostic,
    private alterCtrl: AlertController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault()
      splashScreen.hide()

      if (this.platform.is("cordova")) {
        this.diagnostic.isBluetoothAvailable().then(() => {
          console.log("Bluetooth is available, now checking if turned on")
          this.diagnostic.isBluetoothEnabled().then(bluetooth => {
            // Bluetooth is available but no enabled, ask user to go to setttings
            console.log("Is Bluetooth enabled? " + bluetooth)

            if (!bluetooth) {
              let alert = this.alterCtrl.create({
                title: "Bluetooth required",
                subTitle: "Turn bluetooth on to use this app",
                buttons: [
                  {
                    text: "Cancel",
                    role: "cancel",
                    handler: () => {
                      this.platform.exitApp()
                    },
                  },
                  {
                    text: "Go to settings",
                    handler: () => {
                      this.diagnostic.switchToBluetoothSettings()
                    },
                  },
                ],
              })

              alert.present()
            }
          })
        })
      }
    })
  }
}
