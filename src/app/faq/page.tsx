import { Metadata } from 'next';
import { FAQItems } from './FAQItems';



export default function FAQPage() {
  return (
    <div className='max-w-[1200px] my-8'>
      <span className='flex my-4 mx-4 text-2xl'></span>
      <FAQItems />
    </div>
  );
}
