import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Switch, TouchableOpacity, StyleSheet } from 'react-native';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  const addTask = () => {
    if (taskTitle.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: taskTitle,
        status: false
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
    }
  };

  const toggleStatus = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: !task.status } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    setTasks(filteredTasks);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a new task please"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      
   
      <TouchableOpacity
        style={[styles.btn, !taskTitle.trim() && styles.btnDisabled]} 
        onPress={addTask}
        disabled={!taskTitle.trim()} 
      >
        <Text style={styles.btnText}>Add Task</Text>
      </TouchableOpacity>

      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={[styles.taskTitle, item.status && styles.completedTask]}>
              {item.title}
            </Text>
            
            <Switch
              value={item.status}
              onValueChange={() => toggleStatus(item.id)}
            />

            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: '#4CAF50', // Active button background
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  btnDisabled: {
    backgroundColor: '#A5A5A5', // Disabled button background
  },
  btnText: {
    color: '#fff', // Button text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatListContainer: {
    paddingVertical: 10,
    paddingBottom: 20,
    marginTop: 10,
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 18,
    flex: 1,
    color: '#333',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#7c7c7c',
  },
  deleteButton: {
    color: '#ff6347',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TodoApp;
