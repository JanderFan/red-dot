import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRedDotState } from 'red-dot-react';

const Friend = () => {
  const [newFriendCount] = useRedDotState('friend.new');
  const [findFriendCount] = useRedDotState('friend.find');

  return (
    <div className="space-y-3">
      <div>
        <Button>
          new friend
          <Badge variant={'destructive'}>{newFriendCount}</Badge>
        </Button>
      </div>
      <div>
        <Button>
          find friend
          <Badge variant={'destructive'}>{findFriendCount}</Badge>
        </Button>
      </div>
    </div>
  );
};

export default Friend;
