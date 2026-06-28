export default function Game() {
	return (
		<>
			{' '}
			<Card dexNum={Math.floor(Math.random() * 1000)}></Card>
			<Card dexNum={Math.floor(Math.random() * 1000)}></Card>
			<Card dexNum={Math.floor(Math.random() * 1000)}></Card>
			<Card dexNum={Math.floor(Math.random() * 1000)}></Card>
		</>
	);
}
