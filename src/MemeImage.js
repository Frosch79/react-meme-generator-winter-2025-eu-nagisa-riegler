export default function MemeImage(props) {
  return (
    <div>
      <img
        data-test-id="meme-image"
        src={props.src}
        alt="meme-image" /* generated meme image  */
      />
    </div>
  );
}
