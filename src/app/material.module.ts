import { NgModule } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'

const materialModules = [MatInputModule, MatButtonModule, MatFormFieldModule]

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule {}
