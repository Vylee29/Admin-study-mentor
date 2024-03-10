import { RouterProvider } from 'react-router-dom';
import AntDesignProvider from './+core/provider/AntDesignProvider';
import './index.scss';
import { router } from './routes/router';

function App() {
  return (
    <AntDesignProvider>
      <RouterProvider router={router} />
    </AntDesignProvider>
  );
}

export default App;
