export default function FLname({ nameType, name, handleLoginData, loginFormData}) {
  return (
    <label htmlFor={nameType}>
      {name}
      <sup className="text-red-500 text-[16px] relative -top-1 -right-0.5">*</sup>
      <br />
      <input
        className="w-full h-12 p-3 rounded-lg mt-1 text-[15px]"
        onChange={handleLoginData}
        required
        type="text"
        id={nameType}
        name={nameType}
        placeholder={`Enter ${name}`}
        value={loginFormData[nameType]}
      />
    </label>
  );
}