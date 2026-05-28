import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import WorkoutCard from '../../components/workoutCard';


export default function HomeScreen() {

  // states section
  const [workout, setWorkout] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [savedWorkouts, setSavedWorkouts] =
  useState<{ name: string; sets: string; reps: string }[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  
  // calls saveWorkouts function whenever change to savedWorkouts state
  useEffect(() => {
    if (isLoaded) {
      saveWorkouts();
    }
  }, 
  [savedWorkouts, isLoaded]);

  // saveWorkouts function: to save workouts to AsyncStorage upon every change to savedWorkouts state
  const saveWorkouts = async () => {
    try {
      await AsyncStorage.setItem(
        'workouts',
        JSON.stringify(savedWorkouts)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // calls loadWorkouts function on component mount to load any saved workouts from AsyncStorage
  useEffect(() => {
    loadWorkouts();
  }, 
  []);

  const loadWorkouts = async () => {
  try {
    const storedWorkouts =
      await AsyncStorage.getItem('workouts');

    if (storedWorkouts) {
      setSavedWorkouts(
        JSON.parse(storedWorkouts)
      );

      setIsLoaded(true);
      
    }
  } catch (error) {
    console.log(error);
  }
};

  // deleteWorkout function: to delete a workout from the savedWorkouts state
  const deleteWorkout = (indexToDelete: number) => {
    setSavedWorkouts(
      savedWorkouts.filter(
        (_, index) => index !== indexToDelete
      )
    );
  };

  

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}  
    >

      <Text
        style={{
          fontSize: 28,
          marginBottom: 5,
          marginTop: 0,
        }}
      >
        Clara's Workout Tracker 💪
      </Text> 

      <TextInput
        placeholder="Enter workout"
        value={workout}
        onChangeText={setWorkout}
        style={{
          borderWidth: 1,
          width: '50%',
          padding: 5,
          marginBottom: 20,
        }}
      />

      <TextInput
      placeholder="Enter sets"
      value={sets}
      onChangeText={setSets}
      style={{
        borderWidth: 1,
        width: '50%',
        padding: 5,
        marginBottom: 20,
      }}
      />

      <TextInput
        placeholder="Enter reps"
        value={reps}
        onChangeText={setReps}
        style={{
          borderWidth: 1,
          width: '50%',
          padding: 5,
          marginBottom: 20,
        }}
      />
      
      <Button
        title="Save Workout"
        onPress={() => setSavedWorkouts([...savedWorkouts,
          {
            name: workout,
            sets: sets,
            reps: reps,
          },
        ])}
      />

      <Text
        style={{
          marginTop: -10,
          fontSize: 22,
        }}
      >
        Saved Workout:
      </Text>

      {savedWorkouts.map((item, index) => (
      <WorkoutCard
        key={index}
        name={item.name}
        sets={item.sets}
        reps={item.reps}
        onDelete={() => deleteWorkout(index)}
      />
      ))}
       
    </View>
  );
}