import { useState } from 'react';
import pokeball from '../assets/pokeball-png.png';
import '../styles/Card.css';
export default function Card({
	pokemon = { url: pokeball, name: "Who's that pokemon?", type: 'normal' },
	currentScore,
	setCurrentScore,
	bestScore,
	setBestScore,
	order,
	setLosingPokemon,
}) {
	const [clicks, setClicks] = useState(0);
	function handleClick() {
		setClicks((clicks) => clicks + 1);
		if (clicks + 1 > 1) {
			setLosingPokemon(pokemon);
		} else {
			setCurrentScore((currentScore) => currentScore + 1);
			if (currentScore + 1 > bestScore) {
				setBestScore(currentScore + 1);
			}
		}
	}

	return (
		<div
			className="card"
			onClick={handleClick}
			style={{ order: `${order}`, backgroundColor: `var(--${pokemon.type}-type)` }}
		>
			<img src={pokemon.url} alt={pokemon.name} />
			<h1 className="click-num">{clicks}</h1>
		</div>
	);
}
