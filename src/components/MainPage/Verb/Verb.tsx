import { FaTimes } from 'react-icons/fa';
import styles from './Verb.module.css';

interface IVerb {
  id: string,
  currentNameIndex: number,
  currentVerb: string,
  time: string,
}

interface Props {
  verb: IVerb
  deleteVerb: (id: string) => void
}

export const Verb: React.FC<Props> = ({ verb, deleteVerb }) => {
  const currentName = verb.currentVerb;
  const world = verb.currentVerb;
  const newWorld = world.slice(0, world.length - 3);
  const indexRight = verb.currentNameIndex;
  let end = world.slice(-3, world.length);


  const exceptionFirst = [
    'у(ю)', 'ем', 'ешь', 'ете', 'ет', 'ет', 'ет', 'ут(ют)'
  ]
  const exceptionSecond = [
    'у(ю)', 'им', 'ишь', 'ите', 'ит', 'ит', 'ит', 'ат(ят)'
  ]
  const exceptionFirstConjugation = ['брить', 'стелить'];
  const exceptionSecondConjugation = ['гнать', 'держать', 'смотреть', 'видеть', 'дышать', 'слышать', 'ненавидеть', 'зависеть', 'терпеть', 'обидеть', 'вертеть']


  const findRightEnd = (end: string, indexRight: number) => {

    if (end === 'ить') {
      return exceptionSecond[indexRight]
    } else {
      return exceptionFirst[indexRight]
    }
  }

  const rightEnd = findRightEnd(end, indexRight)

  const rightWorld = newWorld + rightEnd

  return (
    <div className={styles.listWrapper}>
      <p>{verb.time}</p>
      <h4 className={styles.results__title}>
        {rightWorld}
      </h4>
      <FaTimes className={styles.results__icon}
        onClick={() => deleteVerb(verb.id)}
      />
    </div>

  );
};