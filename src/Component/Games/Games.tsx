import React, { useState } from 'react';
import styled from 'styled-components';
import nognitsy from '../../img/gamesIcon/nognitsy.png'

type Choice = "Камень" | "Ножницы" |  "Бумага"

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const GameBox = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ChoiceButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 0.5rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResultText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
`;
const ImgIcon = styled.img`
    width: 300px;
    margin: 10px;
`

const RockPaperScissors: React.FC = () => {
    const [userChoice, setUserChoice] = useState<Choice | null>(null);
    const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
    const [result, setResult] = useState('');

    const handleUserChoice = (choice: Choice) => {
        setUserChoice(choice);
        const computerChoice: Choice = choices[Math.floor(Math.random() * 3)];
        setComputerChoice(computerChoice);
        determineWinner(choice, computerChoice);
    };

    const determineWinner = (user: Choice, computer: Choice) => {
        if (user === computer) {
            setResult('Ничья!');
        } else if (
            (user === 'Камень' && computer === 'Ножницы') ||
            (user === 'Бумага' && computer === 'Камень') ||
            (user === 'Ножницы' && computer === 'Бумага')
        ) {
            setResult('Вы выиграли!');
        } else {
            setResult('Компьютер выиграл!');
        }
    };

    const choices: Choice[] = ['Камень', 'Бумага', 'Ножницы'];

    return (
        <GameContainer>
            <GameBox>
                <ImgIcon src={nognitsy}/>
                <div>
                    {choices.map((choice) => (
                        <ChoiceButton key={choice} onClick={() => handleUserChoice(choice)}>
                            {choice[0].toUpperCase() + choice.slice(1)}
                        </ChoiceButton>
                    ))}
                    {
                        userChoice && <button onClick={() => {
                            setUserChoice(null)
                        }}>
                            Restart
                        </button>
                    }

                </div>
                {userChoice && computerChoice && (
                    <ResultText>
                    Вы выбрали: {userChoice} | Компьютер выбрал: {computerChoice} <br />
                        {result}
                    </ResultText>
                )}
            </GameBox>
        </GameContainer>
    );
};

export default RockPaperScissors;
