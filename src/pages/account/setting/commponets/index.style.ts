import {createStyles} from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    baseView: {
      display: 'flex',
      paddingTop: '12px',
      '.ant-legacy-form-item .ant-legacy-form-item-control-wrapper': {
        width: '100%',
      },
      [`@media screen and (max-width: ${token.screenXL}px)`]: {
        flexDirection: 'column-reverse',
      },
    },
    button_view: {
      width: '144px',
      textAlign: 'center',
    },
    area_code: {
      width: '72px',
    },
    phone_number: {
      width: '214px',
    },
  };
});

export default useStyles;
