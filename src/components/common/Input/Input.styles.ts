import R from 'res'
import { createStyles } from 'utils/createStyles'

export default createStyles(colors => ({
  content: {
    marginVertical: '8@mvs1',
  },
  label: {
    color: colors.black,
    marginBottom: '10@mvs1',
  },
  leftIcon: {
    position: 'absolute',
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '30@s',
    height: '100%',
  },
  rightIcon: {
    right: 0,
    position: 'absolute',
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '30@s',
    height: '100%',
  },
  input: {
    fontFamily: R.fonts.TTNormsPro.regular,
    fontSize: '16@ms1.5',
    width: '100%',
    height: '50@mvs1',
    paddingHorizontal: '20@ms1',
    borderRadius: '12@s',
    backgroundColor: colors.white,
    color: colors.black,
    borderWidth: '1@s',
    borderColor: colors.lightGrey,
  },
  inputLeftIcon: {
    paddingLeft: '40@s',
  },
  inputRightIcon: {
    paddingRight: '40@s',
  },
  activeIcon: {
    zIndex: 100,
  },
  activeInput: {
    borderWidth: '1@s',
    borderColor: colors.black,
    shadowColor: colors.black,
    shadowOffset: { width: '2@s', height: '2@vs' },
    shadowRadius: '2@s',
    shadowOpacity: 0.88,
    elevation: 4,
  },
  error: {
    borderColor: colors.lightMain,
  },
  errorInputSecondary: {
    borderColor: colors.errorInputBorder,
    backgroundColor: colors.errorInputBackground,
  },
  errorText: {
    ...R.fontSize.textRegular12,
    marginTop: '12@mvs1',
    color: colors.orange,
  },
  errorTextSecondary: {
    ...R.fontSize.textRegular12,
    color: colors.errorText,
    marginTop: '1@s',
  },
  mt: {
    marginTop: '12@mvs1',
  },
  disabled: {
    opacity: 0.5,
  },
}))
