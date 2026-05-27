import { Pressable, Text, View } from 'react-native';

type WorkoutCardProps = {
  name: string;
  sets: string;
  reps: string;
  onDelete: () => void;
};

export default function WorkoutCard({
  name,
  sets,
  reps,
  onDelete,
}: WorkoutCardProps) {
  return (
    <View
      style={{
        width: '50%',
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 22 }}>
        {name}
      </Text>

      <Text style={{ fontSize: 18 }}>
        {sets} sets × {reps} reps
      </Text>

      <Pressable onPress={onDelete}>
        <Text
            style={{
            color: 'red',
            marginTop: 10,
            fontSize: 18,
            }}
        >
            Delete
        </Text>
        </Pressable>

    </View>
  );
}