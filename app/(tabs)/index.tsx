import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">

export default function Index() {
  const {colors} = useTheme()
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);

  const [editId, setEditId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState("")

  const toggleTodo = useMutation(api.todos.toggleTodo)
  const deleteTodo = useMutation(api.todos.deleteTodo)
  const updateTodo = useMutation(api.todos.updateTodo)
  const isLoading = todos === undefined;
  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({id})
    } catch (error) {
      Alert.alert("Error", "Failed to toggle todo")
    }
  }

  const handleDeleteTodo = async (id: Id<"todos">) => {
    try {
      Alert.alert("Delete Todo","Are you sure you want to delete this todo?", [
        {
          text: "Cancel",
          isPreferred: true,
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => await deleteTodo({id}),
          style: "destructive",
        }
      ])
    } catch (e) {
      Alert.alert("Error", "Failed to Delete Todo")
    }
  }

  const handleSaveEdit = async () => {
    try {
      await updateTodo({text: editText.trim(), id: editId!})
      setEditText("")
      setEditId(null)
    } catch (e) {
      Alert.alert("Error", "Failed to Update Todo")
    }
  }
  const handleCancelEdit = () => {
    setEditText("")
    setEditId(null)
  }
  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.text)
    setEditId(todo._id)
  }

  const renderTodoItem = ({item} : {item: Todo}) => {
    const isEditing = editId === item._id;
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
        colors={colors.gradients.surface}
        style={homeStyles.todoItem}
        start={{x:0,y:0}}
        end={{x:1,y:1}}
        >
          <TouchableOpacity
          style={homeStyles.checkbox}
          activeOpacity={.7}
          onPress={()=> handleToggleTodo(item._id)}
          >
            <LinearGradient
            colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
            style={[
              homeStyles.checkboxInner,
              { borderColor: item.isCompleted ? "transparent" : colors.border }
            ]}
            >
              {
                item.isCompleted &&
                <Ionicons name="checkmark" size={18} color={"#ffffff"} />
              }
            </LinearGradient>
          </TouchableOpacity>
          { isEditing ? (
              <View style={homeStyles.todoTextContainer}>
                <TextInput
                style={homeStyles.editInput}
                value={editText}
                onChangeText={(text)=>setEditText(text)}
                autoFocus
                multiline
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted}
                />
                <View style={homeStyles.editButtons}>
                  <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                    <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                      <Ionicons name="checkmark" size={16} color={"#ffffff"}/>
                      <Text style={homeStyles.editButtonText}>Save</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                    <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                      <Ionicons name="close" size={16} color={"#ffffff"}/>
                      <Text style={homeStyles.editButtonText}>Cancel</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
          ) :
            (
              <View style={homeStyles.todoTextContainer}>
                <Text
                style={[
                  homeStyles.todoText,
                  item.isCompleted && {
                    textDecorationLine:"line-through",
                    color: colors.textMuted,
                    opacity: 0.6
                  }
                ]}
                >
                  {item.text}
                </Text>
                <View style={homeStyles.todoActions}>
                  <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.8}>
                    <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                      <Ionicons name="pencil" size={14} color={"#ffffff"}/>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
                    <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                      <Ionicons name="trash" size={14} color={"#ffffff"}/>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        </LinearGradient>
      </View>
    )
  }
  if(isLoading) return <LoadingSpinner/>
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar hidden={true}/>
    <SafeAreaView style={homeStyles.safeArea}>
      <Header />
      <TodoInput />
      <FlatList
      data={todos}
      renderItem={renderTodoItem}
      keyExtractor={(item) => item._id}
      style={homeStyles.todoList}
      contentContainerStyle={homeStyles.todoListContent}
      ListEmptyComponent={<EmptyState />}
      showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
    </LinearGradient>
  );
}
