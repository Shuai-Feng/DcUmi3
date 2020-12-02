import { EventEmitter } from 'events';

export default class SFevent {
  private static ee = new EventEmitter();
  static ee_on(eventName: string, func: any) {
    this.ee.on(eventName, func);
  }
  static ee_emit(eventName: string, args?: any) {
    this.ee.emit(eventName, args);
  }
}
