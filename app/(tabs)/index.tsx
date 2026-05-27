import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import WorkoutCard from '../../components/workoutCard';



export default function HomeScreen() {

  const [workout, setWorkout] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [savedWorkouts, setSavedWorkouts] =
  useState<{ name: string; sets: string; reps: string }[]>([]);

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