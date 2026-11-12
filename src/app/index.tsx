

import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const initialStudents = [
  { id: 's1', name: 'Ana Cruz', year: '3rd Year', photoUrl: 'https://i.pravatar.cc/100?img=1', flagged: true },
  { id: 's2', name: 'Bea Santos', year: '2nd Year', photoUrl: 'https://i.pravatar.cc/100?img=2', flagged: false },
  { id: 's3', name: 'Cid Ramos', year: '4th Year', photoUrl: 'https://i.pravatar.cc/100?img=3', flagged: false },
  { id: 's4', name: 'Dex Alonzo', year: '1st Year', photoUrl: 'https://i.pravatar.cc/100?img=4', flagged: false },
  { id: 's5', name: 'Eli Tan', year: '3rd Year', photoUrl: 'https://i.pravatar.cc/100?img=5', flagged: false },
];
type StudentCardProps = {
  id: string;
  name: string;
  year: string;
  photoUrl: string;
  flagged: boolean;
  onToggleFlag: (id: string) => void;
};

  function StudentCard({
  id,
  name,
  year,
  photoUrl,
  flagged,
  onToggleFlag,
}: StudentCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: photoUrl }} style={styles.photo} />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.year}>{year}</Text>
      </View>

      <Pressable
        onPress={() => onToggleFlag(id)}
        style={({ pressed }) => [
          styles.button,
          flagged ? styles.flaggedButton : styles.unflaggedButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Text style={[
          styles.buttonText,
          flagged && styles.flaggedText,
        ]}>
          {flagged ? '★ Flagged' : '☆ Flag'}
        </Text>
      </Pressable>
    </View>
  );
}

export default function StudentDirectory() {
  const [students, setStudents] = useState(initialStudents);
  const [query, setQuery] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(query.toLowerCase())
  );

  const toggleFlag = (id: string) => {
    setStudents(current =>
      current.map(student =>
        student.id === id
          ? { ...student, flagged: !student.flagged }
          : student
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Student Directory</Text>
        <Text style={styles.subtitle}>5 students this term</Text>
      </View>

      <View style={styles.content}>
        <TextInput
  style={styles.search}
  placeholder="⌕  Search students..."
  placeholderTextColor="#8580a6"
  value={query}
  onChangeText={setQuery}
/>
        

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              id={student.id}
              name={student.name}
              year={student.year}
              photoUrl={student.photoUrl}
              flagged={student.flagged}
              onToggleFlag={toggleFlag}
            />
          ))}

          {filteredStudents.length === 0 && (
            <Text style={styles.empty}>
              No students found.
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f7fc',
  },
  header: {
    backgroundColor: '#211b55',
    paddingTop: 65,
    paddingHorizontal: 24,
    paddingBottom: 25,
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#c9c5e6',
    fontSize: 15,
    marginTop: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 22,
  },
  search: {
    backgroundColor: '#f0eef8',
    borderWidth: 1,
    borderColor: '#dedbea',
    borderRadius: 17,
    padding: 15,
    fontSize: 16,
    marginBottom: 18,
    color: '#211b55',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e4e0ef',
    borderRadius: 20,
    padding: 17,
    marginBottom: 15,
  },
  photo: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#24213b',
  },
  year: {
    fontSize: 15,
    color: '#8580a6',
    marginTop: 4,
  },
  button: {
    paddingVertical: 11,
    paddingHorizontal: 13,
    borderRadius: 25,
    borderWidth: 1.5,
  },
  unflaggedButton: {
    backgroundColor: 'white',
    borderColor: '#8580a6',
  },
  flaggedButton: {
    backgroundColor: '#d09100',
    borderColor: '#d09100',
  },
  pressedButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#8580a6',
  },
  flaggedText: {
    color: 'white',
  },
  empty: {
    textAlign: 'center',
    color: '#8580a6',
    marginTop: 30,
    fontSize: 16,
  },
});

