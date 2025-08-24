import { Button, IconButton } from "@mui/material";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

export interface LinkButtonInterface {
  href: any;
  children: ReactNode;
  [key: string]: any; // This allows any additional properties
}

export const LinkIconButton: FC<Partial<LinkButtonInterface>> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Link href={href} passHref>
      <IconButton component="span" {...props}>
        {children}
      </IconButton>
    </Link>
  );
};
