import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../+core/store';
import { increaseCounter } from '../../+core/store/reducers/counter.reducer';

export function HomePage() {
  const counter = useSelector((state: RootState) => state.counter.counter);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home Page {counter}</h1>
      <button onClick={() => dispatch(increaseCounter(counter + 1))}>Increse</button>
      <button onClick={() => dispatch(increaseCounter(counter - 1))}>Decrese</button>
    </div>
  );
}
