import qs from 'qs';
import message from './message';
import { storage } from './index';

function processData(data) {
  if (data && data.errors) {
    Object.keys(data.errors).forEach((key) => {
      data.errors[key].map(msg => message.error(`${key} ${msg}`));
    });
  }
  return data;
}

const { $ } = window;

function getAjaxPromise(options) {
  return new Promise((resolve) => {
    $.ajax(options).done(resolve).fail((e) => {
      if (e.responseJSON && e.responseJSON.error) {
        message.error(e.responseJSON.error);
      }
      if (e.responseJSON && e.responseJSON.errors) {
        const errors = e.responseJSON.errors;
        Object.keys(errors).forEach((key) => {
          errors[key].forEach((msg) => {
            message.error(msg);
          });
        });
      }
      resolve(undefined);
    });
  }).then(processData);
}

const privateFetch = {
  judge() {
    const token = this.getToken();
    if (!token || token.length < 20) return false;
    const exp = storage('token_expires');
    if (!exp || new Date() > new Date(exp)) return false;
    return true;
  },
  get(url, data, options = {}) {
    let queryUrl = url;
    if (data) {
      const params = qs.stringify({ ...data, locale: window.locale });
      queryUrl += '?' + params;
    }
    return getAjaxPromise({
      ...options,
      url: queryUrl,
      dataType: 'json',
    });
  },
  post(url, data = {}, options = {}) {
    const body = {
      // utf8: '✓',
      locale: window.locale,
      ...data,
    };
    return getAjaxPromise({
      ...options,
      url,
      dataType: 'json',
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify(body),
    });
  },
  delete(url, data = {}, options = {}) {
    const body = {
      // utf8: '✓',
      locale: window.locale,
      ...data,
    };
    return getAjaxPromise({
      ...options,
      url,
      dataType: 'json',
      contentType: 'application/json',
      method: 'DELETE',
      data: JSON.stringify(body),
    });
  },
  ajax(jQueryAjaxOptions) {
    return getAjaxPromise({
      ...jQueryAjaxOptions,
    });
  },
};

const fetch = {
  private: privateFetch,
  get(url, data, options = {}) {
    let queryUrl = url;
    if (data) {
      const params = qs.stringify({ ...data, locale: window.locale });
      queryUrl += '?' + params;
    }
    return getAjaxPromise({
      ...options,
      url: queryUrl,
      dataType: 'json',
    });
  },
  post(url, data = {}, options = {}) {
    const body = {
      // utf8: '✓',
      locale: window.locale,
      ...data,
    };
    return getAjaxPromise({
      ...options,
      url,
      dataType: 'json',
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify(body),
    });
  },
  jsonp(url, data) {
    let queryUrl = url;
    if (data) {
      const params = qs.stringify({ ...data, locale: window.locale });
      queryUrl += '?' + params;
    }
    return new Promise((resolve) => {
      $.ajax({
        url: queryUrl,
        dataType: 'jsonp',
        jsonp: 'callback',
        success: resolve,
      });
    });
  },
};

export default fetch;
