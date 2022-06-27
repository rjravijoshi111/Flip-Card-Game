import React, {FunctionComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FlipCard from '../FlipCard';
import styles from './styles';

const CardComponent = React.memo(props => {
  return (
    <View style={styles.container}>
      <FlipCard
        clickable={!props?.item?.fliped}
        flip={props?.item?.fliped}
        flipHorizontal={true}
        flipVertical={false}
        friction={10}
        perspective={2000}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.card, styles.card1]}
          onPress={() => {
            props.handleChange(props?.item?.id);
          }}>
          <Text style={[styles.label, styles.label1]}>?</Text>
        </TouchableOpacity>
        <View style={[styles.card, styles.card2]}>
          <Text style={[styles.label, styles.label2]}>
            {props?.item?.content}
          </Text>
        </View>
      </FlipCard>
    </View>
  );
});

export default CardComponent;
