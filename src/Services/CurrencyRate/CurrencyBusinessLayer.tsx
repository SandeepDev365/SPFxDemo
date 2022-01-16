import * as React from 'react';
import { parseString } from "react-native-xml2js";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { CurrencyRateEndPoints } from '../../Helper/Constants';
import currencyDataLayer from '../CurrencyRate/CurrencyDataLayer';

export default class CurrencyBusinessLayer {
    private currencyDataLayer: currencyDataLayer;
    constructor() {
        this.currencyDataLayer = new currencyDataLayer();
    }

    public async getCurrencyRateXML() {
        let currencyRateUrl: string = CurrencyRateEndPoints.ReroutedEndPointwithCORS;
        return await this.currencyDataLayer.getCurrencyRates(currencyRateUrl).then((response: any) => {
            return (response);
        }).catch(error => {
            console.log("Error at Business Layer", error);
            throw (error);
        });
    }

    public async parseXMLData(xmlData: any) {
        let data: any, dataObj = [];
        await parseString(xmlData, (err, parsedData) => {
            console.log(parsedData["gesmes:Envelope"].Cube[0].Cube[0].Cube);
            data = parsedData["gesmes:Envelope"].Cube[0].Cube[0].Cube;
        });
        if(data){
            data.forEach(item => {
                dataObj.push(item["$"]);
            });
        }
        return dataObj;
    }
}