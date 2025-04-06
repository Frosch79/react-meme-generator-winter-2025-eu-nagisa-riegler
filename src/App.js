import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import DownloadButton from './DownloadButton';
import MemeImage from './MemeImage';
import SearchForm from './SearchForm';

export default function App() {
  const [memes, setMemes] = useState([]);
  const [template, setTemplate] = useState('Ancient Aliens Guy');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [image, setImage] = useState();
  const [addData, setAddData] = useState({});

  const apiUrl = 'https://api.memegen.link/templates/';

  const textConvertor = (word) => {
    const changeRegex = {
      _: ' ',
      __: '_',
      '--': '-',
      '~n': '\n',
      '~q': '?',
      '~a': '&',
      '~p': '%',
      '~h': '#',
      '~s': '/',
      '~b': '\\',
      '~l': '<',
      '~g': '>',
      "''": '"',
    };

    let makeWord = '';
    const testWord = word.split('');

    if (testWord.length > 0) {
      for (let i = 0; i < testWord.length; i++) {
        const search = Object.keys(changeRegex).find(
          (key) => changeRegex[key] === testWord[i],
        );
        if (typeof search !== 'undefined') {
          makeWord += search;
        } else {
          makeWord += word[i];
        }
      }
    } else {
      makeWord = '_';
    }

    return makeWord;
  };

  useEffect(() => {
    /* set template data */
    async function memeTemplate() {
      const data = await fetch(apiUrl)
        .then((response) => response.json())
        .then((toObjectSep) => toObjectSep.map((meme) => meme));
      return setMemes(data);
    }
    memeTemplate().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    /* set image */
    fetch(image).catch((error) => console.log(error));
  }, [image]);

  useEffect(() => {
    /* set data */
    console.log(addData);
    const findObj = memes.find((obj) => addData.addTemplate === obj.name);
    if (typeof findObj !== 'object') {
      return;
    } else {
      const { addTopText, addBottomText } = addData;

      const first = textConvertor(addTopText);
      const second = textConvertor(addBottomText);
      setImage(
        `https://api.memegen.link/images/${findObj.id}/${first}/${second}.jpg`,
      );
      setBottomText('');
      setTopText('');
      setTemplate('');
    }
  }, [addData, memes]);

  useEffect(() => {
    const tempImage = memes.find((meme) => template === meme.name);
    if (typeof tempImage !== 'undefined') {
      if (topText !== '' || bottomText !== '') {
        console.log(topText, bottomText);

        const first = textConvertor(topText);
        const second = textConvertor(bottomText);
        return setImage(
          `https://api.memegen.link/images/${tempImage.id}/${first}/${second}.jpg`,
        );
      } else {
        const first = textConvertor(tempImage.example.text[0]);
        const second = textConvertor(tempImage.example.text[1]);
        return setImage(
          `https://api.memegen.link/images/${tempImage.id}/${first}/${second}.jpg`,
        );
      }
    }
  }, [template, topText, bottomText, memes]);

  return (
    <div id="memes-body" className={styles.app}>
      <MemeImage src={image} />

      <SearchForm
        className={styles.textBox}
        topText={topText}
        bottomText={bottomText}
        selectValue={memes}
        changeTemplate={(event) => {
          setTemplate(event.target.value);
        }}
        setTop={(event) => setTopText(event.target.value)}
        setBottom={(event) => setBottomText(event.target.value)}
        addValue={() => {
          setAddData({
            addTemplate: template,
            addTopText: topText,
            addBottomText: bottomText,
          });
        }}
        setButton="generate"
      />

      <DownloadButton
        className={styles.download}
        type="button"
        setButton="download"
        imageFile={image}
      />
    </div>
  );
}
