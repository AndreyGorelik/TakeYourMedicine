import Feather from 'react-native-vector-icons/Feather';

function Checkbox({ checked }: { checked: boolean }) {
  const iconName = checked ? 'check-circle' : 'circle';
  return <Feather name={iconName} size={22} />;
}

export default Checkbox;
