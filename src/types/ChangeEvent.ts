interface CurrentTarget extends EventTarget {
  value: string;
}

interface ChangeEvent extends Event {
  currentTarget: CurrentTarget;
}

export default ChangeEvent;
