import Card from './Card';
import '../styles/Game.css';
import { useEffect, useState } from 'react';

export default function Game({ legalpokemon, numberOfPokemon }) {
	const [arrayOfPokemon, setArrayOfPokemon] = useState(new Array(numberOfPokemon).fill(undefined));
	const [currentScore, setCurrentScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
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
					const randomNumber = Math.floor(Math.random() * legalpokemon.length);
					if (!currentPokemon.includes(randomNumber)) {
						currentPokemon.push(randomNumber);
						return randomNumber;
					}
					return getLegalRandom();
				}

				promises.push(getPokemon(legalpokemon[getLegalRandom()]));
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
	}, [numberOfPokemon]);
	// A function needs to still be made to shuffle the cards on the grid when any of them are clicked
	return (
		<div className="game-screen">
			<div className="counter">
				<h1 className="count">Current score: {currentScore}</h1>
				<h2 className="best">Best score: {bestScore}</h2>
			</div>
			<div className="card-grid">
				{arrayOfPokemon.map((pokemon) => {
					return (
						<Card
							pokemon={pokemon}
							currentScore={currentScore}
							setCurrentScore={setCurrentScore}
							bestScore={bestScore}
							setBestScore={setBestScore}
						></Card>
					);
				})}
			</div>
		</div>
	);
}
