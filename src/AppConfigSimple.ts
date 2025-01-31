// class AppConfigSimple {
//   static appName = 'my application';
//   static appVersion = '1.0.0';
//   static connectionUrl = 'http://localhost:3000';

//   static isDev() {
//     return process.env.NODE_ENV === 'development';
//   }
//   static isProd() {
//     return process.env.NODE_ENV === 'production';
//   }
// }

// console.log(AppConfigSimple.appName);
// console.log(AppConfigSimple.appVersion);
// console.log(AppConfigSimple.connectionUrl);
// console.log(AppConfigSimple.isDev());
// console.log(AppConfigSimple.isProd());

class AppConfig {
  private static instance: AppConfig;
  private constructor(public apiurl: string) {}

  // singleton pattern
  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      console.log('New instance created');
      AppConfig.instance = new AppConfig('http://localhost:3000');
    }
    console.log('Old instance returned');
    return AppConfig.instance;
  }
  // static utility
  static isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }
}

// usage
const config = AppConfig.getInstance();
if (AppConfig.isProduction()) {
  console.log('Hello');
}

const config2 = AppConfig.getInstance();
const config3 = AppConfig.getInstance();
const config4 = AppConfig.getInstance();
console.log(AppConfig.getInstance().apiurl);
