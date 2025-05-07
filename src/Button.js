export default function Button(props) {
  return (
    <div>
      {/* onClick to download meme and generates meme*/}
      <button onClick={props.onClick} type={props.type}>
        {props.setButton}

        {/* Download and generate */}
      </button>
    </div>
  );
}
