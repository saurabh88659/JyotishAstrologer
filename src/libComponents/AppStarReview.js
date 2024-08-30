import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../utils/constants';

const AppStarReview = ({
  rating = 0,
  IconSize = 20,
  ratingText = 16,
  ratingTextColor = '#000',
  style,
  spacing = 3,
  isNumber = false,
  color = 'gold',
}) => {
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <View style={{marginRight: spacing}} key={i}>
          <Ionicons name="star" size={IconSize} color={color} />
        </View>,
      );
    }

    // Half star
    if (halfStar) {
      stars.push(
        <View style={{marginRight: spacing}} key="half">
          <Ionicons name="star-half" size={IconSize} color={color} />
        </View>,
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <View style={{marginRight: spacing}} key={i + fullStars + 1}>
          <Ionicons
            name="star-outline"
            size={IconSize}
            color={AppColors.dark_gray}
            style={{opacity: 0.5}}
          />
        </View>,
      );
    }
    return stars;
  };

  return (
    <View style={[styles.container, {...style}]}>
      {renderStars()}
      {isNumber && (
        <Text
          style={{
            marginLeft: 10,
            fontSize: ratingText,
            color: ratingTextColor,
          }}>
          {rating?.toFixed(1) || '0.0'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
});

export default AppStarReview;
