/* eslint-disable no-irregular-whitespace */
/**
 * react hook form 을 사용하지 못하는 custoom component
 * 커스텀 UI는 내부 구조가 div나 button으로 되어 있어 ref를 직접 전달받지 못하거나,
 * 값이 변했을 때 객체가 아닌 순수한 값(true/false, number)만 내뱉는 경우가 많습니다.
 */

import type { ComponentProps } from 'react';

interface Props extends Omit<ComponentProps<'div'>, 'onChange'> {
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export default function MyCustomInput({ value, onChange, onBlur, ...props }: Props) {
  return (
    <div
      onClick={() => onChange(value ?? '')}
      onBlur={() => {
        console.log('벗어남!');
        onBlur?.(); // react-hook-form에 blur 알림
      }}
      tabIndex={0} // div가 포커스 받을 수 있게
      {...props}
    >
      {value}
    </div>
  );
}
