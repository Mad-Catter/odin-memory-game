import { useState, useEffect } from 'react';
import pokeball from '../assets/pokeball-png.png';
export default function Card({ dexNum }) {
	const [clicks, setClicks] = useState(0);
	const [imgAttr, setImgAttr] = useState({ url: pokeball, alt: "Who's that pokemon?" });
	// this is bad practice ^
	function handleClick() {
		setClicks((clicks) => clicks + 1);
		if (clicks + 1 > 1) {
			alert(`This has been clicked ${clicks + 1} times!`);
		}
	}
	useEffect(() => {
		let image;
		async function getURL() {
			const url = `https://pokeapi.co/api/v2/pokemon/${dexNum}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(response);
			}
			const responseJSON = await response.json();
			console.log(responseJSON);
			image = responseJSON.sprites.other['official-artwork'].front_default;
			setImgAttr({ url: image, alt: responseJSON.name });
		}
		getURL();
	}, []);
	return (
		<div className="card" onClick={handleClick}>
			<h1>{clicks}</h1>
			<img src={imgAttr.url} alt={imgAttr.alt} />
		</div>
	);
}
