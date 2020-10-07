/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import I18n from '../../models/i18n';
import { connect } from '../../models';

import './style.scss';

function MyHeader({ i18n, setLocale }) {
  return (
    <header>
      <a href="/#/">{i18n.header_item_1}</a>
      <a href="/#/todo">{i18n.header_item_2}</a>

      <a onClick={() => setLocale('en')}>English</a>
      <a onClick={() => setLocale('zh-cn')}>中文</a>
    </header>
  );
}

function mapStateToProps([i18n]) {
  const { setLocale } = i18n;
  return {
    i18n: i18n.i18n,
    setLocale,
  };
}

export default connect([I18n])(mapStateToProps)(MyHeader);
