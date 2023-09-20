import React, { useMemo } from 'react';
import { useTheme } from 'styled-components';

import * as S from './styles';

interface IRatingProps {
  rating: string;
  reviews: number;
}

const Rating = ({ rating, reviews }: IRatingProps) => {
  const theme = useTheme();

  const ratingFormatted = useMemo(
    () =>
      Array(5)
        .fill(false)
        .fill(true, 0, +rating),
    [rating],
  );

  return (
    <S.ReviewsContainer>
      <S.RatingContainer>
        {ratingFormatted.map((ratingValue, ratingIndex) => (
          <S.RatingIcon
            key={ratingIndex}
            color={ratingValue ? theme.colors.orange : theme.colors.light}
          />
        ))}
        <S.RatingText>{rating}</S.RatingText>
      </S.RatingContainer>
      <S.Review>{reviews} reviews</S.Review>
    </S.ReviewsContainer>
  );
};

export default Rating;
