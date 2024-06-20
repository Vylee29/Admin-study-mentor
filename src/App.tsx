import { RouterProvider } from 'react-router-dom';
import AntDesignProvider from './+core/provider/AntDesignProvider';
import ReactQueryProvider from './+core/provider/ReactQueryProvider';
import { Providers } from './+core/store/provider';
import './index.scss';
import { router } from './routes/router';

function App() {
  return (
    <ReactQueryProvider>
      <Providers>
        <AntDesignProvider>
          <RouterProvider router={router} />
        </AntDesignProvider>
      </Providers>
    </ReactQueryProvider>
  );
}

export default App;
