import { Button } from "@mui/material";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

export interface LinkButtonInterface {
  href: any;
  children: ReactNode;
  [key: string]: any; // This allows any additional properties
}

export const LinkButton: FC<Partial<LinkButtonInterface>> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Link href={href} passHref>
      <Button component="span" {...props}>
        {children}
      </Button>
    </Link>
  );
};
