import Jsonp from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
interface ajaxOption {}
export default class Axios {
  //this api is used to get the weather data
  static jsonp(options: any) {
    return new Promise((resolve, reject) => {
      Jsonp(
        options.url,
        {
          param: 'callback',
        },
        function(err: any, response: any) {
          if (response) {
            if (response.status && response.status === 'success') {
              resolve(response);
            } else {
              reject(err.messsage);
            }
          } else {
            reject(err.messsage);
          }
        },
      );
    });
  }
  //and this api for getting the ajaxdata
  static ajax(options: any) {
    let loading: any;
    if (options.data && options.data.isLoading !== false) {
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }
    let baseApi =
      'https://www.fastmock.site/mock/cc1a61c8ea14b1c8ae0775b75ca1d29e/cheche';
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || '',
      })
        .then((response: any) => {
          if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'none';
          }
          if (response.status === 200) {
            let res: any = response.data;
            if (['0', 0].includes(res.code)) {
              resolve(res);
            } else {
              Modal.info({
                title: '提示',
                content: res.msg,
              });
            }
          } else {
            reject(response.data);
          }
        })
        .catch(error => {
          throw error;
        });
    });
  }
}
