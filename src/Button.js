export default function Button(props) {
  return (
    <div>
      {/* onClick to meme DL and generate meme*/}
      <button onClick={props.onClick} type={props.type}>
        {props.setButton}

        {/* Download and generate */}
      </button>
    </div>
  );
}
