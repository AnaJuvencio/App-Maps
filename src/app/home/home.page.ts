import { Component } from '@angular/core';
import { ViewChild, ElementRef} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google : any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map:any;
  posicaoAtual:any;

  @ViewChild('map', {read: ElementRef, static:false}) mapRef:ElementRef;

  constructor(private geolocation: Geolocation) {}

  public async showMap(){
    //const location = new google.maps.LatLng(-22.197439, -48.775970); Posição fixa
    await this.buscarPosicao();
    const options = {
      center: this.posicaoAtual,
      zoom:15,
      disableDefaultUI: false
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    const marcador = new google.maps.Marker({
      position: this.posicaoAtual,
      map: this.map,
      title: "Minha Posição Atual",
      animation: google.maps.Animation.BOUNCE
    });

  }

  ionViewDidEnter(){
    this.showMap();
  }

  public async buscarPosicao(){
    await this.geolocation.getCurrentPosition().then((posicaoGPS) => {
     
      this.posicaoAtual = {
        lat:posicaoGPS.coords.latitude,
        lng: posicaoGPS.coords.longitude
      }
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
