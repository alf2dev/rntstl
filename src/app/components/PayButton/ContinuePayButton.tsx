import React, { FC, useEffect, useRef } from 'react';
import { useUser } from '../../providers/UserProvider';
import { graphql } from '@/gql';
import { useMutation } from '@apollo/client';
import { Error } from '../Error';
import { Button } from '@/app/components/Button';

type ContinuePayButtonProps = {
  data: string;
  signature: string;
};

export const ContinuePayButton: FC<ContinuePayButtonProps> = ({
  data,
  signature,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handlePay = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };


  return (
    <div>
      <form
        ref={formRef}
        method="POST"
        action="https://www.liqpay.ua/api/3/checkout"
        acceptCharset="utf-8"
      >
        <input value={data} type="hidden" name="data" />
        <input value={signature} type="hidden" name="signature" />
      </form>
      <Button size='xlfull' onClick={handlePay}>
      </Button>
    </div>
  );
};
