import { NotiType, Listener, GetNoties, Position } from './types';

function createNotifier(init?: Partial<NotiType>) {
  let id = 0;
  let noties: NotiType[] = [];
  let listeners: Listener[] = [];

  const baseNoti: NotiType = {
    id,
    message: '',
    timeout: 3000,
    animation: 'pop',
    type: 'default',
    position: 'top-left',
    pauseOnHover: false,
    closeOnClick: true,
    ...init,
  };
  function getNoties() {
    return noties;
  }
  function listen(listener: Listener) {
    listeners = [...listeners, listener];
  }
  function inform() {
    listeners.forEach(listener => {
      listener(getNoties);
    });
  }
  function notify(noti: Partial<NotiType>) {
    const mergedNoti = {
      ...baseNoti,
      id: id++,
      ...noti,
    };
    noties = [...noties, mergedNoti];
    inform();
    return mergedNoti.id;
  }
  function closeNoti(notiId: number) {
    noties = noties.filter(noti => noti.id !== notiId);
    inform();
  }
  function closeAll() {
    noties = noties.map(noti => ({ ...noti, close: true }));
    inform();
  }

  return {
    getNoties,
    listen,
    notify,
    closeNoti,
    closeAll,
  };
}

export type Notifier = ReturnType<typeof createNotifier>;
export default createNotifier;
