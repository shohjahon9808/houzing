import CustomTouchable from 'components/common/CustomTouchable'
import { useColors } from 'hooks/useColors'
import { useStyles } from 'hooks/useStyles'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { TThemeColors } from 'res/theme'

import Typo from '../typo'
import stylesConfig from './Button.styles'

export interface IButtonProps {
  onPress: (() => void) | undefined
  text: string
  transparent?: boolean
  stroke?: keyof TThemeColors
  style?: object
  textStyle?: object
  loading?: boolean
  disabled?: boolean
  disabledSecondStyle?: boolean
  mv?: boolean
  shadow?: boolean
  secondary?: boolean
  small?: boolean
  loadingColor?: keyof TThemeColors
  flex?: boolean
}

const Button = ({
  onPress,
  text,
  transparent = false,
  style,
  textStyle,
  loading = false,
  disabled = false,
  mv = false,
  secondary = false,
  small = false,
  loadingColor,
  flex = false,
  disabledSecondStyle = false,
}: IButtonProps) => {
  const styles = useStyles(stylesConfig)
  const colors = useColors()

  return (
    <CustomTouchable
      disabled={disabled || loading}
      style={[
        styles.button,
        mv ? styles.mv : {},
        transparent ? styles.transparent : {},
        disabled
          ? disabledSecondStyle
            ? styles.disabledSecond
            : styles.disabled
          : {},
        secondary && styles.secondary,
        small && styles.small,
        flex && styles.flex,
        style,
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator
          color={
            transparent
              ? colors.orange
              : loadingColor
              ? colors[loadingColor]
              : colors.white
          }
        />
      ) : (
        <Typo.TextButton
          style={[
            textStyle,
            secondary && styles.secondaryTitle,
            small && styles.smallTitle,
          ]}
          color={transparent ? 'orange' : 'white'}
          type="bold">
          {text}
        </Typo.TextButton>
      )}
    </CustomTouchable>
  )
}

export default Button
