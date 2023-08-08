import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderPipe'
})
export class OrderPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    if(filterText == ""  || filterText == null){
      return value;
    }
    
    return value.filter(p =>{
      const status = p.status.toLocaleLowerCase().includes(filterText.toLocaleLowerCase());
      const orderNumber = p.orderNumber.includes(filterText);
      return (status + orderNumber);
    });
  }

}
