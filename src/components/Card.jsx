import { useState } from 'react';
import pokeball from '../assets/pokeball-png.png';
import '../styles/Card.css';
export default function Card({ pokemon = { url: pokeball, name: "Who's that pokemon?" } }) {
	const [clicks, setClicks] = useState(0);
	// this is bad practice ^
	function handleClick() {
		setClicks((clicks) => clicks + 1);
		if (clicks + 1 > 1) {
			alert(`This has been clicked ${clicks + 1} times!`);
		}
	}

	return (
		<div className="card" onClick={handleClick}>
			<img src={pokemon.url} alt={pokemon.name} />
			<h1 className="click-num">{clicks}</h1>
			<h1 className="name">{pokemon.name}</h1>
		</div>
	);
}
