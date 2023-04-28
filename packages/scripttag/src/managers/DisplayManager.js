import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;
    this.insertContainer();
    // Your display logic here
    await this.delay(this.settings.firstDelay * 1000);
    const notificationsSlice = notifications.slice(0, settings.maxPopsDisplay);
    for (const notification of notificationsSlice) {
      await this.display({notification: notification, setting: settings});
      await this.delay(this.settings.displayDuration * 1000);
      this.fadeOut();
      await this.delay(this.settings.popsInterval * 1000);
    }
  }
  delay = ms => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  };
  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
  }
  display({notification, setting}) {
    const container = document.querySelector('#Avada-SalePop');
    render(<NotificationPopup {...notification} {...setting} />, container);
  }
  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }
    return popupEl;
  }
}
