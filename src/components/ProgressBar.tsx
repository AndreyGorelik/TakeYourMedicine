import { View, StyleSheet } from 'react-native';

interface ProgressBar {
  range: number;
}

const ProgressBar = ({ range }: ProgressBar) => {

  let progressLength = '0%';
  if (range < 1) {
    progressLength = '0%';
  } else if (range > 100) {
    progressLength = '100%';
  } else {
    progressLength = `${range + '%'}`;
  }

  return (
    <View style={styles.backBar}>
      <View style={[styles.frontBar, { width: progressLength }]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  backBar: {
    width: '100%',
    height: 7,
    backgroundColor: 'gray',
    borderRadius: 25,
  },
  frontBar: {
    height: 7,
    backgroundColor: 'orange',
    borderRadius: 25,
  },
});

export default ProgressBar;
