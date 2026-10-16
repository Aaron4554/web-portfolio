function ListGroup() {
  let items = [
    'You can click on me',
    "It doesn't do anything",
    'But you can do it',
  ];

  return (
    <>
      <h1>Hi Guys!</h1> {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item) => (
          <li
            className="list-group-item"
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
