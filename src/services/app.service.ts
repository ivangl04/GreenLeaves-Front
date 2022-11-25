import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { CiudadDTO } from '../models/CiudadDTO.model';
import { ContactoDTO } from '../models/ContactoDTO.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    });

    apiContactoURL = environment.apiContactoURL;
    apiCiudadURL = environment.apiCiudadURL;

    constructor(private httpClient: HttpClient) { }

    getCiudades(): Observable<Array<CiudadDTO>> {
        return this.httpClient.get<Array<CiudadDTO>>(`${this.apiCiudadURL}`, {headers: this.headers});
    }

    getCiudad(ciudad: string): Observable<Array<CiudadDTO>> {
        return this.httpClient.get<Array<CiudadDTO>>(`${this.apiCiudadURL}/${ciudad}`, {headers: this.headers});
    }

    postContacto(contacto: ContactoDTO): Observable<ContactoDTO> {
        return this.httpClient.post<ContactoDTO>(`${this.apiContactoURL}`, contacto ,{headers: this.headers});
    }
}