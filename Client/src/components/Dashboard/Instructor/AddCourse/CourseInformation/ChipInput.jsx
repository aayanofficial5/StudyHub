import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
}) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (editCourse && course?.tag) {
      setChips(course.tag);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, [editCourse, course, register, name]);

  useEffect(() => {
    setValue(name, chips);
  }, [chips, setValue, name]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        setChips((prev) => [...prev, chipValue]);
        event.target.value = "";
      }
    }
  };

  const handleDeleteChip = (index) => {
    setChips((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-6">
      <label htmlFor={name} className="block mb-1 font-medium text-white">
        {label} <span className="text-red-500">*</span>
      </label>

      <div className="flex flex-wrap gap-2 mb-2 overflow-hidden">
        {chips.map((chip, index) => (
          <span
            key={index}
            className="bg-blue-500 px-3 py-1 rounded-full flex items-center gap-2 text-sm max-w-[90%] sm:max-w-xs truncate"
            title={chip}
          >
            <span className="truncate">{chip}</span>
            <button
              type="button"
              onClick={() => handleDeleteChip(index)}
              className="cursor-pointer hover:text-black"
            >
              <MdClose />
            </button>
          </span>
        ))}
      </div>

      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none placeholder:text-gray-400"
      />

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{label} is required</p>
      )}
    </div>
  );
}
