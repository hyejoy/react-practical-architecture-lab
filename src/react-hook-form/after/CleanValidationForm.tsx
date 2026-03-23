import { useForm, type SubmitHandler } from 'react-hook-form';

interface FormInputs {
  email: string;
  password: string;
  passwordConfirm: string;
}
export const emailRegax = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function CleanValidationForm() {
  // formstate내부의 Errors 객체는 실시간으로 발생하는 검증 결과를 담고 있음
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onChange', //mode 옵션은 검증이 일어나는 타이밍을 결정, onChange로 설정하면 사용자가 글자를 입력할 때마다 즉시 검증결과 업데이트
  });

  const onSumbt: SubmitHandler<FormInputs> = (data) => {
    console.log('data : ', data);
  };
  return (
    <form onSubmit={handleSubmit(onSumbt)}>
      <input
        {...register('email', {
          required: '이메일은 필수 입력 항목입니다.',
          pattern: {
            // pattern속성은 내부적으로 정규식 표현식의 test() 대조 작업을 자동화합니다.
            value: emailRegax,
            message: '이메일 형식이 아닙니다.',
          },
        })}
        placeholder="이메일"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        {...register('password', {
          required: '비밀번호를 입력해 주세요.',
          minLength: {
            value: 8,
            message: '최소 8자 이상이어야합니다.',
          },
        })}
        type="password"
        placeholder="패스워드"
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      {/* 비밀번호 watch  */}
      <input
        type="password"
        {...register('passwordConfirm', {
          required: '비밀번호 확인이 필요합니다.',
          validate: (value) => value === watch('password') || '비밀번호 일치하지 않습니다.',
        })}
        placeholder="비밀번호 확인"
      />
      {errors.passwordConfirm && <p className="text-red-200">{errors.passwordConfirm.message}</p>}
    </form>
  );
}
