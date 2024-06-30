import PropType from 'prop-types'

const UpdateTeacher = ({ isOpen, onClose, teacher, onSave, onChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">Update Teacher</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          value={teacher.name}
          onChange={(e) => onChange({ ...teacher, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          className="border p-2 w-full mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          value={teacher.department}
          onChange={(e) => onChange({ ...teacher, department: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subject"
          className="border p-2 w-full mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          value={teacher.subject}
          onChange={(e) => onChange({ ...teacher, subject: e.target.value })}
        />
      </div>
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-gray-600 text-white rounded mr-2 dark:bg-gray-700 dark:text-gray-200" onClick={onClose}>Cancel</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded dark:bg-blue-700 dark:text-gray-200" onClick={() => onSave(teacher)}>Save</button>
      </div>
    </div>
  </div>
  );
};
UpdateTeacher.propTypes = {
  isOpen: PropType.bool.isRequired,
  onClose: PropType.func.isRequired,
  teacher: PropType.object.isRequired,
  onSave: PropType.func.isRequired,
  onChange: PropType.func.isRequired
}
export default UpdateTeacher;
