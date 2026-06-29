import { useState } from 'react';
import Card from './Card';
import Game from './Game';
import '../styles/App.css';

function App() {
	const gen1 = [1, 151];
	const gen2 = [152, 251];
	const gen3 = [252, 386];
	const gen4 = [387, 493];
	const gen5 = [494, 649];
	const gen6 = [650, 721];
	const gen7 = [722, 809];
	const gen8 = [810, 905];
	const gen9 = [906, 1025];
	const legalPokemon = [];
	for (let i = 1; i < 1025; i++) {
		legalPokemon.push(i);
	}
	// gen 1 [1, 151], g2 [152, 251], g3[252, 386], g4[387, 493], g5[494, 649], g6[650, 721], g7[722, 809], g8 [810, 905], g9 [906, 1025]

	// Main menu, chooses which difficulty (16, 32, 64 imgs?) and which gens of pokemon to have.
	// Once difficulty is chosen, move to game menu component.
	// Game menu has a tracker at the top right with the current streak and best streak,
	// Majority of the screen should be a grid that is 2x8, 4x8, or 8x8.  That is filled with card components.
	// The game menu should have an effect that shuffles the position of each card to a different position on the grid.
	// Maybe the shuffle takes an array of numbers (0-7) (and however many rows), and math.random selects a number then pushes it off.  (array might be slow)
	// Each component should have a state that tracks how many times its been clicked.  If its been clicked twice then game over.

	// The pokemon images will be gotten from pokeapi and will get the images from "sprites" > other > official-artwork > front_default.
	// This api request needs to be done per pokemon and with an effect.  Should this effect be done on a per card basis or all at once?
	// For now I am going to go with cards.
	return (
		<>
			<Game legalPokemon={legalPokemon} numberOfPokemon={16}></Game>
		</>
	);
}

export default App;
