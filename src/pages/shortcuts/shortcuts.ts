import { Component, HostListener } from "@angular/core"
import { IonicPage, NavController, NavParams } from "ionic-angular"
import { TextToSpeech } from "@ionic-native/text-to-speech"
import { TtsProvider } from "../../providers/tts/tts"

/**
 * Generated class for the ShortcutsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const PATTERNS = [
  {
    pattern: [true, false, false, false, false],
    letter: "a",
  },
  {
    pattern: [false, true, false, false, true],
    letter: "b",
  },
  {
    pattern: [true, false, true, true, true],
    letter: "c",
  },
  {
    pattern: [true, false, true, false, false],
    letter: "d",
  },
  {
    pattern: [false, true, false, false, false],
    letter: "e",
  },
  {
    pattern: [true, true, false, true, false],
    letter: "f",
  },
  {
    pattern: [true, false, true, true, false],
    letter: "g",
  },
  {
    pattern: [false, true, true, true, true],
    letter: "h",
  },
  {
    pattern: [false, false, true, false, false],
    letter: "i",
  },
  {
    pattern: [true, true, true, false, true],
    letter: "j",
  },
  {
    pattern: [true, false, false, true, false],
    letter: "k",
  },
  {
    pattern: [false, false, true, true, false],
    letter: "l",
  },
  {
    pattern: [false, true, false, true, false],
    letter: "m",
  },
  {
    pattern: [true, true, false, false, false],
    letter: "n",
  },
  {
    pattern: [false, false, false, true, false],
    letter: "o",
  },
  {
    pattern: [true, true, false, false, true],
    letter: "p",
  },
  {
    pattern: [false, true, true, false, true],
    letter: "q",
  },
  {
    pattern: [true, true, true, true, false],
    letter: "r",
  },
  {
    pattern: [false, false, false, true, true],
    letter: "s",
  },
  {
    pattern: [false, true, true, false, false],
    letter: "t",
  },
  {
    pattern: [false, false, false, false, true],
    letter: "u",
  },
  {
    pattern: [true, true, false, true, true],
    letter: "v",
  },
  {
    pattern: [true, false, true, false, true],
    letter: "w",
  },
  {
    pattern: [false, true, false, true, true],
    letter: "x",
  },
  {
    pattern: [true, false, false, false, true],
    letter: "y",
  },
  {
    pattern: [false, false, true, false, true],
    letter: "z",
  },
]

@IonicPage()
@Component({
  selector: "page-shortcuts",
  templateUrl: "shortcuts.html",
})
export class ShortcutsPage {
  currentKey: string

  shortcuts: any[] = [
    {
      sentence:
        "Thank you for the question. Thats very important in the context of the patients needs. My colleague will explain this in more detail.",
      pattern: [true, false, false, false, false],
      letter: "a",
      active: false,
    },
    {
      sentence: "Yes, You're totally right",
      pattern: [false, true, false, false, false],
      letter: "e",
      active: false,
    },
    {
      sentence: "No, that's actually not the case",
      pattern: [false, false, true, false, false],
      letter: "i",
      active: false,
    },
    {
      sentence:
        "That's a very good question. Maybe one of my partners can answer it.",
      pattern: [false, false, false, true, false],
      letter: "o",
      active: false,
    },
    {
      sentence: "Thank you very much.",
      pattern: [false, false, false, false, true],
      letter: "u",
      active: false,
    },
    {
      sentence: "Does this answer your question?",
      pattern: [true, true, false, false, false],
      letter: "n",
      active: false,
    },
    {
      sentence:
        "That’s a very good question. However, I don’t have any figures on that, so I can’t give you an accurate answer.",
      pattern: [true, true, true, true, false],
      letter: "r",
      active: false,
    },
    {
      sentence: "Is there any pizza left?",
      pattern: [true, false, false, false, true],
      letter: "y",
      active: false,
    },
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private tts: TtsProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ShortcutsPage")
  }

  @HostListener("document:keyup", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event)

    this.currentKey = event.key.toLocaleLowerCase()

    if (event.keyCode === 13) {
      // Enter key pressed
      this.sayText()
    } else {
      this.shortcuts.forEach(({ letter: letter }, index, shortcuts) => {
        if (letter === this.currentKey) {
          shortcuts[index].active = true
        } else {
          shortcuts[index].active = false
        }
      })
    }
  }

  shortcutClicked(key) {
    console.log("Shortcut clicked")
    this.currentKey = key
    this.shortcuts.forEach(({ letter: letter }, index, shortcuts) => {
      if (letter === this.currentKey) {
        shortcuts[index].active = true
      } else {
        shortcuts[index].active = false
      }
    })
    this.sayText()
  }

  sayText() {
    this.shortcuts.forEach(
      ({ active: active, sentence: sentence }, index, shortcuts) => {
        if (active) {
          this.tts.parseText(sentence)

          shortcuts[index].active = false
        }
      }
    )
  }
}

// /**
// import { Component, HostListener } from "@angular/core"
// import { IonicPage, NavController, NavParams } from "ionic-angular"
// import { TextToSpeech } from "@ionic-native/text-to-speech"
// import { TtsProvider } from "../../providers/tts/tts"
// import { Storage } from "@ionic/storage"

// /**
//  * Generated class for the ShortcutsPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.

// const PATTERNS = [
//   {
//     pattern: [true, false, false, false, false],
//     letter: "a",
//   },
//   {
//     pattern: [false, true, false, false, true],
//     letter: "b",
//   },
//   {
//     pattern: [true, false, true, true, true],
//     letter: "c",
//   },
//   {
//     pattern: [true, false, true, false, false],
//     letter: "d",
//   },
//   {
//     pattern: [false, true, false, false, false],
//     letter: "e",
//   },
//   {
//     pattern: [true, true, false, true, false],
//     letter: "f",
//   },
//   {
//     pattern: [true, false, true, true, false],
//     letter: "g",
//   },
//   {
//     pattern: [false, true, true, true, true],
//     letter: "h",
//   },
//   {
//     pattern: [false, false, true, false, false],
//     letter: "i",
//   },
//   {
//     pattern: [true, true, true, false, true],
//     letter: "j",
//   },
//   {
//     pattern: [true, false, false, true, false],
//     letter: "k",
//   },
//   {
//     pattern: [false, false, true, true, false],
//     letter: "l",
//   },
//   {
//     pattern: [false, true, false, true, false],
//     letter: "m",
//   },
//   {
//     pattern: [true, true, false, false, false],
//     letter: "n",
//   },
//   {
//     pattern: [false, false, false, true, false],
//     letter: "o",
//   },
//   {
//     pattern: [true, true, false, false, true],
//     letter: "p",
//   },
//   {
//     pattern: [false, true, true, false, true],
//     letter: "q",
//   },
//   {
//     pattern: [true, true, true, true, false],
//     letter: "r",
//   },
//   {
//     pattern: [false, false, false, true, true],
//     letter: "s",
//   },
//   {
//     pattern: [false, true, true, false, false],
//     letter: "t",
//   },
//   {
//     pattern: [false, false, false, false, true],
//     letter: "u",
//   },
//   {
//     pattern: [true, true, false, true, true],
//     letter: "v",
//   },
//   {
//     pattern: [true, false, true, false, true],
//     letter: "w",
//   },
//   {
//     pattern: [false, true, false, true, true],
//     letter: "x",
//   },
//   {
//     pattern: [true, false, false, false, true],
//     letter: "y",
//   },
//   {
//     pattern: [false, false, true, false, true],
//     letter: "z",
//   },
// ]

// @IonicPage()
// @Component({
//   selector: "page-shortcuts",
//   templateUrl: "shortcuts.html",
// })
// export class ShortcutsPage {
//   currentKey: string

//   shortcuts: any[] = []

//   constructor(
//     public navCtrl: NavController,
//     public navParams: NavParams,
//     private tts: TtsProvider,
//     private storage: Storage
//   ) {
//     this.storage.get("shortcuts").then(shortcuts => {
//       this.shortcuts = JSON.parse(shortcuts)

//       if (!this.shortcuts || this.shortcuts.length === 0) {
//         this.shortcuts = [
//           {
//             sentence:
//               "Thank you for the question. Thats very important in the context of the patients needs. My colleague will explain this in more detail.",
//             pattern: [true, false, false, false, false],
//             letter: "a",
//             active: false,
//           },
//           {
//             sentence: "Yes, You're totally right",
//             pattern: [false, true, false, false, false],
//             letter: "e",
//             active: false,
//           },
//           {
//             sentence: "No, that's actually not the case",
//             pattern: [false, false, true, false, false],
//             letter: "i",
//             active: false,
//           },
//           {
//             sentence: "Thank you very much for your attention",
//             pattern: [false, false, false, true, false],
//             letter: "o",
//             active: false,
//           },
//           {
//             sentence:
//               "If you have any questions, please don’t hesitate to ask.",
//             pattern: [false, false, false, false, true],
//             letter: "u",
//             active: false,
//           },
//           {
//             sentence: "Does this answer your question?",
//             pattern: [true, true, false, false, false],
//             letter: "n",
//             active: false,
//           },
//           {
//             sentence:
//               "That’s a very good question. However, I don’t have any figures on that, so I can’t give you an accurate answer.",
//             pattern: [true, true, true, true, false],
//             letter: "r",
//             active: false,
//           },
//           {
//             sentence: "Is there any pizza left?",
//             pattern: [true, false, false, false, true],
//             letter: "y",
//             active: false,
//           },
//         ]
//       }
//     })
//   }

//   ionViewDidLoad() {
//     console.log("ionViewDidLoad ShortcutsPage")
//   }

//   @HostListener("document:keyup", ["$event"])
//   handleKeyboardEvent(event: KeyboardEvent) {
//     console.log(event)

//     this.currentKey = event.key

//     if (event.keyCode === 13) {
//       // Enter key pressed
//       this.shortcuts.forEach(
//         ({ active: active, sentence: sentence }, index, shortcuts) => {
//           if (active) {
//             this.tts.parseText(sentence)

//             shortcuts[index].active = false
//           }
//         }
//       )
//     } else {
//       this.shortcuts.forEach(({ letter: letter }, index, shortcuts) => {
//         if (letter === this.currentKey) {
//           shortcuts[index].active = true
//         } else {
//           shortcuts[index].active = false
//         }
//       })
//     }
//   }

//   getPatternOfLetter(letter) {
//     PATTERNS.filter(pattern => {
//       return letter === pattern.letter
//     })[0].pattern
//   }

//   shortcutsAlreadyContainLetter(letter) {
//     const shortcutsWithLetter = this.shortcuts.filter(shortcut => {
//       return shortcut.letter === letter
//     })

//     return shortcutsWithLetter.length > 0
//   }

//   addShortcut(sentence, letter): boolean {
//     if (this.shortcutsAlreadyContainLetter(letter)) return false

//     const newShortcut = {
//       letter,
//       pattern: this.getPatternOfLetter(letter),
//       sentence: sentence,
//       active: false,
//     }

//     this.shortcuts.push(newShortcut)

//     this.storage.set("shortcuts", JSON.stringify(this.shortcuts))

//     return true
//   }

//   removeShortcut(letter) {
//     this.shortcuts = this.shortcuts.filter(shortcut => {
//       return shortcut.letter != letter
//     })

//     this.storage.set("shortcuts", JSON.stringify(this.shortcuts))
//   }
// }

// */
