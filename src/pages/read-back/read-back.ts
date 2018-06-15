import { Component, ViewChild } from "@angular/core"
import { IonicPage, NavController, NavParams } from "ionic-angular"
import { ScreenOrientation } from "@ionic-native/screen-orientation"

import { TextToSpeech } from "@ionic-native/text-to-speech"
import { ShortcutsPage } from "../shortcuts/shortcuts"
import { TtsProvider } from "../../providers/tts/tts"

// import { Keyboard } from "@ionic-native/keyboard"

/**
 * Generated class for the ReadBackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-read-back",
  templateUrl: "read-back.html",
})
export class ReadBackPage {
  @ViewChild("input") input
  @ViewChild("scroll") list

  focusInterval: any

  sentences: string[]
  currentSentence: string = ""

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation, // private keyboard: Keyboard
    private tts: TtsProvider
  ) {}

  ionViewWillLeave() {
    clearInterval(this.focusInterval)
  }

  ionViewDidLoad() {
    this.focusInterval = setInterval(() => {
      this.input.setFocus()
      // this.keyboard.close()
    }, 300)

    this.sentences = new Array<string>()
  }

  public scrollToBottom(scroll) {
    scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight
  }

  scrollDown() {
    this.scrollToBottom(this.list._scrollContent.nativeElement)
  }

  addSentence() {
    if (!this.currentSentence) return

    // do the tts thingy
    // this.tts.speak({
    //   text: this.currentSentence,
    //   locale: "en-US",
    // })

    if (this.currentSentence == "imagine") {
      // easteregg
      this.tts.johnLennon()
      console.log("### John Lennon ###")
    } else {
      this.tts.parseText(this.currentSentence)
    }

    // add the sentence to the history
    this.sentences.push(this.currentSentence)
    this.currentSentence = ""

    this.scrollDown()
  }

  switchToShortcuts() {
    this.navCtrl.push(ShortcutsPage)
  }
}
