import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import ExclamationIcon from 'assets/icons/ExclamationIcon'
import Columns from 'components/common/Columns'
import CustomTouchable from 'components/common/CustomTouchable'
import { Space } from 'components/common/Space'
import { useField, useFormikContext } from 'formik'
import { useColors } from 'hooks/useColors'
import { useStyles } from 'hooks/useStyles'
import React, { ReactElement, useCallback, useRef, useState } from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'

import Typo from '../typo'
import stylesConfig from './Input.styles'

export interface IInputProps extends TextInputProps {
  name: string
  label?: string
  validate?: (value: string) => string | undefined
  inputStyle?: Object
  leftIcon?: ReactElement
  rightIcon?: ReactElement
  rightIconPress?: () => void
  secondaryErrorStyle?: boolean
  hideError?: boolean
  turnOffFocusStyle?: boolean
  bottomSheetInput?: boolean
  immediatelyShowError?: boolean
  optional?: boolean
  disabled?: boolean
  info?: string
}

const Input = ({
  label,
  name,
  validate,
  leftIcon,
  rightIcon,
  rightIconPress,
  autoCapitalize = 'none',
  autoCorrect = false,
  secondaryErrorStyle = false,
  placeholderTextColor,
  style,
  inputStyle,
  hideError,
  turnOffFocusStyle = false,
  bottomSheetInput = false,
  immediatelyShowError = false,
  optional = false,
  disabled = false,
  editable,
  info,
  ...attributes
}: IInputProps) => {
  const styles = useStyles(stylesConfig)
  const [field, meta, helpers] = useField({ name, validate })
  const colors = useColors()
  const [leftFocus, setLeftFocus] = useState(false)
  const ref = useRef<TextInput>(null)
  const { submitCount } = useFormikContext()

  const onFocus = useCallback(() => {
    setLeftFocus(false)
    helpers.setTouched(true)
  }, [])

  const onBlur = useCallback(() => {
    setLeftFocus(true)
  }, [])

  const onChangeText = useCallback(async (value: string) => {
    const formattedValue =
      attributes.keyboardType === 'numeric' ? value.replace(',', '.') : value

    helpers.setValue(formattedValue)
  }, [])

  const showError =
    ((submitCount || leftFocus) && meta.error && !hideError) ||
    (immediatelyShowError && meta.error)

  const InputComponent = bottomSheetInput ? BottomSheetTextInput : TextInput

  return (
    <View style={[styles.content, style, disabled && styles.disabled]}>
      {label ? (
        <Typo.Body type="regular14" style={styles.label}>
          {label}
          {optional && (
            <Typo.Body type="regular14" color="grey">
              {' '}
              (Optional)
            </Typo.Body>
          )}
        </Typo.Body>
      ) : null}

      <View>
        {leftIcon ? (
          <View
            style={[
              styles.leftIcon,
              ref?.current?.isFocused() ? styles.activeIcon : {},
            ]}>
            {leftIcon}
          </View>
        ) : null}

        <InputComponent
          style={[
            styles.input,
            !turnOffFocusStyle && ref?.current?.isFocused()
              ? styles.activeInput
              : {},
            leftIcon && styles.inputLeftIcon,
            rightIcon && styles.inputRightIcon,
            secondaryErrorStyle && showError ? styles.errorInputSecondary : {},
            inputStyle,
          ]}
          // @ts-ignore
          ref={ref}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          value={String(field.value)}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : colors.grey
          }
          editable={!disabled && editable}
          {...attributes}
        />

        {rightIcon ? (
          <CustomTouchable
            onPress={rightIconPress}
            style={[
              styles.rightIcon,
              ref?.current?.isFocused() && styles.activeIcon,
            ]}>
            {rightIcon}
          </CustomTouchable>
        ) : null}
      </View>

      {info && (
        <View>
          <Space height={12} />
          <Typo.Body flex type="regular12" color="grey">
            {info}
          </Typo.Body>
        </View>
      )}

      {showError ? (
        secondaryErrorStyle ? (
          <Columns style={styles.mt} align="center">
            <ExclamationIcon />
            <Space width={8} />
            <Text style={styles.errorTextSecondary}>{meta.error}</Text>
          </Columns>
        ) : (
          <Text style={styles.errorText}>{meta.error}</Text>
        )
      ) : null}
    </View>
  )
}

export default Input
