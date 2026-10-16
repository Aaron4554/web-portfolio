function ListGroup() {
  let items = [
    "I'm in",
    'Detroit',
    'You guys are in',
    'Saint Joseph',
    'Or somewhre',
  ];

  return (
    <>
      <h1>Hi Guys!</h1> {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item) => (
          <li
            className="list-group"
            key={item}
            onClick={() => console.log('CLicked ' + item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
