import { Controller, useForm } from 'react-hook-form';

export default function CustomUIForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      pushNotification: false,
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log('제출됨', data))}>
      <Controller
        name="pushNotification"
        control={control}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <span className="text-sm font-semibold text-slate-700">푸시 알림 수신 설정</span>

              {/* 실제 스위치 구현부: 비표준 태그인 button 사용 */}
              <button
                type="button"
                ref={field.ref}
                onBlur={field.onBlur}
                onClick={() => field.onChange(!field.value)} // 클릭 시 불리언 반전 보고
                className={`${field.value ? 'bg-indigo-600' : 'bg-slate-200'} relative inline-flex h-7 w-12 items-center rounded-full transition-all outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2`}
              >
                {/* 움직이는 원 부분: 데이터에 반응하는 선언적 UI */}
                <span
                  className={`${field.value ? 'translate-x-6' : 'translate-x-1'} inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform`}
                />
              </button>
            </div>

            {/* 에러 메시지 표시: fieldState 활용 */}
            {fieldState.error && (
              <span className="ml-1 text-xs text-rose-500">{fieldState.error.message}</span>
            )}
          </div>
        )}
      />

      <button
        type="submit"
        className="mt-8 w-full rounded-xl bg-indigo-600 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition-colors hover:bg-indigo-700"
      >
        설정 저장하기
      </button>
    </form>
  );
}
