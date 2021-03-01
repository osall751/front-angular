import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RendezVous } from './modele/rendezvous';
import { RendezVousService } from './services/rendez-vous.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  implements OnInit{
  public rvs!: RendezVous[];

  constructor(private rvService: RendezVousService) {}

  public getRvs(): void {
    this.rvService.getRvs().subscribe(
      (response: RendezVous[]) => {
        this.rvs = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  supprimer(id:number): void {
    this.rvService.deleteRv(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getRvs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public chercherRv(cle:string):void{
    const resultats:RendezVous[]=[];
    for (const rv of this.rvs) {
      if((rv.description.toLocaleLowerCase().indexOf(cle.toLocaleLowerCase())!=-1)
      ||(rv.lieu.toLocaleLowerCase().indexOf(cle.toLocaleLowerCase())!=-1)
      ||(rv.date.toString().toLocaleLowerCase().indexOf(cle.toLocaleLowerCase())!=-1)){
        resultats.push(rv);
      }
    }
    this.rvs=resultats;
    console.log(this.rvs);
    
    if(resultats.length ===0 || !cle)
      this.getRvs();
  }
  
  ngOnInit(){
    this.getRvs();
  }
}
