import { useRef } from 'react';
// Menu needs to have 9 buttons for each gen, and 3 difficulty options.
// Easy is 16 cards, medium is 32, hard is 64.

// Once the "go" button is clicked, depending on what generations are active,
// a function should trigger that pushes all dex numbers associated with each active region [1, 151] into an array to give to game.jsx

// There needs to be a different grid alignment for 16, 32, and 64 cards
export default function Menu({
	gen1,
	gen2,
	gen3,
	gen4,
	gen5,
	gen6,
	gen7,
	gen8,
	gen9,
	legalGens,
	setLegalGens,
	numberOfPokemon,
	setNumberOfPokemon,
}) {
	const ref = useRef(null);
	function handleGeneration(e, generation) {
		//  To avoid iterating the arrays multiple times, we filter the array at the start to get rid of any matches to the selected generation
		// Which is what we would do toggling the gen off anyways.
		// Then we see if nothing got filtered out, then what we actually need to do is "toggle the generation on" and put it into the list.
		// Either way we take our new array and set it to the legal gens.

		const newArr = legalGens.filter((arr) => arr[0] !== generation[0]);
		if (newArr.length === legalGens.length) {
			newArr.push(generation);
		}
		setLegalGens(newArr);
		e.target.className.toggle('selected');
	}
	function handleDifficulty(e, cardNumber) {
		if (numberOfPokemon !== cardNumber) {
			setNumberOfPokemon(cardNumber);
			// Only one diffuculty can be selected at a time.  This will hopefully remove the selected class from all the buttons then readd the class to the selected button.

			for (const child of ref) {
				child.target.className.remove('selected');
			}
			e.target.className.toggle('selected');
		}
	}
	function handleStart() {
		// Toggle the menu shifting into the game here
	}
	return (
		<div className="menu">
			<h1>Pokemon Memory Game!</h1>
			<p>Catch as many pokemon as you can without catching the same one twice!</p>
			<div className="selections">
				<div className="generation-selection">
					<h2>Select what generations of pokemon you want to play with</h2>
					<div className="buttons generation-buttons">
						<button type="button" classname="selected" onClick={(e) => handleGeneration(e, gen1)}>
							I
						</button>
						<button type="button" classname="selected" onClick={(e) => handleGeneration(e, gen2)}>
							II
						</button>
						<button type="button" classname="selected" onClick={(e) => handleGeneration(e, gen3)}>
							III
						</button>
						<button type="button" classname="selected" onClick={(e) => handleGeneration(e, gen4)}>
							IV
						</button>
						<button type="button" classname="selected" onClick={(e) => handleGeneration(e, gen5)}>
							V
						</button>
						<button type="button" classname="selected" onClick={(e) => handleGeneration(e, gen6)}>
							VI
						</button>
						<button type="button" classname="selected" onClick={(e) => handleGeneration(e, gen7)}>
							VII
						</button>
						<button type="button" classname="selected" onClick={(e) => handleGeneration(e, gen8)}>
							VIII
						</button>
						<button type="button" classname="selected" onClick={(e) => handleGeneration(e, gen9)}></button>
					</div>
				</div>
				<div className="diffculty-selection">
					<h2>Select your difficulty</h2>
					<div className="buttons difficulty-buttons" ref={ref}>
						<button
							type="button"
							onClick={(e) => {
								handleDifficulty(e, 16);
							}}
						>
							Easy
						</button>
						<button
							type="button"
							onClick={(e) => {
								handleDifficulty(e, 32);
							}}
						>
							Medium
						</button>
						<button
							type="button"
							onClick={(e) => {
								handleDifficulty(e, 64);
							}}
						>
							Hard
						</button>
					</div>
				</div>
				<button type="button" onClick={handleStart}>
					Start!
				</button>
			</div>
		</div>
	);
}
