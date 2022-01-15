import * as React from 'react';
import styles from './GithubHello.module.scss';
import { IGithubHelloProps } from './IGithubHelloProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { parseString } from "react-native-xml2js";
import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import axios from 'axios';
import { result } from 'lodash';

export default class GithubHello extends React.Component<IGithubHelloProps, {}> {

  //private apiUrl = "https://www.ecb.europa.eu/rss/fxref-usd.html";

  //The first url enables Cross origin requests temporarily
  private apiUrl = "https://cors-anywhere.herokuapp.com/https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";

  private async getCurrencyRates() {
    const response = await axios.get(this.apiUrl);
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

  private async parseXMLData(xmlData: any){
    var data: any;
    await parseString(xmlData, (err, parsedData) => {
      console.log(parsedData["gesmes:Envelope"].Cube[0].Cube[0].Cube);
      data = parsedData["gesmes:Envelope"].Cube[0].Cube[0].Cube;
    });
    return data;
  }

  public async componentDidMount() {
    let rawXml = await this.getCurrencyRates();
    console.log("rawXml", rawXml);
    var ratesObj = await this.parseXMLData(rawXml);
    console.log(ratesObj);
    console.log("CHF Rate", ratesObj.find(i => i["$"].currency == "CHF")["$"]);
  }

  public render(): React.ReactElement<IGithubHelloProps> {
    return (
      <div className={styles.githubHello}>
        done
      </div>
    );
  }
}
