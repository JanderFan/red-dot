import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useRedDotState } from 'red-dot-react';
import { useRedDotState } from 'red-dot-react';
import Friend from './Friend';
import Moment from './Moment';

const RootLayout = () => {
  const [friendCount] = useRedDotState('friend');
  const [userCount] = useRedDotState('user');
  console.log('RootLayout');
  return (
    <Tabs
      defaultValue="friend"
      className="w-[400px] m-auto mt-3.5"
    >
      <TabsList>
        <TabsTrigger
          value="friend"
          className="relative"
        >
          <Badge
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            variant="destructive"
          >
            {friendCount}
          </Badge>
          <span>朋友</span>
        </TabsTrigger>
        <TabsTrigger
          className="relative"
          value="moment"
        >
          <Badge
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            variant="destructive"
          >
            {userCount}
          </Badge>
          <span>moment</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="friend">
        <Friend />
      </TabsContent>
      <TabsContent value="moment">
        <Moment />
      </TabsContent>
    </Tabs>
  );
};

export default RootLayout;
