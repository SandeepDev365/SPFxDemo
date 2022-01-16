import * as React from 'react';
import styles from './GithubHello.module.scss';
import { IGithubHelloProps } from './IGithubHelloProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { orderBy, result } from 'lodash';
import CurrencyBusinessLayer from '../../../Services/CurrencyRate/CurrencyBusinessLayer';
import { DefaultButton, PrimaryButton, TextField } from '@microsoft/office-ui-fabric-react-bundle';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import * as _ from 'lodash';

export interface IGitHubHelloState {
  sourceCurrencySelected: IDropdownOption;
  targetCurrencySelected: IDropdownOption;
  currenciesddOptions: any;
  sourceinputCurrency: number;
  targetinputCurrency: number;
}

export default class GithubHello extends React.Component<IGithubHelloProps, IGitHubHelloState> {
  private currencyBusinessLayer: CurrencyBusinessLayer;

  constructor(props: IGithubHelloProps) {
    super(props);
    this.currencyBusinessLayer = new CurrencyBusinessLayer();
    this.state = {
      sourceCurrencySelected: null,
      targetCurrencySelected: null,
      currenciesddOptions: [],
      sourceinputCurrency: 0,
      targetinputCurrency: null
    };
  }

  public async componentDidMount() {
    let rawXml = await this.currencyBusinessLayer.getCurrencyRateXML();
    console.log("rawXml", rawXml);
    let ratesObj = await this.currencyBusinessLayer.parseXMLData(rawXml);
    console.log(ratesObj);
    // console.log("CHF Rate", ratesObj.find(i => i["$"].currency == "CHF")["$"]);
    this.getAvailableCurrencies(ratesObj);
  }

  private getAvailableCurrencies(ratesObj: any) {
    //let currencies = _.map(ratesObj, 'currency');
    let currencies = ratesObj.map(item => {
      return (
        {
          key: item['rate'],
          text: item['currency']
        }
      );
    });
    currencies.push({ key: '0', text: 'EUR' });
    currencies = _.orderBy(currencies, "text", "asc");
    this.setState({ currenciesddOptions: currencies });
  }

  private onSourceCurrencyddChange = () => (event: any, item: any) => {
    this.setState({ sourceCurrencySelected: item });
  }

  private onTargetCurrencyddChange = () => (event: any, item: any) => {
    this.setState({ targetCurrencySelected: item });
  }

  private updateInputSourceCurrencyValue(event: any) {
    this.setState({ sourceinputCurrency: event.target.value });
  }

  private convertCurrency() {
    let { sourceCurrencySelected, targetCurrencySelected, currenciesddOptions, sourceinputCurrency } = this.state;
    let inputInEUR, inputCurrency, outputCurrency;
    if (sourceinputCurrency && sourceCurrencySelected && targetCurrencySelected) {
      console.log("soucecurrencyvalue", sourceinputCurrency);
      console.log("sourceCurrencySelected key", sourceCurrencySelected.key);
      console.log("sourceCurrencySelected text", sourceCurrencySelected.text);

      inputInEUR = sourceCurrencySelected.text !== 'EUR'
        ? (sourceinputCurrency / parseFloat(sourceCurrencySelected.key.toString()))
        : (sourceinputCurrency);

      outputCurrency = targetCurrencySelected.text !== 'EUR'
        ? (inputInEUR * parseFloat(targetCurrencySelected.key.toString())).toFixed(2)
        : inputInEUR.toFixed(2);

      this.setState({targetinputCurrency: outputCurrency});
    }
    else {
      console.log("Invalid!!!");
    }
  }

  public render(): React.ReactElement<IGithubHelloProps> {
    let { sourceCurrencySelected, targetCurrencySelected, currenciesddOptions, targetinputCurrency } = this.state;
    console.log("In render", currenciesddOptions);
    return (
      <div>
        <div className={styles.parent}>
          <div className={styles.child}>
            <label className={styles.label}>Source Currency {sourceCurrencySelected ? " - " + sourceCurrencySelected.text : ""}</label><br /><br />
            <Dropdown options={currenciesddOptions} selectedKey={sourceCurrencySelected ? sourceCurrencySelected.key : undefined}
              onChange={this.onSourceCurrencyddChange()} placeholder='Select Source Currency' /><br /><br />
            <TextField type='number' name='sourceCurrencyValue' onBlur={(e) => this.updateInputSourceCurrencyValue(e)} />
          </div>
          <div className={styles.child}>
            <label className={styles.label}>Target Currency {targetCurrencySelected ? " - " + targetCurrencySelected.text : ""}</label><br /><br />
            <Dropdown options={currenciesddOptions} selectedKey={targetCurrencySelected ? targetCurrencySelected.key : undefined}
              onChange={this.onTargetCurrencyddChange()} placeholder='Select Target Currency' /><br /><br />
            <TextField type='number' name='targetCurrencyValue' disabled={true} value={targetinputCurrency ? targetinputCurrency.toString() : ""} />
          </div>
        </div>
        <div className={styles.Btnparent}>
          <DefaultButton text='Convert' onClick={() => this.convertCurrency()} className="mt25 actionBtnCenter" />
        </div>
      </div>
    );
  }
}
