import { FC, ReactNode } from "react";
import { Grid, GridProps } from "@mui/material";

interface CustomFieldProps {
  children: ReactNode;
  gridItem?: boolean;
  gridProps?: GridProps;
}

const CustomField: FC<CustomFieldProps> = ({
  children,
  gridItem = false,
  gridProps = {},
}) => {
  const Container: FC<GridProps | {}> = gridItem
    ? Grid
    : (children) => <>{children}</>;
  const propsGrid = gridItem
    ? {
        item: true,
        md: 6,
        sm: 12,
        xs: 12,
        ...gridProps,
      }
    : {};

  return <Container {...propsGrid}>{children}</Container>;
};

export default CustomField;
