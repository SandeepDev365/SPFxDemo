import * as React from 'react';
import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import axios from 'axios';
import { CurrencyRateEndPoints }  from '../../Helper/Constants';


export default class currencyDataLayer{
    
    constructor(){
    }

    public async getCurrencyRates(apiEndPoint: string) {
        const response = await axios.get(apiEndPoint);
        return response.data;
    
        //#region Other ways to Call
        //var xhttp = new XMLHttpRequest();
    
        // xhttp.onreadystatechange = () => {
        //   if(xhttp.readyState == 4 && xhttp.status == 200){
        //     console.log(xhttp.responseXML);
        //   }
        // };
    
        // xhttp.open("GET", apiUrl, true);
        // xhttp.send();
    
        // axios.get(apiUrl)
        //   .then(response => {
        //     console.log(response);
        //   });
    
        // fetch('https://www.ecb.europa.eu/rss/fxref-usd.html')
        //   .then(response => response.text())
        //   .then((response) => {
        //     parseString((response) =>  {
        //       console.log(response);
        //     });
        //   }).catch((err) => {
        //     console.log('fetch', err);
        //   });
        //#endregion
        
      }
}