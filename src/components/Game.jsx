import Card from './Card';
import '../styles/Game.css';
import { useEffect, useState, useRef } from 'react';
import LossScreen from './Loss';

export default function Game({ legalPokemon, numberOfPokemon }) {
	const [arrayOfPokemon, setArrayOfPokemon] = useState(new Array(numberOfPokemon).fill(undefined));
	const [currentScore, setCurrentScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const [cardOrder, setCardOrder] = useState(() => {
		const array = [];
		for (let i = 0; i < arrayOfPokemon.length; i++) {
			array.push(i);
		}
		return array;
	});
	const [losingPokemon, setLosingPokemon] = useState(null);
	const gridRows = numberOfPokemon === 16 ? 2 : 4;
	const gridColumns = numberOfPokemon !== 64 ? 8 : 16;
	// I dont quite know if this is required.  This is code from Claude to escape the shuffle() useRef from requesting cardOrder as a dependency.
	// Since cardOrder is an array (which is an object), it being put in the dependency array causes infinite loops.
	// I will need to study useRef more after this,
	// but for the moment I am getting frustrated with a (from my current and very likely incorrect perspective) unrequired warning so I will use Claude's code.
	const cardOrderRef = useRef(cardOrder);
	useEffect(() => {
		cardOrderRef.current = cardOrder;
	}, [cardOrder]);

	useEffect(() => {
		let ignore = false;
		const effectPokemon = [];
		async function getAllPokemon() {
			async function getPokemon(dexNum) {
				const url = `https://pokeapi.co/api/v2/pokemon/${dexNum}`;
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(response);
				}
				const responseJSON = await response.json();
				console.log(responseJSON);
				const image = responseJSON.sprites.other['official-artwork'].front_default;
				const name = responseJSON.name.charAt(0).toUpperCase() + responseJSON.name.slice(1);
				const type = responseJSON.types[0].type.name;
				effectPokemon.push({ url: image, name: name, type: type });
			}
			const promises = [];
			const currentPokemon = [];
			for (let i = 0; i < numberOfPokemon; i++) {
				function getLegalRandom() {
					const randomNumber = Math.floor(Math.random() * legalPokemon.length);
					if (!currentPokemon.includes(randomNumber)) {
						currentPokemon.push(randomNumber);
						return randomNumber;
					}
					return getLegalRandom();
				}

				promises.push(getPokemon(legalPokemon[getLegalRandom()]));
			}
			await Promise.all(promises);
		}
		async function waitForPokemon() {
			await getAllPokemon();
			setArrayOfPokemon(effectPokemon);
		}
		if (!ignore) waitForPokemon();
		return () => {
			ignore = true;
		};
		// legalPokemon is requested in the dependency array.  However, I currently do not actually need this to be in the array and adding it will cause an infinite loop.
		//  I believe the best way to fix this warning is to use useMemo.  However I see that useMemo is a bit later in the odin project learning.
		// While it would likely be best for me to read ahead to figure it out, I am feeling lazy.
		// So for the moment I am going to leave this warning alone unless it starts breaking things.
	}, [numberOfPokemon]);
	useEffect(() => {
		function shuffle() {
			const array = [...cardOrderRef.current];
			let currentIndex = array.length;
			while (currentIndex != 0) {
				let randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;
				[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
			}
			setCardOrder(array);
		}
		shuffle();
	}, [currentScore]);
	// A popup on loss needs to be triggered sending you back to the main menu.
	// If you reach the max number, a victory popup should be triggered instead
	return (
		<>
			<div className="game-screen">
				<div className="counter">
					<h1 className="count">Current score: {currentScore}</h1>
					<h2 className="best">Best score: {bestScore}</h2>
				</div>
				<div
					className="card-grid"
					style={{ gridTemplateRows: `repeat(${gridRows}, 1fr)`, gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
				>
					{arrayOfPokemon.map((pokemon, index) => {
						return (
							<Card
								pokemon={pokemon}
								currentScore={currentScore}
								setCurrentScore={setCurrentScore}
								bestScore={bestScore}
								setBestScore={setBestScore}
								order={cardOrder[index]}
								setLosingPokemon={setLosingPokemon}
								key={index}
							></Card>
						);
					})}
				</div>
			</div>
			{!losingPokemon ? null : <LossScreen pokemon={losingPokemon} score={currentScore}></LossScreen>}
			{/* A victory screen needs to be added */}
		</>
	);
}
