import { useForm, type SubmitHandler } from 'react-hook-form';

export interface UserProfileForm {
  userName: string;
  userEmail: string;
  userAge: number;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

export default function TypeForm() {
  const { register, handleSubmit } = useForm<UserProfileForm>({
    defaultValues: {
      userName: '',
      userEmail: '',
      userAge: 20,
      preferences: { theme: 'light', notifications: true },
    },
    mode: 'onChange',
  });

  const onSave: SubmitHandler<UserProfileForm> = (data) => {
    console.log('검증 완료된 안전한 데이터 : ', data);
  };

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <input {...register('userName')} placeholder="성함" />
      <input {...register('userEmail')} placeholder="이메일" />
      <input type="number" {...register('userAge')} placeholder="나이" />

      <fieldset>
        <legend>환경설정 (중첩구조)</legend>
        {/* 점 표기법을 통해 깊은 곳의 타입까지 완벽히 추론 */}
        <select {...register('preferences.theme')}>
          <option value="light">라이트모드</option>
          <option value="dark">다크모드</option>
        </select>
        <br />

        <label>
          <input type="checkbox" {...register('preferences.notifications')} /> 알림 수신 동의
        </label>
      </fieldset>

      <button type="submit">안전하게 저장하기</button>
    </form>
  );
}
