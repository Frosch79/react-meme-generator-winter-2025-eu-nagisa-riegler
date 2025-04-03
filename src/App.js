import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import DownloadButton from './DownloadButton';
import MemeImage from './MemeImage';
import SearchForm from './SearchForm';

export default function App() {
  const [memes, setMemes] = useState([]);
  const [template, setTemplate] = useState();
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [image, setImage] = useState();
  const [addData, setAddData] = useState({});
  const [testObj, setTestObj] = useState();

  const apiUrl = 'https://api.memegen.link/templates/';

  useEffect(() => {
    /* set template data */
    async function memeTemplate() {
      const data = await fetch(apiUrl)
        .then((response) => response.json())
        .then((toObjectSep) => toObjectSep.map((meme) => meme))
        .then((setMeme) => setMemes(setMeme));

      return data;
      /*    setMemes(data); */
    }
    memeTemplate().catch((error) => console.log(error));

    setAddData({
      addTemplate: 'Ancient Aliens Guy',
    });
  }, []);

  useEffect(() => {
    /* set image */
    fetch(image).catch((error) => console.log(error));
  }, [image]);

  useEffect(() => {
    /* set data */

    const findObj = memes.find((obj) => addData.addTemplate === obj.name);
    if (typeof findObj !== 'object') {
      return;
    } else {
      setTestObj({
        id: findObj.id,
        name: findObj.name,
        firstText:
          addData.addTopText || addData.addBottomText
            ? addData.addTopText
            : findObj.example.text[0],
        secondText:
          addData.addBottomText || addData.addTopText
            ? addData.addBottomText
            : findObj.example.text[1],
      });
    }

    setBottomText('');
    setTopText('');
    setTemplate('');
  }, [addData, memes]);

  useEffect(() => {
    /* set image */
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
    const regexTest = (word) => {
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
    const createImage = (obj) => {
      if (typeof testObj === 'object') {
        const { id, firstText, secondText } = obj;
        const first = regexTest(firstText);
        const second = regexTest(secondText);

        return `https://api.memegen.link/images/${id}/${first}/${second}.jpg`;
      }
    };
    setImage(createImage(testObj));
  }, [testObj]);

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
