import React from 'react';
import {TextInputProps} from 'react-native';

import * as S from './styles';

interface InputFullNameProps extends TextInputProps {}

const InputFullName = ({...rest}: InputFullNameProps) => {
  return (
    <S.Container>
      <S.MagnifierIcon />
      <S.Input {...rest} />
    </S.Container>
  );
};

export default InputFullName;
