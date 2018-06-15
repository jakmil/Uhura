import { NgModule } from "@angular/core"
import { IonicPageModule } from "ionic-angular"
import { ShortcutsPage } from "./shortcuts"
import { ComponentsModule } from "../../components/components.module"

@NgModule({
  declarations: [ShortcutsPage],
  imports: [IonicPageModule.forChild(ShortcutsPage), ComponentsModule],
})
export class ShortcutsPageModule {}
