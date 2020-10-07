import { matchPath } from 'react-router-dom';
import moment from 'moment';
import isMobile from './isMobile';

const STORAGE_PREFIX = 'SEKAI_';

function storage(key, value) {
  if (value) {
    return window.localStorage.setItem(STORAGE_PREFIX + key, value);
  }
  return window.localStorage.getItem(STORAGE_PREFIX + key);
}

function clearStorage(key) {
  window.localStorage.removeItem(STORAGE_PREFIX + key);
}

function fastMatchPath(pathname, path) {
  return matchPath(pathname, { path, exact: true });
}

function formatDate(date) {
  if (!date) return '';
  return moment(date).format('YYYY-MM-DD');
}

function formatDatetime(date) {
  if (!date) return '';
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

function formatTime(date) {
  if (!date) return '';
  return moment(date).format('HH:mm:ss');
}

function formatTimespan(timespan) {
  const m = parseInt(timespan / 60, 10);
  const s = timespan % 60;
  return `${m}:${s > 9 ? s : ('0' + s)}`;
}

function formatNumber(num, fixed = 2) {
  return parseFloat(num).toFixed(fixed);
}

function randomInt(min, max) {
  const span = max - min;
  const r = Math.floor(Math.random() * span);
  return r + min;
}

let uid = 0;

function getUid() {
  uid += 1;
  return uid;
}

export {
  isMobile,
  storage,
  clearStorage,
  fastMatchPath,
  formatDatetime,
  formatTime,
  formatDate,
  formatNumber,
  randomInt,
  formatTimespan,
  getUid,
};
