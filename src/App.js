import { saveAs } from 'file-saver';
import { useEffect, useMemo, useState } from 'react';
import styles from './App.module.scss';
import DownloadButton from './DownloadButton';
import MemeImage from './MemeImage';
import SearchForm from './SearchForm';

export default function App() {
  const [memes, setMemes] = useState([]);
  const [template, setTemplate] = useState('Ancient Aliens Guy');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  const apiUrl = 'https://api.memegen.link/templates/';

  const textConvertor = (word) => {
    /* Convert text for url */
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

    let createWord = '';
    const splitWord = word.split('');

    if (splitWord.length > 0) {
      for (let i = 0; i < splitWord.length; i++) {
        const search = Object.keys(changeRegex).find(
          (key) => changeRegex[key] === splitWord[i],
        );
        if (typeof search !== 'undefined') {
          createWord += search;
        } else {
          createWord += word[i];
        }
      }
    } else {
      createWord = '_';
    }

    return createWord;
  };

  useEffect(() => {
    /* set template data */
    async function memeTemplate() {
      const data = await fetch(apiUrl)
        .then((response) => response.json())
        .then((obj) => obj.map((meme) => meme));
      return setMemes(data);
    }
    memeTemplate().catch((error) => console.log(error));
  }, []);

  const image = useMemo(() => {
    /* to store image url  */
    const foundMeme = memes.find((meme) => template === meme.name);
    if (typeof foundMeme !== 'undefined') {
      let first, second;
      if (topText !== '' || bottomText !== '') {
        first = textConvertor(topText);
        second = textConvertor(bottomText);
      } else {
        first = textConvertor(foundMeme.example.text[0]);
        second = textConvertor(foundMeme.example.text[1]);
      }

      return `https://api.memegen.link/images/${foundMeme.id}/${first}/${second}.jpg`;
    }
  }, [template, bottomText, topText, memes]);

  /* DL image */
  const downloadImage = () => {
    saveAs(image);
  };

  /* fetch image */

  fetch(image).catch((error) => console.log(error));

  return (
    <div id="memes-body" className={styles.app}>
      <MemeImage src={image} />

      <SearchForm
        className={styles.textBox}
        topText={topText}
        bottomText={bottomText}
        selectValue={memes}
        changeTemplate={(event) => setTemplate(event.target.value)}
        setTop={(event) => setTopText(event.target.value)}
        setBottom={(event) => setBottomText(event.target.value)}
        setButton="generate"
      />

      <DownloadButton
        className={styles.download}
        type="button"
        setButton="Download"
        onClick={downloadImage}
      />
    </div>
  );
}
