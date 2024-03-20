import {extendVariants, Button as ButtonNext} from "@nextui-org/react";

export const Button = extendVariants(ButtonNext, {
  variants: {
    // <- modify/add variants
    color: {
      // olive: "text-[#000] bg-[#84cc16]",
    },
    isDisabled: {
      // true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
    },
    variant: {
      solid: '',
      box: 'shadow-default',
      border: ''
    },
    size: {
      xs: "px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-small hover:opacity-80",
      sm:  "px-unit-4 min-w-unit-16 h-unit-8 text-tiny gap-unit-1 rounded-small hover:opacity-80",
      md: "px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-small hover:opacity-80",
      xl: "px-unit-8 min-w-unit-28 h-unit-12 text-large gap-unit-4 rounded-st hover:opacity-80",
      xlfull: "px-unit-8 min-w-unit-28 h-unit-12 text-large gap-unit-4 rounded-st max-w-[300px] w-full hover:opacity-80",
    },
  },
  defaultVariants: { // <- modify/add default variants
    color: "primary",
    size: "xl",
  },

  // compoundVariants: [ 
    // <- modify/add compound variants
    // {
      // isDisabled: true,
      // color: "olive",
      // class: "bg-[#84cc16]/80 opacity-100",
    // },
  // ],
});