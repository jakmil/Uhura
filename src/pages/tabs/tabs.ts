import { Component, Input } from "@angular/core"

import { InputPage } from "../input/input"
import { OutputPage } from "../output/output"
import { SettingsPage } from "../settings/settings"

@Component({
  templateUrl: "tabs.html",
})
export class TabsPage {
  tab1Root = InputPage
  tab2Root = OutputPage
  tab3Root = SettingsPage

  constructor() {}
}
