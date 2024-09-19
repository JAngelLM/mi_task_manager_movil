import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ListRenderItem } from 'react-native';

/* se tipan los elementos que van a haber en la lista de tareas */
interface Task {
  id: string;
  text: string;
}

export default function App(): React.ReactElement {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (): void => {
    // al añadir se valida el texto del TextInput (el q se asocio al state task)
    if (task.trim().length > 0) {
      //A la lista de tareas se le agregan 1. las tareas que ya habian, y se añade la nueva
      setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      setTask('');
    } else {
      Alert.alert('Error', 'Por favor, ingrese una tarea válida.');
    }
  };

  const deleteTask = (id: string): void => {
    //para eliminar seteamos la lista de tareas filtrando las tareas por las que tengan id diferente al eliminado
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //item que se va renderizar dentro del flatlist (usando tipado de la interface task)
  //Conteniendo el texto y el boton de eliminar
  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas (Juan Angel)</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Escribe una nueva tarea"
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item: Task) => item.id}
        style={styles.list}
      />
    </View>
  );
}
//estilos para mejor ux 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: '#5cb85c',
    padding: 10,
    borderRadius: 6,
    marginLeft: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  list: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
    elevation: 1,
  },
  taskText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});