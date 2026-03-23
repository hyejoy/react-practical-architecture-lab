import { useForm, type SubmitHandler } from 'react-hook-form';

interface InputForm {
  email: string;
  age: number;
  name: string;
}

export default function InputForm() {
  const { register, handleSubmit } = useForm<InputForm>();

  // SumbitHandler 타입을 입혀 data 객체의 모든 필드 타입을 자동으로 추론하게 합니다.
  const onSave: SubmitHandler<InputForm> = (data) => {
    // 여기서 data는 이미 InputForm규격이 완벽히 적용된 상태
    // 자동으로 타입도 추론됨
    console.log('검증 완료된 데이터 : ', data);
  };

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <input {...register('email')} placeholder="이메일을 입력해주세요." />
      <button type="submit">제출하기</button>
    </form>
  );
}
