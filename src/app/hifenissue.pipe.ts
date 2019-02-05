import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hifenissue'
})
export class HifenissuePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = ('' + value).replace(/&#\d*;/g, '-');
    return value;
  }

}
