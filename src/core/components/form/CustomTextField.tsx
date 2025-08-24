import React, { Fragment } from "react";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { FormikProps } from "formik";

interface Option {
  value: string | number;
  label: string;
}

interface CustomTextFieldProps {
  gridItem?: boolean;
  gridProps?: Record<string, any>;
  options?: Option[];
  formik?: FormikProps<any>; // Made formik optional
  name?: string; // Made name optional
  removeErrorColor?: boolean; // Added prop to remove error color
  withoutFormik?: boolean; // Added prop to work without formik
  [key: string]: any;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  gridItem = false,
  gridProps = {},
  options = [],
  formik,
  name,
  removeErrorColor = false, // Default value for the new prop
  withoutFormik = false, // Default value for the new prop
  ...props
}) => {
  const _changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formik && name) {
      formik.setFieldValue(name, e.target.value);
    }
  };

  const _formikConfig = () => {
    if (!formik || !name || withoutFormik) return {};

    const errorText = formik.errors[name];
    const helperText =
      typeof errorText === "string" || React.isValidElement(errorText)
        ? errorText
        : JSON.stringify(errorText);

    return {
      value: formik.values[name],
      onChange: _changeValue,
      error: !removeErrorColor && Boolean(formik.errors[name]), // Use the new prop to conditionally apply error color
      helperText: helperText,
      FormHelperTextProps:
        removeErrorColor && formik.errors[name]
          ? { style: { color: "red" } }
          : {},
    };
  };

  const Container = gridItem ? Grid : Fragment;
  const propsGrid = gridItem
    ? {
        item: true,
        md: 6,
        sm: 12,
        xs: 12,
        ...gridProps,
      }
    : {};

  const _selectProps = () => {
    return options.length
      ? {
          select: true,
          children: options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          )),
        }
      : {};
  };

  return (
    <Container {...propsGrid}>
      <TextField
        variant="filled"
        fullWidth={true}
        {...props}
        {..._formikConfig()}
        {..._selectProps()}
        inputProps={{
          autoComplete: "new-password",
          form: {
            autocomplete: "off",
          },
        }}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Container>
  );
};

export default CustomTextField;
