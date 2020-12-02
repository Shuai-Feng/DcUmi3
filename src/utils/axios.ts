import axios from 'axios';
import { Modal, message } from 'antd';

export interface ajaxOption {
  url: string;
  isMock?: boolean;
  data?: {
    isShowLoading?: boolean;
    params?: any;
  };
}

export default class SFaxios {
  static ajax(options: ajaxOption) {
    let loading: any = document.getElementById('LoadingHover');
    let baseUrl: string;
    //isShowLoding 为false 不开启模态框
    if (options.data && options.data.isShowLoading == false) {
      loading.style.display = 'none';
    } else {
      loading.style.display = 'block';
    }
    //判断
    if (!options.isMock) {
      baseUrl =
        'https://www.fastmock.site/mock/cc1a61c8ea14b1c8ae0775b75ca1d29e/cheche';
    } else {
      baseUrl =
        'https://www.fastmock.site/mock/cc1a61c8ea14b1c8ae0775b75ca1d29e/cheche';
    }

    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseUrl,
        params: (options.data && options.data.params) || '',
      })
        .then(response => {
          let res = response.data;
          if (response.status == 200) {
            //对返回的数据的深层格式进行验证
            if (res.code == 0) {
              resolve(res);
            } else {
              Modal.info({
                title: '提示',
                content: res.message || '出现了问题 不过不是你的问题',
              });
            }
          } else {
            reject(response.data);
          }

          loading.style.display = 'none';
        })
        .catch(error => {
          message.error(error.message);
          loading.style.display = 'none';
        });
    });
  }
}
