import { createStyles } from 'utils/createStyles'

export default createStyles(colors => ({
  button: {
    width: '100%',
    height: '50@vs',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12@s',
    backgroundColor: colors.orange,
  },
  transparent: {
    borderWidth: '1@s',
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
  },
  disabled: {
    backgroundColor: colors.lightGrey,
    shadowOpacity: 0,
    elevation: 0,
  },
  mv: {
    marginVertical: '6@vs',
  },
  secondary: {
    backgroundColor: colors.lightMain,
  },
  small: {
    paddingVertical: '12@vs',
    paddingHorizontal: '24@s',
    height: '42@vs',
    width: 'auto',
  },
  secondaryTitle: {
    color: colors.orange,
  },
  smallTitle: {
    fontSize: 14,
    margin: 0,
    lineHeight: 18,
  },
  flex: {
    flex: 1,
  },
  disabledSecond: {
    opacity: 0.3,
  },
}))
