import { NgModule, ErrorHandler } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { IonicApp, IonicModule, IonicErrorHandler, Tabs } from "ionic-angular"
import { MyApp } from "./app.component"

import { InputPage } from "../pages/input/input"
import { OutputPage } from "../pages/output/output"
import { SettingsPage } from "../pages/settings/settings"
import { TabsPage } from "../pages/tabs/tabs"
import { ReadBackPage } from "../pages/read-back/read-back"
import { ShortcutsPage } from "../pages/shortcuts/shortcuts"

import { ComponentsModule } from "../components/components.module"

import { StatusBar } from "@ionic-native/status-bar"
import { SplashScreen } from "@ionic-native/splash-screen"
import { HideKeyboardModule } from "hide-keyboard"
import { Keyboard } from "@ionic-native/keyboard"

import { Diagnostic } from "@ionic-native/diagnostic"
import { ScreenOrientation } from "@ionic-native/screen-orientation"

import { TextToSpeech } from "@ionic-native/text-to-speech"
import { TtsProvider } from "../providers/tts/tts"
import { IonicStorageModule } from "@ionic/storage"

import { HttpClientModule } from "@angular/common/http"

import { File } from "@ionic-native/file"

import { NativeAudio } from "@ionic-native/native-audio"

import { Media } from "@ionic-native/media"
import { InputPageModule } from "../pages/input/input.module"
import { OutputPageModule } from "../pages/output/output.module"
import { SettingsPageModule } from "../pages/settings/settings.module"
import { ShortcutsPageModule } from "../pages/shortcuts/shortcuts.module"
import { ReadBackPageModule } from "../pages/read-back/read-back.module"

@NgModule({
  declarations: [MyApp, TabsPage],
  imports: [
    BrowserModule,
    InputPageModule,
    OutputPageModule,
    SettingsPageModule,
    ShortcutsPageModule,
    ReadBackPageModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
    }),
    HideKeyboardModule,
    HttpClientModule,
    IonicStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    Diagnostic,
    ScreenOrientation,
    Keyboard,
    TextToSpeech,
    NativeAudio,
    Media,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TtsProvider,
  ],
})
export class AppModule {}
