import Jsonp from 'jsonp';
// import axios from 'axios';
export default class Axios {
  static jsonp(options: any) {
    return new Promise((resolve, reject) => {
      Jsonp(
        options.url,
        {
          param: 'callback',
        },
        function(err: any, response: any) {
          if (response.status == 'success') {
            resolve(response);
          } else {
            reject(err.messsage);
          }
        },
      );
    });
  }
}
