import { useEffect, useRef } from 'react';
import '../styles/Loss.css';

export default function LossScreen({ pokemon, score }) {
	const ref = useRef(null);
	function handleClick() {}
	useEffect(() => {
		const panel = ref.current;
		panel.style.transform = 'translateY(0vh)';
	}, []);
	return (
		<div className="background">
			<div className="panel" ref={ref}>
				<h1>You Lose!</h1>
				<h2>
					You caught <b>{score}</b> pokemon before you caught <b>{pokemon.name}</b> twice!
				</h2>
				<img src={pokemon.url} alt={pokemon.name} style={{ backgroundColor: `var(--${pokemon.type}-type)` }} />
				<button type="button" onClick={handleClick}>
					Play Again
				</button>
			</div>
		</div>
	);
}
