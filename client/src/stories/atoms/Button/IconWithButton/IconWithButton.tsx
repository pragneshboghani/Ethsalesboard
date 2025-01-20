import * as React from 'react';
import { Button } from "@/components/ui/button";

const IconWithButton = ({ children, variant, customClass, onClick }: any) => {
  return (
    <Button
      variant={variant}
      className={`${customClass}`}
      onClick={onClick}
      size="icon"
    >
      {children}
    </Button>
  );
};

export default IconWithButton;
