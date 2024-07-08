import { useState } from 'react';
import { Button, TextInput } from 'flowbite-react';
import { requestHandler } from '../../utils';
import { searchTeachers } from '../../api/studentApi';

/**
 * SearchTeacher component for searching teachers.
 *
 * @component
 * @returns {JSX.Element} The SearchTeacher component.
 */
const SearchTeacher = () => {
  /**
   * The search term input by the user.
   * @type {string}
   */
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * The list of teachers matching the search term.
   * @type {Array<Object>}
   */
  const [teachers, setTeachers] = useState([]);

  /**
   * Handles the search button click event.
   * Makes a request to the server to search for teachers matching the search term.
   * On success, updates the list of teachers with the returned data.
   * @returns {Promise<void>}
   */
  const handleSearch = async () => {
    await requestHandler(
      async () => await searchTeachers(searchTerm),
      null,
      (res) => {
        const { data } = res;
        setTeachers(data.teachers);
      }
    );
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 dark:text-gray-200">
        Search Teachers
      </h3>
      <div className="flex items-center gap-2 mb-4">
        <TextInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
        />
        <Button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white"
        >
          Search
        </Button>
      </div>
      {teachers.length > 0 && (
        <ul className="list-disc ml-4">
          {teachers.map((teacher) => (
            <li key={teacher._id} className="dark:text-gray-200">
              {teacher.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchTeacher;
