import * as React from 'react';
import styles from './GithubHello.module.scss';
import { IGithubHelloProps } from './IGithubHelloProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class GithubHello extends React.Component<IGithubHelloProps, {}> {
  public render(): React.ReactElement<IGithubHelloProps> {
    return (
      <div className={ styles.githubHello }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>This is an SPFx webpart from GitHubRepo</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
