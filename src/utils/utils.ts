export default {
    formateData(time:number):string{
       if(!time) return ''
       let date:Date = new Date(time);
       return date.getFullYear()+'-';
    }
}