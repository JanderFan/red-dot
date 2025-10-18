import { useRedDotContext } from 'red-dot-react';
import RootLayout from './pages/RootLayout';

const App = () => {
  const redDotContext = useRedDotContext();

  redDotContext.fromJSON({
    key: 'root',
    count: 11,
    isSilence: false,
    children: [
      {
        key: 'friend',
        count: 4,
        isSilence: false,
        children: [
          {
            key: 'new',
            isSilence: false,
            count: 2,
            children: []
          },
          {
            key: 'find',
            isSilence: false,
            count: 2,
            children: []
          }
        ]
      },

      {
        key: 'user',
        count: 2,
        isSilence: false,
        children: [
          {
            key: 'pack',
            isSilence: false,
            count: 2,
            children: []
          },
          {
            key: 'version',
            isSilence: true,
            count: 1,
            children: []
          }
        ]
      }
    ]
  });

  return <RootLayout />;
};

export default App;
