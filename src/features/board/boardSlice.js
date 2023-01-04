const initialState = [
  {id: 0, contents: 'Provider', visible: true, matched: true}, 
  {id: 1, contents: 'Provider', visible: true, matched: true}, 
  {id: 2, contents: 'selector', visible: true, matched: true}, 
  {id: 3, contents: 'selector', visible: true, matched: true}, 
  {id: 4, contents: 'useSelector()', visible: true, matched: true}, 
  {id: 5, contents: 'useSelector()', visible: true, matched: true}, 
  {id: 6, contents: 'useDispatch()', visible: true, matched: true}, 
  {id: 7, contents: 'useDispatch()', visible: true, matched: true}, 
  {id: 8, contents: 'Pure Function', visible: true, matched: true}, 
  {id: 9, contents: 'Pure Function', visible: true, matched: true}, 
  {id: 10, contents: 'react-redux', visible: true, matched: true}, 
  {id: 11, contents: 'react-redux', visible: true, matched: true}, 
];

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'board/setBoard':
      let setState = [];
      action.payload.forEach((element, index) => 
        setState.push({id: index, 
                      contents: element, 
                      visible: false, 
                      matched: false})
      );
      return setState;
    case 'board/flipCard':
      let flipState = [...state];
      const cardID = action.payload;
      flipState[cardID] = {...state[cardID], visible:true}
      
      const [index1, index2] = flipState
        .filter(card => card.visible)
        .map(card => card.id);
      if (index2 !== undefined){
        const card1 = flipState[index1];
        const card2 = flipState[index2];
        if (card1.contents === card2.contents) {
          flipState[index1] = {...card1, visible: false, matched: true}
          flipState[index2] = {...card2, visible: false, matched: true}
        }
      } 

      return flipState;
    case 'board/resetCards':
      return state.map(card => ({...card, visible: false}));
    default:
      return state;
  }
}

const wordPairs = [
  'Provider', 'Provider', 
  'selector', 'selector', 
  'useSelector()', 'useSelector()', 
  'useDispatch()', 'useDispatch()',
  'Pure Function', 'Pure Function',
  'react-redux', 'react-redux',
]

const randomWords = () => {
  let words = []
  let newWordPairs = [...wordPairs]
  const reps = newWordPairs.length
  for (let i=0; i<reps; i++) {
    const wordIndex = Math.floor(Math.random()*newWordPairs.length);
    words.push(newWordPairs[wordIndex])
    newWordPairs.splice(wordIndex, 1)
  }

  return words;
} 

// action creators
//setBoard() and a corresponding case in boardReducerthat randomizes the card order in the state array and sets the visible and matched properties of every card to false. This action should be dispatched when the ‘Start Game’ button is clicked.
export const setBoard = () => {
  const words = randomWords()
  return {
    type: 'board/setBoard',
    payload: words
  }
}

export const flipCard = (id) => {
  return {
    type: 'board/flipCard',
    payload: id
  }
}

export const resetCards = (indices) => {
  return {
    type: 'board/resetCards'
  }
}

// Add selector export statments below.
//In order to create the grid of cards, the Board component will retrieve the id and contents properties from the state card objects. This will require a selector... Note that when returning an object from a single-line arrow function you must wrap the object in parentheses. The board is defined in Board.js.
export const selectBoard = state => state.board.map(
  card => ({id: card.id, contents: card.contents})
)

//Each Card component renders a single card object using the id and content values. The Card also uses the visible and matched boolean values from the state to determine how to render. You will begin by selecting the visible card objects from the state data.
export const selectVisibleIDs = state => state.board.filter(card => card.visible).map(card => card.id);

//The last step of the game behavior is to identify matched cards on the board using the matched property of each card object in the store. This will require a final selector.
export const selectMatchedIDs = state => state.board.filter(card => card.matched).map(card=> card.id);