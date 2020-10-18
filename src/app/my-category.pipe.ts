import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCategory'
})
export class MyCategoryPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'ec':
        return "Economy Cars";
      case 'cc':
        return "Compact Cars";
      case 'ms':
        return "Medium Size Cars";
      case 'fs':
        return "Full Size Cars";
      case 'pc':
        return "Premium Cars";
      case 'lc':
        return "Luxury Cars";
      case 'suv':
        return "SUV Cars";
      default:
        return "All";
    }
  }

}
