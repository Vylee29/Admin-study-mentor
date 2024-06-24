import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../+core/store';

export function HomePage() {
  const counter = useSelector((state: RootState) => state.sidebar.collapsed);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home Page {counter}</h1>
      {/* <button onClick={() => dispatch(setWidthSideBar(counter + 1))}>Increse</button>
      <button onClick={() => dispatch(setWidthSideBar(counter - 1))}>Decrese</button> */}
    </div>
  );
}
