export default {
  formateData(time: number): string {
    if (!time) return '';
    let date: Date = new Date(time);
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDay() +
      ' ' +
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
      ':' +
      (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    );
  },
};
