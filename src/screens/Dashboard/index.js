import React, {useState, useEffect} from 'react';
import {View, FlatList, Button, Text, SafeAreaView, Alert} from 'react-native';
import CardComponent from '../../component/CardComponent';
import styles from './styles';

const getShuffledArr = arr => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const generatedId = () => Math.random().toString(36).substr(2, 9);

const generateList = () => {
  const listFlipData = [];
  while (listFlipData.length < 6) {
    let r = {content: Math.floor(Math.random() * 100) + 1};
    if (listFlipData.indexOf(r) === -1) {
      listFlipData.push(r);
    }
  }
  const flipcards = getShuffledArr(listFlipData.concat(listFlipData));
  return flipcards.map(e => {
    const freezeObj = Object.assign({}, e);
    freezeObj.id = generatedId();
    freezeObj.fliped = false;
    return freezeObj;
  });
};

const FlipGameContainers = () => {
  const [state, setState] = useState({
    cards: generateList(),
    gameTurn: 1,
    isWinned: false,
  });
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    if (!state.isWinned && !state.cards.find(card => !card.win)) {
      setState({...state, isWinned: true});
      Alert.alert('Congratulations', `You win this game by ${steps} steps!`, [
        {
          title: 'Try another round',
          onPress: restart,
        },
      ]);
    }
  }, [state, steps]);

  const viewFlipCard = id => {
    const cardsUpdate = state.cards.map(card => {
      const copyCard = {...card};
      if (copyCard.id === id) {
        copyCard.fliped = true;
      }
      return copyCard;
    });

    setState({
      ...state,
      gameTurn: state.gameTurn === 1 ? 2 : 1,
      cards: cardsUpdate,
    });
    return cardsUpdate;
  };

  const findCardsWin = (cardsUpdate, id) => {
    let indexWin;
    return {
      cardsToUpdate: cardsUpdate.map(card => {
        const copyCard = {...card};
        if (copyCard.id === id) {
          const res = cardsUpdate.find(
            cardFind =>
              cardFind.content === card.content && cardFind.id !== card.id,
          );

          if (res.fliped) {
            copyCard.win = true;
            copyCard.fliped = true;
            indexWin = res.id;
          }
        }
        return copyCard;
      }),
      indexWin,
    };
  };

  const toogleFlipCard = (id, cardsUpdate) => {
    const {cardsToUpdate, indexWin} = findCardsWin(cardsUpdate, id);

    if (indexWin) {
      const cardWin = cardsToUpdate.find(res => res.id === indexWin);
      cardWin.win = true;
      cardWin.fliped = true;
    }

    //reset toggle all cards
    if (state.gameTurn === 2 && !indexWin) {
      cardsToUpdate.map(card => {
        if (!card.win) {
          card.fliped = false;
        }
        return card;
      });
    }

    if (state.gameTurn === 2) {
      setTimeout(() => {
        setState({
          ...state,
          cards: cardsToUpdate,
          gameTurn: state.gameTurn === 1 ? 2 : 1,
        });
      }, 650);
    }
  };

  const handleChange = id => {
    setSteps(steps => ++steps);
    const cardUpdate = viewFlipCard(id);
    toogleFlipCard(id, cardUpdate);
  };

  const restart = () => {
    setSteps(0);
    setState({
      cards: generateList(),
      gameTurn: 1,
      isWinned: false,
    });
  };

  const renderItem = ({item}) => {
    return <CardComponent item={item} handleChange={handleChange} />;
  };

  const generateCards = () => {
    return (
      <FlatList
        scrollEnabled={false}
        numColumns={3}
        data={state.cards}
        renderItem={renderItem}
      />
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerView}>
        <Button title="Restart" onPress={restart} />
        <View>
          <Text style={styles.stepsLabel}>
            {'STEPS: '}
            <Text style={styles.countLabel}>{steps}</Text>
          </Text>
        </View>
      </View>
      {generateCards()}
    </SafeAreaView>
  );
};

export default FlipGameContainers;
