function Cards(props) {
  return (
    <a href="">
      <div className="adv-prof">
        <img id="pfp" src={props.image} alt={props.name} />
        <h2 id="name">{props.name}</h2>
        <p id="desc">{props.desc}</p>
      </div>
    </a>
  )
}

export default Cards
