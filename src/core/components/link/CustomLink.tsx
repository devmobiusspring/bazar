import { Button, IconButton } from "@mui/material";
import NextLink from "next/link";
import React, { FC, ReactNode } from "react";
import { Link as MuiLink } from "@mui/material";

export interface LinkButtonInterface {
  href: any;
  children: ReactNode;
  [key: string]: any; // This allows any additional properties
}

export const CustomLink: FC<Partial<LinkButtonInterface>> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href} passHref {...props}>
      {children}
    </NextLink>
  );
};
