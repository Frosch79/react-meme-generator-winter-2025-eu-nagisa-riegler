export default function Selector(props) {
  let num = 0;

  return (
    <div className={props.className}>
      <label htmlFor="template-selector">{props.labelText}</label>
      <select
        selected
        defaultValue={(event) => event.target.option.value}
        id="template-selector"
        onChange={props.onChange}
      >
        {props.option.map((value) => {
          const { id, name } = value;

          num++;
          return (
            <option key={`${num}-${id}`} value={name}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
