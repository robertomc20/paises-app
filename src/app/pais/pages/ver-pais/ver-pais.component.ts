import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  // El activatedRoute nos permite subscribirnos a cualquier cambio del url
  constructor( 
      private activatedRoute: ActivatedRoute, 
      private PaisService: PaisService
  ) { }
  
  // Esta es una forma de obtener el pais, pero hay otra forma más eficiente.
  /*
  ngOnInit(): void {
    this.activatedRoute.params
      //aca podriamos usar params, y luego llamar por params.id. pero preferimos desestructurarla.
      .subscribe( ({ id }) => {
        //console.log(params);
        console.log(id);

        this.PaisService.getPaisPorAlpha(id)
          .subscribe( pais => {
            console.log(pais);
          });
      });

  }
  */
 // Forma mas eficiente
 // El switchMap, recibe un valor(id) y debe retornar un nuevo observable.
 // El tap es un operador que dispara un efecto secundario.
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.PaisService.getPaisPorAlpha( id ) ),
        tap(console.log)
      )
      .subscribe( pais => this.pais = pais );
  }

}
