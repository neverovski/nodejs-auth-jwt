export const UserAgentUtilMock = [
  {
    dataIn:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
    dataOut: {
      browser: 'Chrome',
      os: 'Mac OS',
    },
  },
  {
    dataIn:
      'Mozilla/5.0 (Windows; U; Windows NT 5.1; de-CH) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2',
    dataOut: {
      browser: 'Arora',
      os: 'Windows',
    },
  },
  {
    dataIn:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3',
    dataOut: {
      browser: 'Mobile Safari',
      os: 'iOS',
    },
  },
  {
    dataIn:
      'Mozilla/5.0 (Linux; U; Android 2.3.4; en-US; MT11i Build/4.0.2.A.0.62) AppleWebKit/534.31 (KHTML, like Gecko) UCBrowser/9.0.1.275 U3/0.8.0 Mobile Safari/534.31',
    dataOut: {
      browser: 'UCBrowser',
      os: 'Android',
    },
  },
];
