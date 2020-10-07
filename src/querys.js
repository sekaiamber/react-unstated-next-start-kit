import config from './config';

function getTimestamp() {
  const ts = new Date().getTime();
  // PRD环境每6分钟更新一次CDN
  return parseInt(ts / (config.PROXY_DOMAIN ? 60000 : 360000), 10);
}

const QUERYS = {
  URL: '/api/v1/upload_attachment.json',
  URL_WITH_DATA: id => `/api/v1/deposits/${id}.json`,
};

const { DOMAIN: domain } = config;

Object.keys(QUERYS).forEach((key) => {
  if (typeof QUERYS[key] === 'string') {
    QUERYS[key] = domain + QUERYS[key];
  } else if (typeof QUERYS[key] === 'function') {
    const tmp = QUERYS[key];
    QUERYS[key] = (...args) => domain + tmp(...args);
  }
});

export default QUERYS;
