export default {
  deBounce: (callback: Function, delay?: number) => {
    let timer: any = null;
    return () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(callback, delay || 1000);
    };
  },
  torrent: (callback: Function, delay?: number) => {
    var prev: number = +new Date();
    var delay: number | undefined = delay || 1000;
    return () => {
      var now: number = +new Date();
      if (now - prev > delay) {
        callback();
        prev = +new Date();
      }
    };
  },
};
