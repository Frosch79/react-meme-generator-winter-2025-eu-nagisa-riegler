export default function Input(props) {
  return (
    <div>
      <label htmlFor={props.labelText}>{props.labelText}</label>
      <input
        id={props.labelText}
        type="search"
        name={props.name}
        value={props.value}
        onChange={props.onChange} 
      />
    </div>
  );
}
