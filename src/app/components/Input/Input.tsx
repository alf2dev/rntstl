import React, { FC } from 'react';
import { Error } from '../Error';
import classNames from 'classnames';

export type InputProps = {
  error?: string;
  label?: string;
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

export const Input: FC<InputProps> = (props) => {
  const {
    error,
    label,
    inputProps: { className, id, ...restInputProps },
  } = props;
  return (
    <div className="mt-2.5 mb-5 mx-0">
      <div className="relative shadow-default rounded-lg">
        <input
          id={id}
          className={classNames(
            'block px-2.5 pb-2.5 pt-4 w-full text-base text-[#444] bg-transparent rounded-lg appearance-none focus:outline-none focus:ring-0 placeholder:opacity-0   focus:placeholder:opacity-100 peer',
            className,
          )}
          {...restInputProps}
        />
        {label && (
          <label
            htmlFor={id}
            className="absolute text-sm text-primary/50 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white/0 px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            {label}
          </label>
        )}
      </div>
      {error && <Error error={error} />}
    </div>
  );
};
