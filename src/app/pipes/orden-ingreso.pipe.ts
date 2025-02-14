import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../model/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    if (!items) {
      return [];
    }

    // Crear una copia del array para no modificar el original
    const sortedItems = [...items].sort((a, b) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });

    return sortedItems;
  }

}
