import { Controller, useForm } from 'react-hook-form';
import MyCustomInput from './MyCustomInput';

export default function UseController() {
  const { control, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        name="customField"
        control={control}
        render={({ field }) => (
          <MyCustomInput value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
        )}
      />
      <button type="submit">제출</button>
    </form>
  );
}
