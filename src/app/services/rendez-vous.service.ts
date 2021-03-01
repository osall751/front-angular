import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RendezVous } from '../modele/rendezvous';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private urlServeurApi=environment.urlServeurApi;
 
  constructor(private http: HttpClient) { }

  public getRvs():Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.urlServeurApi}/rv/tousrv`);
  }

  public ajouterRv(rv:RendezVous):Observable<RendezVous> {
    return this.http.post<RendezVous>(`${this.urlServeurApi}/rv/ajouter`, rv);
  }

  public updateRv(rv:RendezVous):Observable<RendezVous> {
    return this.http.put<RendezVous>(`${this.urlServeurApi}/rv/miseajour`, rv);
  }
  
  public deleteRv(idRv:number):Observable<void> {
    return this.http.delete<void>(`${this.urlServeurApi}/rv/supprimer/${idRv}`);
  }
}
