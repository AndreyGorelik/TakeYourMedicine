import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Calendar, CalendarUtils, DateData } from 'react-native-calendars';

interface CalendarInt {
  date: string;
  setDate: (arg: string) => void;
}

function CalendarWithSelectableDate({ date, setDate }: CalendarInt) {
  const nowDate = CalendarUtils.getCalendarDateString(new Date());

  const marked = useMemo(() => {
    return {
      [date]: {
        selected: true,
        disableTouchEvent: false,
        selectedColor: '#0099FF',
        selectedTextColor: 'red',
      },
    };
  }, [date]);

  const onDayPress = useCallback(
    (day: DateData) => {
      setDate(day.dateString);
    },
    [setDate]
  );

  return (
    <Calendar
      style={styles.calendar}
      enableSwipeMonths
      current={nowDate}
      onDayPress={onDayPress}
      markedDates={marked}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 25,
    padding: 10,
  },
});

export default CalendarWithSelectableDate;
