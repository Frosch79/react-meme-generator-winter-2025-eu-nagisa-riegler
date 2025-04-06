import Button from './Button';

export default function DownloadButton(props) {
  return (
    <div className={props.className}>
      <Button
        setButton={props.setButton}
        type={props.type}
        onClick={props.onClick}
      />
    </div>
  );
}
