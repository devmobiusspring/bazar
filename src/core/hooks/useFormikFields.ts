import { useState } from "react";
import { useFormik, FormikProps } from "formik";
import * as yup from "yup";
import { TextFieldProps } from "@mui/material";

interface Option {
  value: string | number;
  label: string;
}

export interface Field extends Omit<TextFieldProps, "id" | "label" | "name"> {
  id: string;
  label: string;
  name: string;
  gridItem?: boolean;
  gridProps?: Record<string, any>;
  field?: "text" | "select" | "custom";
  options?: Option[];
  value?: string | number | boolean;
  multiple?: boolean;
  validations?: yup.StringSchema | yup.NumberSchema | yup.BooleanSchema;
  renderfunction?: () => boolean;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  children?: string | number | React.ReactNode;
  removeErrorColor?: boolean;
}

export interface CustomFormikProps extends FormikProps<any> {
  fields: Field[];
}

interface UseFormikFieldsProps {
  fields: Field[];
  handleSubmit?: (values: any) => void;
}

export interface UseFormikFieldsResult {
  form: CustomFormikProps;
  fields: Field[];
  clearForm: () => void;
}

const useFormikFields = ({
  fields,
  handleSubmit,
}: UseFormikFieldsProps): UseFormikFieldsResult => {
  const [initialValues] = useState(() => {
    const values = fields.reduce((acc, field) => {
      const name = field.name;
      let initialValue: string | number | boolean = field.value ?? "";
      if (typeof field.value === "number") initialValue = 0;
      if (typeof field.value === "boolean") initialValue = field.value;
      if (field.field !== "custom") {
        acc[name] = initialValue;
      }
      return acc;
    }, {} as Record<string, any>);
    return values;
  });

const [validationSchema] = useState(() => {
  const validations = fields.reduce((acc, field) => {
    if (!field.validations) {
      return acc;
    }
    acc[field.name] = field.validations;
    return acc;
  }, {} as Record<string, any>);

  return yup.object(validations);
});
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true, // Cambiado a false
    validateOnBlur: true,
    validateOnChange: true, // Cambiado a false para validar solo en blur y submit
    onSubmit: handleSubmit || ((values) => {
      console.log(values);
    }),
  });

  const clearForm = () => {
    formik.setValues(initialValues);
    formik.setTouched({});
  };

  const formWithFields: CustomFormikProps = {
    ...formik,
    fields,
  };

  return {
    form: formWithFields,
    fields,
    clearForm,
  };
};

export default useFormikFields;
