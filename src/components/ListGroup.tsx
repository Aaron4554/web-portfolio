function ListGroup() {
	const items = [
		'Detroit',
		'Chicago',
		'Saint Joseph',
		'LA',
	];

	if (items.length === 0)
		return ( <> <h1>List</h1><p>No items found</p> </> )

	return (
	<>
	<h1>List</h1>
	<ul className="list-group">
	{items.map(item => <li key={item}>{item}</li>)}
	  </ul>
	  </>
	);
}

export default ListGroup;
