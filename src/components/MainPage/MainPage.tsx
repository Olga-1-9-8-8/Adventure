import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './MainPage.module.css';
import { Verb } from './Verb/Verb';

interface IVerb {
  id: string,
  currentNameIndex: number,
  currentVerb: string,
  time: string,
}


export const MainPage: React.FC = () => {
  const nameArr = ['я', 'мы', 'ты', 'вы', 'он', 'она', 'оно', 'они'];
  const [currentName, setCurrentName] = useState('я');
  const [currentVerb, setCurrentVerb] = useState('');
  const [verbs, setVerbs] = useState<IVerb[]>([]);

  const createDate = () => {
    let dataDate = new Date();
    let minutes = dataDate.getMinutes();
    let seconds = dataDate.getSeconds();
    return `Время:  ${minutes}мин. ${seconds}сек.`
  }


  const handleChangeName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentName(e.target.value)
  }
  const handleChangeVerb = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentVerb(e.target.value)
  }

  const deleteVerb = (id: string) => {
    setVerbs(verbs.filter((verb) => verb.id !== id))
  }

  const addVerb = () => {
    let currentNameIndex = nameArr.findIndex(item => item === currentName)
    let time = createDate();
    let id = getId();
    const newVeb = { currentNameIndex, currentVerb, time, id }
    setVerbs([...verbs, newVeb])
  }

  const getId = () => {
    let id = uuidv4();
    return id;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!currentVerb) {
      alert('Пожалуйста введите действие в форму')
      return
    }
    addVerb()
    setCurrentVerb('')
  }

  return (
    <main className={styles.mainPage}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form__itemSelectWrapper}>
          <label>Выбери кто действует:</label>
          <select className={styles.form__itemSelect} value={currentName} onChange={handleChangeName}>
            {nameArr.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            )
            )}
          </select>
        </div>
        <div className={styles.form__itemInput}>
          <input
            type='text'
            placeholder='Напиши действие'
            value={currentVerb}
            onChange={handleChangeVerb}
          />
        </div>
        <div className={styles.form__button}>
          <input type='submit' value='Создай действие' />
        </div>
      </form>
      <div className={styles.results}>
        {verbs.map((verb, index) => (
          <Verb key={index} verb={verb} deleteVerb={deleteVerb} />
        ))}
      </div>
    </main>
  );
};
