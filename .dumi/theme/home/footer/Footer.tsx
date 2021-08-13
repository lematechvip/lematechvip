import React from 'react';
import { FormattedMessage, injectIntl } from 'umi';
import { Modal } from 'antd';
import RcFooter from 'rc-footer';
import 'rc-footer/assets/index.css';
import { presetPalettes } from '@ant-design/colors';
import './index.less';
import {

  MediumOutlined,
  TwitterOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { isLocalStorageNameSupported } from '../../utils';

class Footer extends React.Component<any & { location: any; isHome: boolean }> {
  lessLoaded = false;

  state = {
    color: presetPalettes.blue.primary,
  };

  componentDidMount() {
    // for some iOS
    // http://stackoverflow.com/a/14555361
    if (!isLocalStorageNameSupported()) {
      return;
    }
    // 大版本发布后全局弹窗提示
    //   1. 点击『知道了』之后不再提示
    //   2. 超过截止日期后不再提示
    if (
      localStorage.getItem('antd@3.0.0-notification-sent') !== 'true' &&
      Date.now() < new Date('2017/12/20').getTime()
    ) {
      this.infoNewVersion();
    }
  }

  getColumns() {
    const { intl } = this.props;
    const col1 = {
      title: <FormattedMessage id="app.footer.resources" />,
      items: [
        {
          title: 'Ant Design',
          url: 'https://ant.design',
          openExternal: true,
        }
      ],
    };

    const col2 = {
      title: <FormattedMessage id="app.footer.community" />,
      items: [
        {
          icon: <MediumOutlined />,
          title: 'TesterHome',
          url: 'https://testerhome.com/',
          openExternal: true,
        },
        {
          icon: <TwitterOutlined style={{ color: '#1DA1F2' }} />,
          title: 'DebugTalk',
          url: 'https://debugtalk.com/',
          openExternal: true,
        }
      ],
    };

    const col3 = {
      title: <FormattedMessage id="app.footer.help" />,
      items: [
        {
          icon: <GithubOutlined />,
          title: 'GitHub',
          url: 'https://github.com/lematechvip',
          openExternal: true,
        }
      ],
    };

    const col4 = {
      icon: (
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
          alt="Ant XTech"
        />
      ),
      title: <FormattedMessage id="app.footer.more-product" />,
      items: [
        {
          icon: (
            <img
              src="https://cdn.lematech.vip/lematech_logo.svg"

            />
          ),
          title: <FormattedMessage id="app.footer.lema" />,
          url: 'https://lematech.vip',
          description: <FormattedMessage id="app.footer.lema.slogan" />,
          openExternal: true,
        }
      ],
    };

    return [col1, col2, col3, col4];
  }

  infoNewVersion() {
    const {
      intl: { messages },
    } = this.props;
    Modal.info({
      title: messages['app.publish.title'],
      content: (
        <div>
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt="Ant Design"
          />
          <p>
            {messages['app.publish.greeting']}
            <a target="_blank" rel="noopener noreferrer" href="/changelog">
              antd@3.0.0
            </a>
            {messages['app.publish.intro']}
            {messages['app.publish.old-version-guide']}
            <a target="_blank" rel="noopener noreferrer" href="http://2x.ant.design">
              2x.ant.design
            </a>
            {messages['app.publish.old-version-tips']}
          </p>
        </div>
      ),
      okText: 'OK',
      onOk: () => localStorage.setItem('antd@3.0.0-notification-sent', 'true'),
      className: 'new-version-info-modal',
      width: 470,
    });
  }

  render() {
    const { isHome } = this.props;
    return (
      <div className={`footer ${isHome ? 'home-page-footer' : ''}`}>
        <RcFooter
          columns={this.getColumns()}
          bottom={
            <>
              Made with <span style={{ color: '#fff' }}>❤</span> by
              {/* eslint-disable-next-line react/jsx-curly-brace-presence */}{' '}
              <a target="_blank" rel="noopener noreferrer" href="https://lematech.vip">
                <FormattedMessage id="app.footer.company" />
              </a>
            </>
          }
        />
      </div>
    );
  }
}

export default injectIntl(Footer);
