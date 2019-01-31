import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HifenissuePipe } from '../hifenissue.pipe';

@NgModule({
  declarations: [HifenissuePipe],
  imports: [CommonModule],
  exports: [HifenissuePipe],
})
export class SharedModule { }
