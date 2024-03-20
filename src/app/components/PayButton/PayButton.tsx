import React, { FC, useEffect, useRef } from 'react';
import { useUser } from '../../providers/UserProvider';
import { graphql } from '@/gql';
import { useMutation } from '@apollo/client';
import { Error } from '../Error';
import classNames from 'classnames';
import { Button } from '@/app/components/Button';


type PayButtonProps = {};

const payBasketDocument = graphql(`
  mutation PayBasket {
    payBasket {
      data
      signature
    }
  }
`);

export const PayButton: FC<PayButtonProps> = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputDataRef = useRef<HTMLInputElement>(null);
  const inputSignatureRef = useRef<HTMLInputElement>(null);
  const [payBasket, { data, error }] = useMutation(payBasketDocument);
  const { user } = useUser();

  useEffect(() => {
    if (
      !error &&
      data &&
      inputDataRef.current &&
      inputSignatureRef.current &&
      formRef.current
    ) {
      inputDataRef.current.value = data.payBasket.data;
      inputSignatureRef.current.value = data.payBasket.signature;
      formRef.current.submit();
    }
  }, [data, error]);

  return (
    <>
      <form
        ref={formRef}
        method="POST"
        action="https://www.liqpay.ua/api/3/checkout"
        acceptCharset="utf-8"
      >
        <input ref={inputDataRef} type="hidden" name="data" />
        <input ref={inputSignatureRef} type="hidden" name="signature" />
      </form>
      <Button
        disabled={!user}
        onClick={() => payBasket()}
      >

      </Button>
      <Error error={error} />
      {!user && <Error error="" />}
    </>
  );
};
