function ListGroup() {
  let items = [
    'You can click on me',
    "It doesn't do anything",
    'But you can do it',
  ];
  let selectedIndex = -1;

  return (
    <>
      <h1>Hi Guys!</h1> {items.length === 0 && <p>No item found</p>}
      <ul className={selectedIndex === index ? "list-group-item active" : "list-group-item"}>
        {items.map((item) => (
          <li
            className="list-group-item"
            key={item}
            onClick={() =>
              console.log('I lied, it does do something, you clicked: ' + item)
            }
          >
            {item}
          </li>
        ))}
      </ul >
    </>
  );
}

export default ListGroup;
