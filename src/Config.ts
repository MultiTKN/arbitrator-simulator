import ArgumentUtils from './utils/ArgumentUtils';

export default class Config {

  public static getStatic(): string {
    return '';
  }

  public static getBackendEndPoint(): string {
    return ArgumentUtils.getValue('BACKEND_END_POINT', 'https://backtest-backend-staging.herokuapp.com');
  }

  public static getStableCoinsApi(): string {
    return 'https://api.icex.ch';
  }

  public static getIntercomAppId(): string {
    return ArgumentUtils.getValue('INTERCOM_APP_ID', 'q14mislj');
  }

  public static getGoogleAnalyticsTrackId() {
    return ArgumentUtils.getValue('GOOGLE_ANALYTICS_TRACK_ID', 'UA-120564356-3');
  }

  public static isDebug() {
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  }

  public static getSenrtyConfigUrl(): string {
    return ArgumentUtils.getValue('REACT_APP_SENTRY_DSN', 'https://b249c9bfeaa74ac7890da6843b4e259b@sentry.io/1259174');
  }

}
