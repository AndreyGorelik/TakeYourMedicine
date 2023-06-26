import Feather from 'react-native-vector-icons/Feather';

function Checkbox({ checked }: { checked: boolean }) {
  const iconName = checked ? 'check-circle' : 'circle';
  const color = checked ? '#F273B2' : '#0099FF';
  return <Feather name={iconName} size={24} color={color} />;
}

export default Checkbox;
