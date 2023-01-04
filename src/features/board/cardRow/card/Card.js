import React from 'react';
// Add import statements below
import { useSelector, useDispatch } from 'react-redux';
import { selectVisibleIDs, flipCard, selectMatchedIDs } from '../../boardSlice.js';

//By default each Card component displays the Codecademy logo which means its contents are not visible. With the visible card IDs now known by each Card component, each card can show its contents if it is one of the visible cards or remain hidden otherwise. This logic is handled by the first if statement in the Card component definition.
let cardLogo = "https://static-assets.codecademy.com/Courses/Learn-Redux/matching-game/codecademy_logo.png";


//When you match a pair of cards, the cards keep showing their text and stop dispatching actions (first if statement) and the text will turn green (second if statement).
export const Card = ({ id, contents }) => {
  // Add selected data and dispatch variables below
  const visibleIDs = useSelector(selectVisibleIDs);
  const dispatch = useDispatch();
  const matchedIDs = useSelector(selectMatchedIDs);//Using the matchedIDs data, you can now reveal the matched cards by changing their cardStyle to 'matched'.

  // flip card action
  const flipHandler = (id) => {
    // Add action dispatch below
    dispatch(flipCard(id));
  };

  let cardStyle = 'resting';
  let click = () => flipHandler(id);
  
  let cardText = (
    <img src={cardLogo} className="logo-placeholder" alt="Card option" />
  );

  // 1st if statement
  // implement card id array membership check. Both visible and matched cards should show their text. 
  if (visibleIDs.includes(id) || matchedIDs.includes(id)) {
    cardText = contents;
    click = () => {};
  }

  // 2nd if statement
  // implement card id array membership check
  if (matchedIDs.includes(id)) {
    cardStyle = 'matched';
  } else {
    cardStyle = 'no-match';
  }

  // 3rd if statement
  // implement number of flipped cards check >>  limit the number of visible cards at a time to 2. This stops the action from dispatching when cards are clicked so there can never be more than 2 cards visible at a time.
  if (visibleIDs.length===2) {
    click = () => {};
  }

  return (
    <button onClick={click} className={`card ${cardStyle}`}>
      {cardText}
    </button>
  );
};
