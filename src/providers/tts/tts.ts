import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

import { ResponseContentType } from "@angular/http"

import { File } from "@ionic-native/file"
import { Media, MediaObject } from "@ionic-native/media"
import { NativeAudio } from "@ionic-native/native-audio"

const KEY = "9572602d40694ba9a05ebb2b2e990e73"
const AUTH_ENDPOINT =
  "https://northeurope.api.cognitive.microsoft.com/sts/v1.0/issueToken"
const API_ENDPOINT =
  "https://northeurope.tts.speech.microsoft.com/cognitiveservices/v1"

@Injectable()
export class TtsProvider {
  currentToken = undefined

  constructor(
    public http: HttpClient,
    private file: File,
    private media: Media,
    private nativeAudio: NativeAudio
  ) {
    this.authenticate()

    this.file.createDir("file:///storage/emulated/0", "speeches", true)
  }

  authenticate() {
    this.http
      .post(
        AUTH_ENDPOINT,
        {},
        {
          headers: {
            "Ocp-Apim-Subscription-Key": KEY,
          },
          responseType: "text",
        }
      )
      .subscribe(response => {
        this.currentToken = response
      })
  }

  parseText(text: string) {
    if (!text) return

    const responseType = ResponseContentType.Blob

    const options = {}

    this.http
      .post(
        API_ENDPOINT,
        `
      <speak version='1.0' xml:lang='en-US'>
        <voice xml:lang='en-US' xml:gender='Male' name='Microsoft Server Speech Text to Speech Voice (en-US, Guy24kRUS)'>
          ${text}
        </voice>
      </speak>
      `,
        {
          headers: {
            "Content-Type": "text/xml",
            Authorization: `Bearer ${this.currentToken}`,
            "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
          },
          responseType: "blob",
        }
      )
      .subscribe(response => {
        let blob = new Blob([response], { type: "audio/mpeg" })

        this.file
          .writeFile(
            "file:///storage/emulated/0/speeches/",
            "currentSpeech.mpg",
            blob,
            { replace: true }
          )
          .then(response => {
            console.log(response)

            const file: MediaObject = this.media.create(response.nativeURL)
            file.onSuccess.subscribe(() => {
              console.log("File is successful")
            })

            file.play()
            this.nativeAudio.stop("imagine")

            file.onError.subscribe(error => console.log("Error!", error))
          })
          .catch(err => {
            console.log("OOOOPS, there  was an error with the tts: ")
            console.log(err)
          })
      })
  }

  johnLennon() {
    // const mediaObject: MediaObject = this.media.create(
    //   "/assets/audio/imagine.mp3"
    // )

    this.nativeAudio
      .preloadComplex("imagine", "assets/audio/imagine.mp3", 1, 1, 0)
      .then(() => {
        console.log("success john lennon")

        this.nativeAudio
          .play("imagine")
          .then(() => {
            console.log("john lennon playing")
          })
          .catch(err => {
            console.log("john lennon failing")
            console.log(err)
          })
      })
      .catch(err => {
        console.log("error with john lennon")
        console.log(err)

        this.nativeAudio
          .play("imagine")
          .then(() => {
            console.log("john lennon playing")
          })
          .catch(err => {
            console.log("john lennon failing")
            console.log(err)
          })
      })

    // mediaObject.onError.subscribe(error => console.log("Error!", error))
    // mediaObject.onSuccess.subscribe(() => {
    //   console.log("File is successful")
    // })

    // mediaObject.play()
  }
}
