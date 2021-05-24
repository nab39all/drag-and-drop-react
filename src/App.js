import React, {useState} from "react";
import "./App.css";

function App() {
    const [cardList, setCardList] = useState([
        {id: 1, order: 3, text: `Card 3`},
        {id: 2, order: 1, text: `Card 1`},
        {id: 3, order: 2, text: `Card 2`},
        {id: 4, order: 4, text: `Card 4`}
    ]);

    const [currentCard, setCurrentCard] = useState(null);

    const sortCards = (a, b) => {
      if (a.order > b.order) {
          return 1;
      } else return -1
    };

    function dragStartHandler(e, card) {
        console.log("-> drag", card);
        setCurrentCard(card);
    }

    function dropHandler(e, card) {
        e.preventDefault();
        console.log("-> drop", card);
        e.target.style.background = `white`;
        setCardList(cardList.sort(sortCards).map(it => {
            if (it.id === card.id) {
                return {...it, order: currentCard.order}
            }
            if (it.id === currentCard.id) {
                return {...it, order: card.order}
            }
            return it;
        }))
    }

    function dragLeaveHandler(e) {
        e.target.style.background = `white`;
    }

    function dragEndHandler(e) {
        e.target.style.background = `white`;
    }

    function dragOverHandler(e) {
        e.preventDefault();
        e.target.style.background = `#cfcfcf`;
    }

    return (
        <div className="app">
            {cardList.map(card => <div  key={card.id} className={`card`}
                                       onDragStart={(e) => {
                                           dragStartHandler(e, card)
                                       }}
                                       onDragLeave={(e) => {
                                           dragLeaveHandler(e)
                                       }}
                                       onDragEnd={(e) => {
                                           dragEndHandler(e)
                                       }}
                                       onDragOver={(e) => {
                                           dragOverHandler(e)
                                       }}
                                       onDrop={(e) => {
                                           dropHandler(e, card)
                                       }}

                                       draggable={true}>
                {card.text}
            </div>)}
        </div>
    );
}

export default App;
