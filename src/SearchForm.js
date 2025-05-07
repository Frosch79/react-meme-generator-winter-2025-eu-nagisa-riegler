import Input from './Input';
import Selector from './Selector';

export default function SearchForm(props) {
  return (
    <div className={props.className}>
      <Input
        name="top-text"
        labelText="Top text"
        value={props.topText}
        onChange={props.setTop}
      />
      <Input
        name="bottom-text"
        labelText="Bottom text"
        value={props.bottomText}
        onChange={props.setBottom}
      />
      <Selector
        labelText="Meme template"
        option={props.selectValue}
        onChange={props.changeTemplate}
      />
    </div>
  );
}
