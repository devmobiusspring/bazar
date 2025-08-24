import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import CustomTextField from "./CustomTextField";
import { CustomFormikProps, Field } from "@/core/hooks/useFormikFields";
import CustomField from "./CustomField";

interface CustomFormProps {
  title?: string;
  titleProps?: Record<string, any>;
  paper?: boolean;
  paperProps?: Record<string, any>;
  formik: CustomFormikProps;
  handleSubmit?: () => void;
}

const CustomForm: React.FC<CustomFormProps> = ({
  title,
  titleProps = {},
  paper,
  paperProps,
  formik,
  handleSubmit,
}) => {
  const FormWrapper = paper ? Paper : React.Fragment;
  const formWrapperProps = paper
    ? { sx: { padding: "20px", borderRadius: "16px" }, ...paperProps }
    : {};

  const keyDowEvent = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit ? handleSubmit() : formik.handleSubmit();
      }
    },
    [handleSubmit, formik]
  );

  const renderFieldType = (form: CustomFormikProps, field: Field) => {
    if (typeof handleSubmit === "function") {
      field.onKeyDown = keyDowEvent;
    } else {
      field.onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          formik.handleSubmit();
        }
      };
    }
    if (field.renderfunction) {
      delete field.renderfunction;
    }

    const { name, ...restField } = field;

    switch (field.field) {
      case "select":
        return (
          <CustomTextField
            formik={form}
            key={field.id}
            select={true}
            name={name}
            {...restField}
          />
        );
      case "custom":
        return (
          <CustomField
            key={field.id}
            gridItem={field?.gridItem}
            gridProps={field?.gridProps}
          >
            {field?.children}
          </CustomField>
        );
      default:
        return (
          <CustomTextField
            formik={form}
            key={field.id}
            name={name}
            {...restField}
          />
        );
    }
  };

  return (
    <>
      {title && (
        <Typography
          variant="h5"
          color="primary"
          sx={{ marginBottom: "24px" }}
          {...titleProps}
        >
          {title}
        </Typography>
      )}
      <FormWrapper {...formWrapperProps}>
        <Grid container spacing={1} component="form">
          {formik.fields.map((field: Field) => {
            return field.renderfunction ? (
              field.renderfunction() ? (
                renderFieldType(formik, field)
              ) : (
                <React.Fragment key={field.id} />
              )
            ) : (
              renderFieldType(formik, field)
            );
          })}
        </Grid>
      </FormWrapper>
    </>
  );
};

export default React.memo(CustomForm);
