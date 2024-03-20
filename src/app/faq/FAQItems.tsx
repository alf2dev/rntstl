"use client"

import { Accordion, AccordionItem } from '@nextui-org/react';

type Props = {}
const faqText = [
    
  ];
export const FAQItems = (props: Props) => {
  return (
    <Accordion
        variant="splitted"
        selectionMode="multiple"
        defaultExpandedKeys="all"
        className="pt-2 pb-8"
      >
        {faqText.map((item, key) => (
          <AccordionItem
            key={key}
            aria-label={item.question}
            title={item.question}
          >
            <span>{item.answer}</span>
          </AccordionItem>
        ))}
      </Accordion>
  )
}