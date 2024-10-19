import { useState, useEffect } from 'react';

export const TaskForm = ({ selectedTask, addTask, updateTask }) => {
  const [formData, setFormData] = useState({
    title: selectedTask ? selectedTask.title : '',
    description: selectedTask ? selectedTask.description : '',
    priority: selectedTask ? selectedTask.priority : 'default',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description)
      newErrors.description = 'Description is required';
    if (formData.priority === 'default')
      newErrors.priority = 'Please select a priority';
    return newErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    if (selectedTask) {
      updateTask(selectedTask.id, formData);
    } else {
      addTask(formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.title && (
          <div className="text-red-500 text-sm mt-1">{errors.title}</div>
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.description && (
          <div className="text-red-500 text-sm mt-1">{errors.description}</div>
        )}

        <select
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.priority ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="default" disabled>
            Select Priority
          </option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        {errors.priority && (
          <div className="text-red-500 text-sm mt-1">{errors.priority}</div>
        )}

        <button
          type="submit"
          className="font-medium w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {selectedTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};
