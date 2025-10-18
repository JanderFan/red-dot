import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useRedDotNode, useRedDotState } from 'red-dot-react';

const Moment = () => {
  const [userPackCount] = useRedDotState('user.pack');
  const packNode = useRedDotNode('user.pack');
  const [userVersionCount, userSilence] = useRedDotState('user.version');
  const versionNode = useRedDotNode('user.version');

  const handleCheckChange = (checked: boolean) => {
    versionNode?.setSilence(checked);
  };

  const handlePackClick = () => {
    packNode?.setCount(0);
  };

  console.log('moment');
  return (
    <div className="space-y-3">
      <div>
        <Button onClick={handlePackClick}>
          钱包
          <Badge variant={'destructive'}>{userPackCount}</Badge>
        </Button>
      </div>
      <div>
        <Button>
          版本
          <Badge variant={userSilence ? 'default' : 'destructive'}>{userVersionCount}</Badge>
        </Button>
        <Switch
          checked={userSilence}
          onCheckedChange={handleCheckChange}
        />
      </div>
    </div>
  );
};

export default Moment;
