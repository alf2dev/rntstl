import classNames from 'classnames';
import React, { FC } from 'react';
import { ApolloError } from '@apollo/client';

export type ErrorProps = {
  error?: string | Error | ApolloError;
};

export const Error: FC<ErrorProps> = ({ error }) => {
  if (!error) return <></>;

  let messages: string[] = [];
  if (typeof error === 'string') {
    messages = [error];
  } else if (error instanceof ApolloError) {
    messages = error.graphQLErrors.reduce<string[]>((acc, { extensions }) => {
      const message: string | string[] | undefined = (
        extensions.originalError as any
      )?.message;

      if (Array.isArray(message)) acc.push(...message);
      else if (message) acc.push(message);
      return acc;
    }, []);
    if (!messages.length) {
      messages.push(error.message);
    }
  } else if (error instanceof Error) {
    messages = [error.message];
  }
  return messages.map((message) => (
    <p className={classNames({ ['text-primecancel text-xs text-left relative animate-[toBottom_0.3s] px-2.5 py-1']: message })}>{message}</p>
  ));
};
