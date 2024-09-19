import { useFormContext, useFieldArray } from "react-hook-form";

export default function FormInputSelect({
  labelText,
  placeholderText,
  textPlaceholder,
  inputLabelText,
  name,
  options,
}) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}-group`, // Nombre para almacenar múltiples grupos de inputs
  });

  return (
    <div className="mb-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex mb-4">
          <div className="mr-2 max-w-xs">
            <label
              htmlFor={`${name}-select-${index}`}
              className="block bg-transparent px-1 mb-1 text-sm font-semibold text-gray-400"
            >
              {labelText}
            </label>
            <select
              id={`${name}-select-${index}`}
              {...register(`${name}-group.${index}.select`)}
              className="w-full px-4 py-3 rounded-lg bg-semiBlack border-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={labelText}
            >
              <option value="" disabled selected>
                {placeholderText}
              </option>
              {options.map((option, optIndex) => (
                <option key={optIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor={`${name}-input-${index}`}
              className="block bg-transparent px-1 mb-1 text-sm font-semibold text-gray-400"
            >
              {inputLabelText}
            </label>
            <input
              {...register(`${name}-group.${index}.text`, { required: true })}
              type="text"
              id={`${name}-input-${index}`}
              placeholder={textPlaceholder}
              className="w-full px-4 py-3 rounded-lg bg-semiBlack border-blue-600 text-white"
            />
            {errors[`${name}-group`] && errors[`${name}-group`][index] && (
              <p className="text-red-500 mb-4">Campo es requerido</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => remove(index)} // Elimina el grupo actual
            className="mt-6"
          >
            Eliminar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({})} // Agrega un nuevo grupo vacío
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Agregar Red Social
      </button>
    </div>
  );
}
