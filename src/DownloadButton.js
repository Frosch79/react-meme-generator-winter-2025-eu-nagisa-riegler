import Button from './Button';

export default function DownloadButton(props) {
  return (
    <div className={props.className}>
      <a href={props.imageFile} download="meme.jpg">
        <Button setButton={props.setButton} type={props.type} />
      </a>
    </div>
  );
}
