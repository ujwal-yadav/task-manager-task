import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { Modal } from '@/components/Modal';
import { TaskForm } from '@/components/TaskForm';
import { motion } from 'framer-motion';
import { TaskCard } from '@/components/TaskCard';
import { Tasks } from '@/constants/tasks';

export default function Home({ initialTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchText, setSearchText] = useState('');
  const PriorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const addTask = (values) => {
    const newTask = {
      ...values,
      id: Date.now(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  const updateTask = (id, selectedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? selectedTask : task)));
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => PriorityOrder[a.priority] - PriorityOrder[b.priority]);

  const openModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const searchTask = (e) => {
    setSearchText(e.target.value);
  };

  const completedTasks = filteredTasks.filter((task) => task.completed);
  const activeTasks = filteredTasks.filter((task) => !task.completed);

  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TaskForm
          selectedTask={selectedTask}
          addTask={addTask}
          updateTask={updateTask}
        />
      </Modal>
      <div className="container mx-auto lg:p-6 p-4 lg:w-[800px]">
        <div className="flex justify-between items-center lg:mb-6 mb-4">
          <h1 className="text-3xl font-semibold">Tasks</h1>
          <button
            onClick={() => openModal()}
            className="inline-flex gap-1 p-2 px-3 font-medium bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            <PlusIcon /> Add Task
          </button>
        </div>

        <div className="lg:my-6 my-4">
          <input
            type="text"
            placeholder="Search task"
            value={searchText}
            onChange={searchTask}
            className="bg-zinc-700 w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <div className="lg:space-y-6 space-y-4">
          {activeTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TaskCard
                task={task}
                openModal={openModal}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                isCompleted={false}
              />
            </motion.div>
          ))}
        </div>

        {completedTasks.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold lg:mt-6 mt-4 lg:mb-4 mb-2">
              Completed Tasks
            </h2>
            <div className="flex flex-col lg:gap-6 gap-4">
              {completedTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <TaskCard
                    task={task}
                    openModal={openModal}
                    deleteTask={deleteTask}
                    toggleComplete={toggleComplete}
                    isCompleted={true}
                  />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          activeTasks.length === 0 && (
            <>
              <p className="text-center text-xl">No tasks</p>
            </>
          )
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const initialTasks = Tasks;

  return {
    props: {
      initialTasks,
    },
  };
}
